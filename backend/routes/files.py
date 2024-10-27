from fastapi import APIRouter, File, UploadFile
import os
import psycopg2
from dotenv import load_dotenv

# loading all the environment variables
load_dotenv()

router = APIRouter()


# Directory for uploads
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

database_url = os.getenv("DATABASE_URL")


@router.get("")
async def list_files():
    with psycopg2.connect(database_url) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM files")
            files = cur.fetchall()
            return files
