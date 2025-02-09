from pydantic import BaseModel
from datetime import datetime
from typing import Any


class Receipt(BaseModel):
    id: int
    name: str
    key: str
    data: Any
    timestamp: str


class NewReceipt(BaseModel):
    name: str
    key: str
    data: dict
    timestamp: datetime
