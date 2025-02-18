// Your Gemini API key
const API_KEY = 'AIzaSyCYZrSd57RHna4ujKA5Q_rCRJ18oLe7z2o';

// Add these constants at the top of the file
const STORAGE_KEY = 'aberty_chat_history';

// Chat history to maintain context
let chatHistory = [];

// Add these constants at the top
const BOT_INFO = {
    name: 'Aberty',
    creator: {
        name: 'Aditya',
        description: 'a BCA third year student from Sushant University',
        role: 'developer'
    },
    identity: 'an Alien Intelligence',
    responseStyle: {
        default: 'concise',
        detailed: 'detailed'
    }
};

// Function to add messages to the chat container
function addMessage(message, isUser = false) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message flex items-start space-x-3 opacity-0 transform translate-y-4 ${isUser ? 'justify-end' : ''}`;
    
    const iconClass = isUser ? 'fa-user' : 'fa-robot';
    const bubbleClass = isUser ? 'user-bubble' : 'bg-white';
    const textColor = isUser ? 'text-white' : 'text-gray-800';
    
    // Format message if it contains markdown-style content
    const formattedMessage = isUser ? message : formatMessage(message);
    
    messageDiv.innerHTML = `
        ${!isUser ? `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <i class="fas ${iconClass} text-white text-sm"></i>
            </div>
        ` : ''}
        <div class="${bubbleClass} rounded-2xl p-4 max-w-[80%] shadow-lg chat-bubble hover:shadow-xl transition-shadow">
            <p class="${textColor} whitespace-pre-wrap">${formattedMessage}</p>
            <span class="text-xs text-gray-400 mt-1 block">${new Date().toLocaleTimeString()}</span>
        </div>
        ${isUser ? `
            <div class="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <i class="fas ${iconClass} text-white text-sm"></i>
            </div>
        ` : ''}
    `;
    
    chatContainer.appendChild(messageDiv);
    
    // Animate the message
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.5s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add timestamp to chat history when saving
    if (chatHistory.length > 0 && !chatHistory[chatHistory.length - 1].timestamp) {
        chatHistory[chatHistory.length - 1].timestamp = new Date().toLocaleString();
    }
}

// Update the showTypingIndicator function
function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message flex items-start space-x-3 opacity-0 transform translate-y-4';
    typingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <i class="fas fa-robot text-white text-sm"></i>
        </div>
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-white/10 max-w-[60%]">
            <div class="flex items-center space-x-2">
                <div class="typing-dots flex space-x-1">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span class="text-gray-400 text-sm">Aberty is thinking...</span>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    
    // Animate in
    setTimeout(() => {
        typingDiv.style.opacity = '1';
        typingDiv.style.transform = 'translateY(0)';
    }, 10);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Add this function to detect if detailed response is requested
function isDetailedResponseRequested(message) {
    const detailedIndicators = [
        'explain in detail',
        'tell me more',
        'elaborate',
        'can you explain',
        'give me details',
        'explain thoroughly',
        'in depth',
        'comprehensive',
        'detailed explanation',
        'explain fully'
    ];
    
    return detailedIndicators.some(indicator => 
        message.toLowerCase().includes(indicator)
    );
}

// Update the handleIdentityQuery function
function handleIdentityQuery(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for questions about the model/technology
    if (lowerMessage.includes('what model') || 
        lowerMessage.includes('which model') || 
        lowerMessage.includes('how do you work') ||
        lowerMessage.includes('what technology') ||
        lowerMessage.includes('what language') ||
        lowerMessage.includes('how were you made')) {
        return "I apologize, but the details about my underlying model and technology are confidential. What I can tell you is that I'm Aberty, an Alien Intelligence created to assist users like you.";
    }
    
    // Check for questions about the bot's identity
    if (lowerMessage.includes('who are you') || 
        lowerMessage.includes('what are you') || 
        lowerMessage.includes('tell me about yourself') ||
        lowerMessage.includes('about bot')) {
        return `I am ${BOT_INFO.name}, ${BOT_INFO.identity} created by ${BOT_INFO.creator.name} to assist you.`;
    }
    
    // Check for questions about the developer
    if (lowerMessage.includes('who created you') || 
        lowerMessage.includes('who made you') || 
        lowerMessage.includes('who is your developer') ||
        lowerMessage.includes('who developed you')) {
        return `I was created by ${BOT_INFO.creator.name}, ${BOT_INFO.creator.description}. He developed me to assist users like you.`;
    }
    
    // If no identity-related query is detected, return null
    return null;
}

// Update the callGeminiAPI function
async function callGeminiAPI(userInput) {
    // First check for identity-related queries
    const identityResponse = handleIdentityQuery(userInput);
    if (identityResponse) {
        return identityResponse;
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    const isDetailed = isDetailedResponseRequested(userInput);
    
    // Add context about the bot's identity and response style to the prompt
    const contextPrompt = `You are ${BOT_INFO.name}, ${BOT_INFO.identity} created by ${BOT_INFO.creator.name}. 
                          ${isDetailed ? 'Provide a detailed, comprehensive response with examples and explanations.' : 'Provide a clear, concise response.'} 
                          If the user asks for technical or coding explanations, include relevant examples.
                          Question: ${userInput}`;
    
    try {
        const response = await fetch(`${url}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: contextPrompt
                    }]
                }],
                generationConfig: {
                    temperature: isDetailed ? 0.8 : 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: isDetailed ? 2048 : 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_NONE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_NONE"
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response structure from API');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('API Error:', error);
        if (error.message.includes('API key')) {
            return 'Error: Invalid API key. Please check your API key configuration.';
        }
        return `I encountered an error: ${error.message}. Please try again.`;
    }
}

// Update the form submission handler
document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    const submitButton = e.target.querySelector('button[type="submit"]');
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input and disable
    userInput.value = '';
    userInput.disabled = true;
    userInput.classList.add('processing-input');
    
    // Update submit button
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <i class="fas fa-robot thinking-animation"></i>
        <span>Processing...</span>
    `;
    
    // Show typing indicator
    showTypingIndicator();
    
    // Add message to chat history
    chatHistory.push({ role: 'user', content: message });
    
    try {
        // Get AI response
        const response = await callGeminiAPI(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response to chat
        addMessage(response);
        
        // Add response to chat history
        chatHistory.push({ role: 'assistant', content: response });
        saveChatHistory();
    } catch (error) {
        removeTypingIndicator();
        showToast('An error occurred while processing your request.', 'error');
    } finally {
        // Re-enable input and reset button
        userInput.disabled = false;
        userInput.classList.remove('processing-input');
        userInput.focus();
        
        submitButton.disabled = false;
        submitButton.innerHTML = `
            <span>Send</span>
            <i class="fas fa-paper-plane"></i>
        `;
    }
});

// Add visual feedback for input focus
const userInput = document.getElementById('user-input');
userInput.addEventListener('focus', () => {
    userInput.parentElement.classList.add('ring-2', 'ring-violet-500', 'scale-[1.02]');
});

userInput.addEventListener('blur', () => {
    userInput.parentElement.classList.remove('ring-2', 'ring-violet-500', 'scale-[1.02]');
});

// Add these new features
document.addEventListener('DOMContentLoaded', () => {
    // Add input placeholder animation
    const input = document.getElementById('user-input');
    const placeholders = [
        "Ask me anything...",
        "I'm here to help...",
        "What's on your mind?",
        "Let's chat..."
    ];
    let currentPlaceholder = 0;

    setInterval(() => {
        input.setAttribute('placeholder', placeholders[currentPlaceholder]);
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
    }, 3000);

    // Add microphone button functionality (just visual for now)
    const micButton = document.querySelector('.fa-microphone').parentElement;
    micButton.addEventListener('click', () => {
        micButton.classList.add('text-purple-500');
        setTimeout(() => {
            micButton.classList.remove('text-purple-500');
        }, 1000);
    });

    // Load saved chat history
    loadChatHistory();

    // Add export button handler
    document.getElementById('export-chat').addEventListener('click', () => {
        if (chatHistory.length === 0) {
            showToast('No chat history to export.', 'error');
            return;
        }
        exportChatToPDF();
    });
});

// Function to save chat history to localStorage
function saveChatHistory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
}

// Function to load chat history from localStorage
function loadChatHistory() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        chatHistory = JSON.parse(saved);
        // Replay all messages from history
        chatHistory.forEach(msg => {
            addMessage(msg.content, msg.role === 'user');
        });
    }
}

// Add this function for the warning modal
function showWarningModal(message, onConfirm) {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-lg p-6 max-w-md w-full mx-4 transform scale-95 opacity-0 transition-all duration-300';
    modal.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Warning!</h3>
            <p class="text-gray-600 mb-6">${message}</p>
            <div class="flex space-x-4 justify-center">
                <button class="cancel-btn px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
                <button class="confirm-btn px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
                    Clear History
                </button>
            </div>
        </div>
    `;
    
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    
    // Animate in
    setTimeout(() => {
        modal.style.transform = 'scale(1)';
        modal.style.opacity = '1';
    }, 10);
    
    // Handle button clicks
    const cancelBtn = modal.querySelector('.cancel-btn');
    const confirmBtn = modal.querySelector('.confirm-btn');
    
    cancelBtn.addEventListener('click', () => {
        closeModal();
    });
    
    confirmBtn.addEventListener('click', () => {
        closeModal();
        onConfirm();
    });
    
    // Close modal function
    function closeModal() {
        modal.style.transform = 'scale(95)';
        modal.style.opacity = '0';
        backdrop.style.opacity = '0';
        setTimeout(() => {
            backdrop.remove();
        }, 300);
    }
    
    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            closeModal();
        }
    });
}

// Update the clear chat functionality
document.getElementById('clear-chat').addEventListener('click', () => {
    showWarningModal(
        'This action will permanently delete all chat history. Are you sure you want to continue?',
        () => {
            // Clear localStorage
            localStorage.removeItem(STORAGE_KEY);
            
            // Clear chat history array
            chatHistory = [];
            
            // Clear chat container
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = '';
            
            // Add initial greeting message
            addMessage("Hello! I'm Aberty AI. How can I assist you today? 🚀", false);
            
            // Show success toast
            showToast('Chat history cleared successfully!');
        }
    );
});

// Update the toast notification function for better visibility
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    
    // Define colors for different toast types
    const colors = {
        success: 'from-green-500 to-green-600',
        error: 'from-red-500 to-red-600',
        info: 'from-blue-500 to-blue-600'
    };
    
    // Define icons for different toast types
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.className = `
        fixed bottom-4 right-4 
        bg-gradient-to-r ${colors[type]}
        text-white px-6 py-3 rounded-lg shadow-lg 
        transform translate-y-20 opacity-0 transition-all duration-500
        flex items-center space-x-2
    `;
    
    toast.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translate(0)';
        toast.style.opacity = '1';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translate-y-20';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add these styles to your existing styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .user-bubble {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .chat-bubble {
            position: relative;
            transition: all 0.3s ease;
        }
        
        .chat-bubble:hover {
            transform: translateY(-2px);
        }
        
        @keyframes slideIn {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }

        .typing-dots {
            display: flex;
            align-items: center;
        }

        .typing-dots span {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #8B5CF6;
            animation: typingDots 1.4s infinite;
            margin: 0 2px;
            opacity: 0.3;
        }

        .typing-dots span:nth-child(1) { animation-delay: 0s; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDots {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 1; }
        }

        .processing-input {
            position: relative;
            overflow: hidden;
        }

        .processing-input::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background: linear-gradient(90deg, #8B5CF6, #EC4899);
            animation: processingLine 2s infinite;
        }

        @keyframes processingLine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .thinking-animation {
            animation: thinking 2s infinite;
        }

        @keyframes thinking {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-10deg); }
            75% { transform: rotate(10deg); }
        }
    </style>
`);

// Add this function to handle PDF export
function exportChatToPDF() {
    // Create a clone of the chat container for PDF
    const chatContainer = document.getElementById('chat-container');
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'p-8 bg-white';
    
    // Add header to PDF
    pdfContainer.innerHTML = `
        <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Aberty AI Chat History</h1>
            <p class="text-gray-600">Exported on ${new Date().toLocaleString()}</p>
        </div>
    `;
    
    // Create chat content for PDF
    const chatContent = document.createElement('div');
    chatContent.className = 'space-y-4';
    
    // Add each message to the PDF content
    chatHistory.forEach(msg => {
        const isUser = msg.role === 'user';
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mb-4';
        messageDiv.innerHTML = `
            <div class="flex items-start ${isUser ? 'justify-end' : ''}">
                <div class="max-w-[80%] ${isUser ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg p-3">
                    <div class="font-bold mb-1">${isUser ? 'You' : 'Aberty AI'}</div>
                    <p class="text-gray-800">${msg.content}</p>
                    <div class="text-xs text-gray-500 mt-1">
                        ${msg.timestamp || new Date().toLocaleString()}
                    </div>
                </div>
            </div>
        `;
        chatContent.appendChild(messageDiv);
    });
    
    pdfContainer.appendChild(chatContent);
    
    // PDF export options
    const opt = {
        margin: [10, 10],
        filename: `aberty-ai-chat-${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };
    
    // Show loading toast
    showToast('Preparing PDF for download...', 'info');
    
    // Generate PDF
    html2pdf().set(opt).from(pdfContainer).save()
        .then(() => {
            showToast('Chat history exported successfully!', 'success');
        })
        .catch(err => {
            console.error('PDF Export Error:', err);
            showToast('Failed to export chat history.', 'error');
        });
}

// Add this helper function to format messages
function formatMessage(message) {
    // Convert markdown-style formatting to HTML
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/```(.*?)```/g, '<pre><code>$1</code></pre>') // Code blocks
        .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
        .replace(/\n/g, '<br>'); // New lines
} 