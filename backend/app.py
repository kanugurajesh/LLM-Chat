from fastapi import FastAPI, File, UploadFile
import shutil
import os

app = FastAPI()

# Create a directory for uploads if it doesn't exist
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # Save the uploaded file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"File uploaded: {file_location}")
    return {"message": "File uploaded successfully", "file_location": file_location}
