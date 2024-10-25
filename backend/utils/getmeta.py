import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

def get_meta():
    database_url = os.getenv("DATABASE_URL")
    conn = psycopg2.connect(database_url)
    
    with conn.cursor() as curr:
        
        response = curr.execute(
            "SELECT * FROM files"
        )
        
        print(response)
        
    conn.commit()
    conn.close()
    
    print("File metadata stored successfully")
    
    return {"message": "File metadata stored successfully"}

get_meta()