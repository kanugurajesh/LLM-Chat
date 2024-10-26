from fastapi import APIRouter, File, UploadFile
import shutil
import os
from dotenv import load_dotenv
from utils.storemeta import store_meta
from utils.storedata import store_data

# loading all the environment variables
load_dotenv()

router = APIRouter()

# Directory for uploads
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# The default route for the upload endpoint
@router.post("")
async def upload(file: UploadFile = File(...), user_gmail: str = ""):
    # Define the path to save the uploaded file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    # writing the file to the uploads directory
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # The below function call is used to store the metadata of the uploaded file in the database
    store_meta(file_location, file.filename, file.file._file.tell(), file.content_type, user_gmail)
    
    print(file_location)
    
    store_data(file_location)

    return {"message": "File uploaded successfully", "file_location": file_location}