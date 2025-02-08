from pydantic import BaseModel
from datetime import datetime


class Receipt(BaseModel):
    id: int
    name: str
    key: str
    data: dict
    timestamp: str


class NewReceipt(BaseModel):
    name: str
    key: str
    data: dict
    timestamp: datetime
