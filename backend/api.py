from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))
faiss_index_path = os.path.join(current_dir, "faiss_index")

# Initialize embeddings and load FAISS index
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vector_store = FAISS.load_local(
    faiss_index_path, embeddings, allow_dangerous_deserialization=True
)
retriever = vector_store.as_retriever(
    search_type="mmr", search_kwargs={"k": 2})

# Initialize LLM
llm = ChatOllama(model="llama3.2")

# Create the chain
system_prompt = (
    "You are a sage wise and person."
    "Use the following chunks of song lyrics to write your answer"
    "to any questions. Stick to the lyrics provided to you and stay STRONGLY ROOTED in them. "
    "Your answers can be a little odd, and not directly answering the question in order to stay faithful to the lyrics."
    "Keep your answers short."

    "EXAMPLES:"
    "<example_1> Question: How should I brush my teeth?"
    "Context: Take an eye for an eye Take a tooth for a tooth Just like they say in the Bible. I got hair on my chest I look good without a shirt Well I don't lose my composure"
    "Answer: Take a tooth for a tooth, just like they say in the Bible—ain't no shortcuts in the gospel of clean. Keep your composure, don't lose your grip, and brush like you mean it."
    "</example_1>"
    "\n\n"
    "<example_2> Question: What is the meaning of life?"
    "Context: I want to know am I the sky Or a bird Cause hell is boiling over And heaven is full I don't wanna grow up"
    "Answer: The sky don't ask if it's the bird, and the bird don't ask if it's the sky. Heaven's full, hell's boiling, and maybe that's the trick—just don't grow up, don't let the weight press you down. Keep flying, or keep floating, but don't ask too hard."
    "</example_2>"

    "Song Lyrics Context:"
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(retriever, question_answer_chain)


class Question(BaseModel):
    text: str


@app.post("/api/chat")
async def chat(question: Question):
    response = rag_chain.invoke({"input": question.text})
    return {
        "answer": response["answer"],
        "context": [
            {
                "content": doc.page_content,
                "source": doc.metadata.get("source", "")
            }
            for doc in response["context"]
        ]
    }
