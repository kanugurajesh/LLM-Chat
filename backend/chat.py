# item_routes.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def read_items():
    return [{"item_name": "item1"}, {"item_name": "item2"}]
