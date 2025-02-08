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


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("creating tables")
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
        return insert_receipt_record(
            NewReceipt(
                name=name, key=key, data={"hello": "world"}, timestamp=datetime.now()
            )
        )
    except Exception as e:
        delete_receipt_image(key)
        raise e


@app.get("/receipts")
def list_receipts() -> list[Receipt]:
    receipts = list_receipt_records()
    return receipts


@app.get("/receipts/{id}/image")
def receipt_image(id: str) -> FileResponse:
    receipt = get_receipt_record(id)
    return FileResponse(get_image_location(receipt.key))
