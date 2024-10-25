# main.py
from fastapi import FastAPI
from upload import router as upload_router
from chat import router as chat_router

app = FastAPI()

# Include the routers
app.include_router(upload_router, prefix="/upload")
app.include_router(chat_router, prefix="/chat")
