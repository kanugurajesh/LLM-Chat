from fastapi import APIRouter, File, UploadFile
import shutil
import os
from dotenv import load_dotenv
# loading all the environment variables
load_dotenv()

router = APIRouter()

# Directory for uploads
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# The default route for the upload endpoint
@router.get("")
async def files():
    return "files"