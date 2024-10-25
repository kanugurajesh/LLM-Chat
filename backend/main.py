from fastapi import FastAPI
from routes.upload import router as upload_router
from routes.chat import router as chat_router

# Initialize the FastAPI app
app = FastAPI()

# Include the routers
app.include_router(upload_router, prefix="/upload")
app.include_router(chat_router, prefix="/chat")