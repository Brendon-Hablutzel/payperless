To get started: `source .venv/bin/activate` and `pip install -r requirements.txt`

Start database: `docker run -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=payperless -p 5432:5432 postgres:17`

To run: `fastapi dev main.py`

See: [docs](https://fastapi.tiangolo.com/)
