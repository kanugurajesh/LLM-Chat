The application has a rate limit so kindly upload documents which are less than 10-20 pages even though it accepts upto 40 only put 10-20 for safety this rate limit it is due to free key access from cohere embeddings if we use another embedding model it can be improved based on the key rate limit

# LLM Chat

A RAG application to chat with your documents with complete control over your data you can delete your files in the db and see which files are loaded into the vector database and also delete the vectors of a particular file

## ✨ Key Features

- **📄 Document Upload & Query**:  
   Upload your **PDF** documents, securely store them in **Postgres**, and query their content using **Cohere embeddings**.
  
- **🧠 RAG-Powered Question Answering**:  
   Ask questions related to your uploaded documents, and receive precise answers thanks to **Cohere's advanced embeddings** and **postgres's vector storage**.

- **🔒 Full Data Control**:  
   You have total control over your documents, including the ability to **delete**, **manage**, or **reference** them whenever needed.

- **🎨 Dynamic UI with Animations**:  
   Built with **TailwindCSS** for responsiveness and **Framer Motion** for smooth transitions. Unauthorized pages are highlighted with engaging **Rive animations** for user feedback.
  
---

## 🚀 Quick Start

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/LLM-Chat.git
   ```
2. Change the directory
   ```bash
   cd LLM-Chat
   ```
3. Add the environment variables in the .env.local
  ```bash
  cd backend && create .env file
  ```

# Environment Variables
To run this application, you need to set the following environment variables:

```bash
COHERE_API_KEY=
DATABASE_URL=
```

4. Install the packages
   ```bash
   pip install -r requirements.txt
   ```
5. Run the project
   ```bash
   uvicorn main:app --reload
   ```

6. Change the directory
   ```bash
   cd frontend
   ```
7. Install the packages
   ```bash
   npm install
   ```
9. Run the project
   ```bash
   npm run dev
   ```

## Images

![Screenshot 2024-10-28 185749](https://github.com/user-attachments/assets/9c5cc3c8-786b-4f13-9601-4c35283cc89e)

![Screenshot 2024-10-28 185754](https://github.com/user-attachments/assets/a4872ec4-cb56-45da-bde7-162b5a9cec22)

![Screenshot 2024-10-28 185814](https://github.com/user-attachments/assets/ca17beb6-9d6d-4219-90da-07504eb11b0f)

![Screenshot 2024-10-28 185820](https://github.com/user-attachments/assets/103a12dd-a949-4968-a8a3-0db1a5b271ff)

![Screenshot 2024-10-28 185828](https://github.com/user-attachments/assets/7031c90d-3c05-4722-9ca3-d828c0067048)
