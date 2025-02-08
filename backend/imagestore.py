from fastapi import UploadFile
from pathlib import Path

IMAGES_FOLDER = "images"


def get_image_location(key: str) -> str:
    return f"{IMAGES_FOLDER}/{key}"


async def store_receipt_image(key: str, image: UploadFile):
    image_bytes = await image.read()
    with open(get_image_location(key), "+wb") as f:
        f.write(image_bytes)


def delete_receipt_image(key: str):
    Path.unlink(get_image_location(key))
