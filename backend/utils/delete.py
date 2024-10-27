import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

database_url = os.getenv("DATABASE_URL")
conn = psycopg2.connect(database_url)

def delete():
    with conn.cursor() as curr:
        # curr.execute("SELECT * FROM files")
        curr.execute("DELETE FROM files WHERE file_id = 2")
        # print(curr.fetchall())
        conn.commit()
    conn.close()


delete()
