from langchain_community.document_loaders import PyMuPDFLoader

def store_data():
    loader = PyMuPDFLoader("uploads/Fullstack Internship Assignment.pdf")

    page = []

    for doc in loader.lazy_load():
        page.append(doc)
        
    for i in range(len(page)):
        print(page[i].page_content)