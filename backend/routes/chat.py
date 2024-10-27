from fastapi import APIRouter, Request
from langchain_cohere import CohereEmbeddings, ChatCohere
import psycopg2
import os
from dotenv import load_dotenv
from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import START, MessagesState, StateGraph
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

workflow = StateGraph(state_schema=MessagesState)

# Load environment variables
load_dotenv()
database_url = os.getenv("DATABASE_URL")

# Define the router
router = APIRouter()

# Define the number of similar results to retrieve
top_n = 4

model = ChatCohere(temperature=0)


def call_model(state: MessagesState):
    system_prompt = (
        "You are a helpful assistant. "
        "Answer all questio ns to the best of your ability. "
    )
    messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = model.invoke(messages)
    return {"messages": response}


workflow.add_node("model", call_model)
workflow.add_edge(START, "model")

# Add simple in-memory checkpointer
memory = MemorySaver()
app = workflow.compile(checkpointer=memory)


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

    final = app.invoke(
        {"messages": [HumanMessage(content=message)]},
        config={"configurable": {"thread_id": "1"}},
    )

    print(final.get("messages"))

    return final
