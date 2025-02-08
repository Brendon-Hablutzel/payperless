import psycopg
from models import NewReceipt, Receipt
import json

connection_string = "dbname=payperless user=postgres password=postgres host=localhost"


def db_connection(func):
    def wrapper(*args, **kwargs):
        with psycopg.connect(connection_string) as conn:
            with conn.cursor() as cur:
                return func(conn, cur, *args, **kwargs)

    return wrapper


def tuple_to_receipt(t) -> Receipt:
    (_id, name, key, data, timestamp) = t
    return Receipt(
        id=_id, name=name, key=key, data=data, timestamp=timestamp.isoformat()
    )


@db_connection
def create_receipt_table(conn, cur):
    cur.execute("""
        CREATE TABLE IF NOT EXISTS receipts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            key VARCHAR(100),
            data JSON,
            datetime TIMESTAMP
        )""")


@db_connection
def insert_receipt_record(conn, cur, receipt: NewReceipt) -> Receipt:
    cur.execute(
        "INSERT INTO receipts (name, key, data, datetime) VALUES (%s, %s, %s, %s) RETURNING id, name, key, data, datetime",
        (
            receipt.name,
            receipt.key,
            json.dumps(receipt.data),
            receipt.timestamp,
        ),
    )
    inserted_receipt = cur.fetchone()
    conn.commit()

    return tuple_to_receipt(inserted_receipt)


@db_connection
def list_receipt_records(conn, cur) -> list[Receipt]:
    cur.execute("SELECT * FROM receipts")
    rows = cur.fetchall()

    return list(map(tuple_to_receipt, rows))


@db_connection
def get_receipt_record(conn, cur, receipt_id: str) -> Receipt:
    cur.execute("SELECT * FROM receipts WHERE id = %s", (receipt_id,))
    row = cur.fetchone()
    return tuple_to_receipt(row)


def delete_receipt_record():
    pass  # TODO: low priority
