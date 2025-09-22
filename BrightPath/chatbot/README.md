# Custom AI Chatbox — Starter Project

**What you get**
- Simple Node.js + Express backend that indexes local text files using OpenAI embeddings and serves a retrieval-augmented chat endpoint.
- Tiny frontend (single `index.html`) to interact with the backend.
- `data/sample.txt` sample content.
- No external vector DB required — embeddings and metadata are stored locally in `vectors.json`.

**Requirements**
- Node.js (v18+ recommended)
- An OpenAI API Key

**Quick start**
1. Unzip the project.
2. Copy `.env.example` → `.env` and set `OPENAI_API_KEY`.
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Index sample data (this will call OpenAI embeddings):
   ```bash
   node server.js --index
   ```
5. Run the server:
   ```bash
   node server.js
   ```
6. Open `frontend/index.html` in your browser (or serve it with a static server). The frontend calls the backend at `http://localhost:3000`.

**Notes**
- This is a learning starter. For production: use a proper vector DB (Pinecone/Qdrant/Chroma), secure secrets, HTTPS, and rate-limiting.