from langchain_community.document_loaders import PyMuPDFLoader
from langchain_cohere import CohereEmbeddings
from .chunker import chunker
import psycopg2
import os

embedding_model = CohereEmbeddings(model="embed-english-v3.0")
database_url = os.getenv("DATABASE_URL")
conn = psycopg2.connect(database_url)

def store_data(file_path):
    loader = PyMuPDFLoader(file_path)

    page = []

    for doc in loader.lazy_load():
        page.append(doc)

    with conn.cursor() as cur:
        # Create the embeddings table
        cur.execute(
            "CREATE EXTENSION IF NOT EXISTS vector",
        )
        cur.execute(
            "CREATE TABLE IF NOT EXISTS embeddings (id SERIAL PRIMARY KEY, text TEXT, embedding vector(1024))"
        )

    for i in range(len(page)):
        chunks = chunker(page[i].page_content)

        embeddings = embedding_model.embed_documents(chunks)

        with conn.cursor() as cur:
            # Insert texts and their embeddings
            for text, embedding in zip(chunks, embeddings):
                embedding_array = [
                    float(x) for x in embedding
                ]  # Convert embeddings to float array
                cur.execute(
                    "INSERT INTO embeddings (text, embedding) VALUES (%s, %s::vector)",  # ::vector casts to pgvector type
                    (text, embedding_array),
                )

            # Commit and close the connection
            conn.commit()
            print("Embeddings stored in PostgreSQL with pgvector successfully.")

    conn.close()
