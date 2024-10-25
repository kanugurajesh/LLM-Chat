# item_routes.py
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile
import shutil
import os
from dotenv import load_dotenv
from langchain_cohere import CohereEmbeddings

load_dotenv()

router = APIRouter()

# Create a directory for uploads if it doesn't exist
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@router.get("/")
async def upload(file: UploadFile = File(...)):
    # Save the uploaded file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"File uploaded: {file_location}")
    return {"message": "File uploaded successfully", "file_location": file_location}
