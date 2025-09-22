import React, { useState, useEffect, useRef } from 'react';

const ChatbotComponent = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your BrightPath assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    setMessages([...messages, { text: inputText, sender: 'user' }]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: getBotResponse(inputText), sender: 'bot' }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Simple bot responses (replace with actual API in production)
  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! How can I help you with BrightPath today?";
    } else if (lowerMessage.includes('attendance') || lowerMessage.includes('check attendance')) {
      return "To check attendance, login to your portal and navigate to the Attendance section. You can view daily, weekly, or monthly attendance records there.";
    } else if (lowerMessage.includes('marks') || lowerMessage.includes('grades') || lowerMessage.includes('view student marks')) {
      return "Student marks can be accessed through the Marks section in your portal. You'll find detailed breakdowns by subject and assessment type.";
    } else if (lowerMessage.includes('dropout') || lowerMessage.includes('prediction') || lowerMessage.includes('risk')) {
      return "Our dropout prediction system analyzes various factors including attendance, marks, and engagement to provide early warnings. This helps in taking timely interventions.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      return "For additional help, please contact our support team at support@brightpath.edu or call us at (555) 123-4567.";
    } else if (lowerMessage.includes('login') || lowerMessage.includes('password')) {
      return "For login issues, please use the respective login portals. If you forgot your password, there's a 'Forgot Password' option available.";
    } else {
      return "I'm not sure I understand. Could you please rephrase your question or select one of the suggestion chips below?";
    }
  };

  // Handle suggestion chip clicks
  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setMessages([...messages, { text: suggestion, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: getBotResponse(suggestion), sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Button */}
      <div 
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-colors z-50"
        onClick={toggleChatbot}
      >
        <i className="fas fa-comments text-white text-xl"></i>
      </div>
      
      {/* Chatbot Container */}
      {showChatbot && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-200 flex flex-col">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <h3 className="font-medium">BrightPath Assistant</h3>
            <button onClick={toggleChatbot} className="text-white hover:text-gray-200">
              &times;
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${msg.sender === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-3">
                <div className="inline-block p-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
              onClick={handleSendMessage}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <div className="p-3 border-t border-gray-200 flex flex-wrap gap-2">
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors"
              onClick={() => handleSuggestionClick("How to check attendance?")}
            >
              How to check attendance?
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors"
              onClick={() => handleSuggestionClick("View student marks")}
            >
              View student marks
            </button>
            <button 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-full transition-colors"
              onClick={() => handleSuggestionClick("Dropout prediction")}
            >
              Dropout prediction
            </button>
          </div>
        </div>
      )}

      <style jsx="true">{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }
        
        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 1px;
          background-color: #606060;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 40% { 
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ChatbotComponent;
