from fastapi import APIRouter, File, UploadFile
import os
from dotenv import load_dotenv
# loading all the environment variables
load_dotenv()

router = APIRouter()

# Directory for uploads
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@router.get("")
async def list_files():
    # List the files in the uploads directory
    files = os.listdir(UPLOAD_DIRECTORY)
    return {"files": files}