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

## 🎵 Example Interactions

**You**: "How should I make important life decisions?"

**Bone Machine**: "Well, the sky's still blue and the ocean's still wine-dark, and you better know which road you're on, cause in the house of earth and stone, every choice is a gamble with loaded dice. Don't trust the rain, it's always got an angle."

## 🎪 Contributing

Got some beautiful madness to add? Feel free to:

1. Fork the carnival
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎭 Acknowledgments

- Tom Waits, for creating a universe of beautiful chaos in lyrics
- The open-source community, for making magic possible
- Coffee and midnight inspiration, for fueling development

---

_"Now the moon's rising, ain't no time to lose
Time to listen to the whispers of The Bone Machine..."_ 🌙
