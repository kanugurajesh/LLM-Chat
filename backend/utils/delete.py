import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")
conn = psycopg2.connect(database_url)

def delete():
    with conn.cursor() as curr:
        curr.execute("DROP TABLE IF EXISTS embeddings")
        print("Deleting the table embeddings if it exists")
        conn.commit()
    conn.close()

delete()
