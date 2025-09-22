# BrightPath Chatbot Implementation

## Two Implementation Options

### 1. Standalone JavaScript Chatbot
**What you get**
- Simple frontend-only chatbot implementation using vanilla JavaScript
- No backend required - works with static file serving
- Pre-programmed responses for common questions
- Suggestion chips for quick interactions
- Used in the Parent Portal and Student Portal pages

### 2. AI-Powered Chatbot (Original Implementation)
**What you get**
- Node.js + Express backend that indexes local text files using OpenAI embeddings
- Retrieval-augmented chat endpoint for more intelligent responses
- `data/sample.txt` sample content for knowledge base
- No external vector DB required — embeddings and metadata are stored locally in `vectors.json`

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

## Using the Standalone Chatbot

### Integration in HTML Pages

1. Add the chatbot button and container to your HTML:
   ```html
   <!-- Chatbot Button -->
   <div class="chat-button" id="chat-button">
     <i class="fas fa-comments"></i>
   </div>

   <!-- Chatbot Container -->
   <div class="chatbot-container" id="chatbot-container">
     <iframe src="../chatbot/frontend/index.html" class="chatbot-iframe" id="chatbot-iframe" allow="microphone"></iframe>
   </div>
   ```

2. Add the toggle functionality in your JavaScript:
   ```javascript
   // Chatbot functionality
   const chatButton = document.getElementById('chat-button');
   const chatbotContainer = document.getElementById('chatbot-container');

   // Toggle chatbot visibility
   chatButton.addEventListener('click', () => {
     if (chatbotContainer.style.display === 'block') {
       chatbotContainer.style.display = 'none';
     } else {
       chatbotContainer.style.display = 'block';
     }
   });
   ```

3. Make sure to include the necessary CSS for styling the chatbot button and container.

### React Integration

For React components (like in the Admin Panel), use the `ChatbotComponent.jsx` which provides a fully functional chatbot without requiring an iframe.