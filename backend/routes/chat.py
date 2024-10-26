# item_routes.py
from fastapi import APIRouter
from langchain_cohere import CohereEmbeddings
import psycopg2
import os
from dotenv import load_dotenv

# Database connection
database_url = os.getenv('DATABASE_URL')
conn = psycopg2.connect(database_url)

# Define the number of similar results to retrieve
top_n = 5

# Create a vector store with a sample text
embeddings = CohereEmbeddings(
    model="embed-english-v3.0",
)

router = APIRouter()

@router.post("/")
async def read_items(query: str = ""):
    query_embedding = embeddings.embed_query(query)
    with conn.cursor() as cur:
    # Perform semantic search
        cur.execute("""
            SELECT text, embedding, 1 - (embedding <=> %s::vector) AS similarity
            FROM embeddings
            ORDER BY embedding <=> %s::vector
            LIMIT %s;
        """, (query_embedding, query_embedding, top_n))
        
        # Fetch and display the results
        results = cur.fetchall()
        for text, embedding, similarity in results:
            print(f"Text: {text}, Similarity: {similarity:.4f}")

    conn.close()
