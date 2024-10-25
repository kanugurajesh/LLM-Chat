# upload.py
from fastapi import APIRouter, File, UploadFile
import shutil
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Directory for uploads
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@router.post("")
async def upload(file: UploadFile = File(...)):
    # Define the path to save the uploaded file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"File uploaded: {file_location}")
    return {"message": "File uploaded successfully", "file_location": file_location}
