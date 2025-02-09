# 🦴 The Bone Machine: A Tom Waits Lyrical Oracle 🎭

_"Reality is for people who can't handle Tom Waits lyrics."_

## 🎪 What in the Beautiful Madness Is This?

Welcome to **The Bone Machine** - a delightfully unhinged AI chatbot that answers your life's questions through the gravelly wisdom of Tom Waits' lyrics. This isn't your ordinary chatbot; it's a carnival barker, a junkyard prophet, and a midnight philosopher all rolled into one digital experience.

Using the power of RAG (Retrieval Augmented Generation) and the poetic chaos of Tom Waits' songbook, The Bone Machine transforms your mundane questions into beautiful, bewildering answers that would make even the Mad Hatter scratch his head.

## 🎭 Features

- 🎪 **Cosmic Terminal Interface**: A space-themed command center that feels like mission control for the weird and wonderful
- 🎵 **Lyrical Wisdom**: Powered by Tom Waits' unique worldview and distinctive storytelling
- 🤖 **RAG Architecture**: Using FAISS for semantic search and Ollama for local LLM inference
- 🌟 **Context Display**: See which magical lyrics inspired each response
- 🎨 **Beautiful UI**: A dark, starry interface that matches the noir aesthetic of Waits' world

## 🚀 Quick Start

1. **Clone this repository of curiosities:**

   ```bash
   git clone https://github.com/yourusername/bone-machine.git
   cd bone-machine
   ```

2. **Set up the Backend (The Engine Room):**

   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the Frontend (The Stage):**

   ```bash
   cd frontend
   npm install
   ```

4. **Fire up the machines:**

   ```bash
   # Terminal 1 - Backend
   cd backend
   uvicorn api:app --reload

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser and navigate to `http://localhost:5173`**

## 🎪 How It Works

1. Your question enters the carnival
2. Our semantic search ringmaster finds the most relevant Tom Waits lyrics
3. The AI barker crafts a response using only those lyrics
4. You receive wisdom that's equal parts profound and perplexing

## 🛠 Tech Stack

- 🎭 **Frontend**: React + TypeScript + Vite
- 🎪 **Backend**: FastAPI
- 🤖 **AI**: Ollama (Local LLM)
- 🔍 **Vector Store**: FAISS
- 🎨 **Styling**: TailwindCSS
- ✨ **Magic**: Tom Waits' Lyrics

_"Now the moon's rising, ain't no time to lose
Time to listen to the whispers of The Bone Machine..."_ 🌙
