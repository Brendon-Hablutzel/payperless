from models import NewReceipt, Receipt
from fastapi import FastAPI, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from db import (
    create_receipt_table,
    list_receipt_records,
    insert_receipt_record,
    get_receipt_record,
)
from contextlib import asynccontextmanager
from imagestore import (
    delete_receipt_image,
    store_receipt_image,
    get_image_location,
)
from uuid import uuid4
from datetime import datetime
from dotenv import load_dotenv
from receipt_processing import get_receipt_json


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("creating tables")
    load_dotenv()
    create_receipt_table()
    yield
    print("shutting down")


app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/receipts")
async def create_receipt(
    name: str = Form(...), image: UploadFile = File(...)
) -> Receipt:
    key = uuid4().hex

    await store_receipt_image(key, image)
    try:
        j = get_receipt_json(get_image_location(key))
        print(j)
        return insert_receipt_record(
            NewReceipt(name=name, key=key, data=j, timestamp=datetime.now())
        )
    except Exception as e:
        delete_receipt_image(key)
        raise e


@app.get("/receipts")
def list_receipts() -> list[Receipt]:
    receipts = list_receipt_records()
    print(receipts)
    return receipts


@app.get("/receipts/{id}")
def get_receipt(id: str) -> Receipt:
    receipt = get_receipt_record(id)
    return receipt


@app.get("/receipts/{id}/image")
def receipt_image(id: str) -> FileResponse:
    receipt = get_receipt_record(id)
    return FileResponse(get_image_location(receipt.key))


@app.get("/insights/general")
def general_insights() -> str:
    receipts = list_receipt_records()
    insights = ""
    return insights


@app.get("/insights/sustainability")
def sustainability_insights() -> str:
    receipts = list_receipt_records()
    insights = ""
    return insights
