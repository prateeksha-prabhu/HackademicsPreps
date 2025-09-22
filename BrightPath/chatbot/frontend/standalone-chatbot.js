// Chatbot functionality for standalone pages
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('chat-button');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatWindow = document.getElementById('chat-window');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const closeBtn = document.getElementById('close-chat');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  // Initialize with a welcome message
  appendMessage("Hi there! I'm your BrightPath assistant. How can I help you today?", "ai");

  // Toggle chatbot visibility
  chatButton.addEventListener('click', () => {
    if (chatbotContainer.style.display === 'block') {
      chatbotContainer.style.display = 'none';
    } else {
      chatbotContainer.style.display = 'block';
    }
  });

  // Close chatbot
  closeBtn.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
  });

  // Send message on button click
  sendBtn.addEventListener('click', sendMessage);

  // Send message on Enter key
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Add event listeners to suggestion chips
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      userInput.value = chip.textContent;
      sendMessage();
    });
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    appendMessage(message, "user");
    userInput.value = "";
    userInput.focus();

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "ai", "typing-indicator");
    typingIndicator.innerHTML = "<span>.</span><span>.</span><span>.</span>";
    chatWindow.appendChild(typingIndicator);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Simulate API call delay
    setTimeout(() => {
      // Remove typing indicator
      chatWindow.removeChild(typingIndicator);
      
      // Get response based on message content
      const botResponse = getBotResponse(message);
      appendMessage(botResponse, "ai");
    }, 1000);
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  // Simple bot responses (replace with actual API in production)
  function getBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes("hello") || message.includes("hi")) {
      return "Hello! How can I help you with BrightPath today?";
    } else if (message.includes("attendance") || message.includes("check attendance")) {
      return "To check attendance, login to your portal and navigate to the Attendance section. You can view daily, weekly, or monthly attendance records there.";
    } else if (message.includes("marks") || message.includes("grades") || message.includes("view student marks")) {
      return "Student marks can be accessed through the Marks section in your portal. You'll find detailed breakdowns by subject and assessment type.";
    } else if (message.includes("dropout") || message.includes("prediction") || message.includes("risk")) {
      return "Our dropout prediction system analyzes various factors including attendance, marks, and engagement to provide early warnings. This helps in taking timely interventions.";
    } else if (message.includes("contact") || message.includes("support") || message.includes("help")) {
      return "For additional help, please contact our support team at support@brightpath.edu or call us at (555) 123-4567.";
    } else if (message.includes("login") || message.includes("password")) {
      return "For login issues, please use the respective login portals. If you forgot your password, there's a 'Forgot Password' option available.";
    } else {
      return "I'm not sure I understand. Could you please rephrase your question or select one of the suggestion chips below?";
    }
  }
});
