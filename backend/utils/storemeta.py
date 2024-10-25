import os
from dotenv import load_dotenv
import psycopg2

# loading the environment variables
load_dotenv()

# The below function will store the metadata of the file in the database
def store_meta(file_location, file_name, file_size, file_type, user_gmail):
    # getting the database URL from the environment variables
    database_url = os.getenv("DATABASE_URL")
    # initializing the connection to the database
    conn = psycopg2.connect(database_url)
    
    with conn.cursor() as curr:
        # Creating the files table if it does not exist
        curr.execute(
            "CREATE TABLE IF NOT EXISTS files (file_id SERIAL PRIMARY KEY, file_location VARCHAR(255), file_name VARCHAR(255), file_size INT, file_type VARCHAR(255), user_gmail VARCHAR(255))"
        )
        
        # Adding data into the files table
        curr.execute(
            "INSERT INTO files (file_location, file_name, file_size, file_type, user_gmail) VALUES (%s, %s, %s, %s, %s)",
            (file_location, file_name, file_size, file_type, user_gmail)
        )
        
    conn.commit()
    conn.close()
    
    print("File metadata stored successfully")
    
    return {"message": "File metadata stored successfully"}
