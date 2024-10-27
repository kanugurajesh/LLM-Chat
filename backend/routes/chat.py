from fastapi import APIRouter, Request
from langchain_cohere import CohereEmbeddings
from langchain.memory import ConversationBufferMemory
import psycopg2
import os
from dotenv import load_dotenv
from langchain.chains import llm

# Load environment variables
load_dotenv()
database_url = os.getenv("DATABASE_URL")

# Define the router
router = APIRouter()

# Define the number of similar results to retrieve
top_n = 4

memory = ConversationBufferMemory(return_messages=True)


@router.post("")
async def read_items(request: Request):
    # Parse incoming JSON data
    data = await request.json()
    message = data.get("message", "")

    print("message:", message)

    # Initialize embeddings
    embeddings = CohereEmbeddings(model="embed-english-v3.0")
    query_embedding = embeddings.embed_query(message)

    data = ""

    # Connect to the database
    with psycopg2.connect(database_url) as conn:
        with conn.cursor() as cur:
            # Perform semantic search
            cur.execute(
                """
                SELECT text, embedding, 1 - (embedding <=> %s::vector) AS similarity
                FROM embeddings
                ORDER BY embedding <=> %s::vector
                LIMIT %s;
                """,
                (query_embedding, query_embedding, top_n),
            )

            # Fetch and return the results
            results = cur.fetchall()

            data = [{"text": result[0]} for result in results]

    memory.save_context({"input": message}, {"output": data})


@router.get("/delete")
async def delete_items():
    memory.clear()


@router.get("/context")
async def get_context():
    return memory.load_memory_variables({})
