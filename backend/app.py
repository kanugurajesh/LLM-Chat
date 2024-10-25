from fastapi import FastAPI, File, UploadFile
import shutil
import os
import psycopg2
from dotenv import load_dotenv
from langchain_cohere import CohereEmbeddings

load_dotenv()

app = FastAPI()

# Create a directory for uploads if it doesn't exist
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

# environment variables
database_url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(database_url)

# Define the number of similar results to retrieve
top_n = 5

# Create a vector store with a sample text
embeddings = CohereEmbeddings(
    model="embed-english-v3.0",
)

@app.post("/upload")
async def upload(file: UploadFile = File(...)):
    # Save the uploaded file
    file_location = os.path.join(UPLOAD_DIRECTORY, file.filename)
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    print(f"File uploaded: {file_location}")
    return {"message": "File uploaded successfully", "file_location": file_location}

@app.get("/files")
async def list_files():
    # List the files in the uploads directory
    files = os.listdir(UPLOAD_DIRECTORY)
    return {"files": files}