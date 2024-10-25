import os
from dotenv import load_dotenv
import psycopg2

load_dotenv()

def store_meta(file_location, file_name, file_size, file_type, user_gmail):
    database_url = os.getenv("DATABASE_URL")
    conn = psycopg2.connect(database_url)
    
    with conn.cursor() as curr:
        curr.execute(
            "CREATE TABLE IF NOT EXISTS files (file_id SERIAL PRIMARY KEY, file_location VARCHAR(255), file_name VARCHAR(255), file_size INT, file_type VARCHAR(255), user_gmail VARCHAR(255))"
        )
        
        curr.execute(
            "INSERT INTO files (file_location, file_name, file_size, file_type, user_gmail) VALUES (%s, %s, %s, %s, %s)",
            (file_location, file_name, file_size, file_type, user_gmail)
        )
        
        # Execute SELECT query to fetch all records
        curr.execute("SELECT * FROM files")
        response = curr.fetchall()  # Fetch all results from the SELECT query
        
        print(response)  # This will print the list of records retrieved
        
    conn.commit()
    conn.close()
    
    print("File metadata stored successfully")
    
    return {"message": "File metadata stored successfully", "data": response}
