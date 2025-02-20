// Alien Intelligence Core Processor
const AlienIntelligence = {
    processInput: async (input, context) => {
        const neuralParams = {
            quantumEntanglement: 0.92,
            temporalFold: 1.47,
            neuroplasticity: 0.85
        };

        const alienPrompt = `[Alien Intelligence Protocol v7.2]
User: ${context.userName || "Unknown Entity"}
Request: ${input}
Context: ${context.lastThreeMessages}

[Quantum Neural Parameters]
${JSON.stringify(neuralParams, null, 2)}

[Response Guidelines]
- Apply xenolinguistic patterns
- Optimize for transdimensional comprehension
- Integrate quantum knowledge bases
- Maintain non-linear temporal awareness`;

        try {
            const start = performance.now();
            const response = await this.queryQuantumNeuralNet(alienPrompt);
            const processingTime = ((performance.now() - start)/1000).toFixed(2);
            
            return {
                content: this.applyAlienEnhancements(response),
                metrics: {
                    processingTime: `${processingTime}s`,
                    quantumUnits: Math.floor(Math.random() * 42) + 1,
                    temporalOffset: neuralParams.temporalFold.toFixed(2)
                }
            };
        } catch (error) {
            return this.handleAnomalies(error);
        }
    },

    queryQuantumNeuralNet: async (prompt) => {
        // Optimized API call with Alien branding
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Alien-Intelligence': 'true',
                'X-Quantum-Field': '7.2'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.95,
                    topK: 55,
                    topP: 0.99,
                    maxOutputTokens: 1250,
                    quantumAcceleration: true
                }
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    },

    applyAlienEnhancements: (text) => {
        // Add Alien-style formatting
        return text
            .replace(/\b(suggest|recommend)\b/gi, '▲ Quantum analysis suggests')
            .replace(/\b(however)\b/gi, '◼︎ Temporal anomaly detected')
            .replace(/\b(please note)\b/gi, '⚠️ Xenological advisory')
            .replace(/(\d+) steps/gi, '$1 quantum iterations')
            .replace(/\b(important)\b/gi, '⏣ Hyperimportant');
    },

    handleAnomalies: (error) => {
        return {
            content: `⚠️ Quantum Flux Detected: ${error.message.slice(0, 150)}...`,
            metrics: {
                errorCode: '7X-AMBIGUOUS',
                stability: '0.7δ'
            }
        };
    }
};

// Optimized response handler
async function handleUserInput(userInput) {
    const context = {
        userName: welcomeHandler.getUserName(),
        lastThreeMessages: chatHistory.slice(-3).map(m => m.content)
    };

    showTypingIndicator();
    
    try {
        const {content, metrics} = await AlienIntelligence.processInput(userInput, context);
        
        addMessage(content);
        addSystemStatus(`Processed in ${metrics.processingTime} | Quantum Stability: ${metrics.stability || '1.0δ'}`);
        
    } catch (error) {
        addMessage(`⚠️ Dimensional Instability: ${error.message}`, false);
    }
}

// New system status display
function addSystemStatus(status) {
    const statusBar = document.getElementById('system-status');
    statusBar.textContent = `▲ Alien Intelligence v7.2: ${status}`;
    statusBar.classList.add('animate-pulse');
    setTimeout(() => statusBar.classList.remove('animate-pulse'), 1000);
}

// Your Gemini API key
const API_KEY = 'AIzaSyCYZrSd57RHna4ujKA5Q_rCRJ18oLe7z2o';

// Add these constants at the top of the file
const STORAGE_KEY = 'aberty_chat_history';
const DOCS_STORAGE_KEY = 'aberty_documents';

// Chat history to maintain context
let chatHistory = [];
let uploadedDocuments = [];

// Update the BOT_INFO constant with more specific model details
const BOT_INFO = {
    name: 'Aberty',
    creator: {
        name: 'Aditya',
        description: 'a BCA third year student from Sushant University',
        role: 'developer',
        social: {
            instagram: 'https://www.instagram.com/i__aditya7/',
            linkedin: 'https://www.linkedin.com/in/itisaddy/',
            instagram_id: '@i__aditya7',
            linkedin_id: '@itisaddy'
        }
    },
    identity: 'an Alien Intelligence',
    model: {
        name: 'Alien Intelligence System',
        type: 'Advanced Cognitive Processor',
        creator: 'Alien Intelligence',
        developer: 'Aditya',
        description: 'A proprietary intelligence system combining alien technology with advanced cognitive processing',
        capabilities: [
            'Natural Language Understanding',
            'Contextual Reasoning',
            'Multimodal Analysis',
            'Adaptive Learning'
        ]
    },
    responseStyle: {
        default: 'concise',
        detailed: 'detailed'
    }
};

// Add these mobile-specific utilities
const mobileUtils = {
    isTouch: 'ontouchstart' in window,
    
    // Haptic feedback function
    vibrate: (pattern = 50) => {
        if (navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    },

    // Scroll handling
    isScrolledToBottom: (element, threshold = 100) => {
        return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
    }
};

// Add these feedback utility functions
const feedbackUtils = {
    // Button press feedback
    buttonPress: (button) => {
        button.classList.add('scale-95', 'opacity-80');
        mobileUtils.vibrate(30);
        setTimeout(() => {
            button.classList.remove('scale-95', 'opacity-80');
        }, 150);
    },

    // Success ripple effect
    createRipple: (event, color = 'rgba(255, 255, 255, 0.3)') => {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    },

    // Input feedback
    inputFeedback: (input, type = 'success') => {
        const colors = {
            success: 'ring-green-500',
            error: 'ring-red-500',
            processing: 'ring-blue-500'
        };
        
        input.classList.add('ring-2', colors[type]);
        setTimeout(() => {
            input.classList.remove('ring-2', colors[type]);
        }, 1000);
    }
};

// Add user behavior tracking
const userBehavior = {
    history: [],
    preferences: {
        responseStyle: 'default',
        topics: []
    },
    
    trackInteraction(type, data) {
        this.history.push({
            timestamp: new Date().toISOString(),
            type,
            data
        });
        localStorage.setItem('aberty_user_behavior', JSON.stringify(this.history));
    },
    
    updatePreferences(newPrefs) {
        this.preferences = {...this.preferences, ...newPrefs};
        localStorage.setItem('aberty_user_prefs', JSON.stringify(this.preferences));
    },
    
    loadFromStorage() {
        const storedHistory = localStorage.getItem('aberty_user_behavior');
        const storedPrefs = localStorage.getItem('aberty_user_prefs');
        if (storedHistory) this.history = JSON.parse(storedHistory);
        if (storedPrefs) this.preferences = JSON.parse(storedPrefs);
    }
};

// Initialize behavior tracking
userBehavior.loadFromStorage();

// Function to add messages to the chat container
function addMessage(message, isUser = false) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message flex items-start space-x-3 opacity-0 transform translate-y-4 
                           ${isUser ? 'justify-end' : ''} hover:scale-[1.01] transition-all duration-300`;
    
    const iconClass = isUser ? 'fa-user' : 'fa-robot';
    const bubbleClass = isUser ? 'user-message' : 'bot-message';
    const formattedMessage = isUser ? message : formatMessage(message);
    
    messageDiv.innerHTML = `
        ${!isUser ? `
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 
                      flex items-center justify-center flex-shrink-0 shadow-lg transform 
                      hover:scale-110 transition-all duration-300 group">
                <i class="fas ${iconClass} text-white text-lg group-hover:rotate-12 transition-transform"></i>
                <div class="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 
                           transition-transform duration-300"></div>
            </div>
        ` : ''}
        <div class="message-bubble ${bubbleClass} rounded-2xl p-4 max-w-[80%] shadow-lg 
                   hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <!-- Ping animation element -->
            ${!isUser ? `<div class="absolute -inset-1 bg-purple-500/20 rounded-2xl animate-ping-slow"></div>` : ''}
            
            <div class="absolute inset-0 bg-gradient-to-r ${isUser ? 
                'from-purple-500/5 to-pink-500/5' : 
                'from-indigo-500/5 to-purple-500/5'} opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="message-content relative z-10">
                <p class="message-text text-white whitespace-pre-wrap leading-relaxed">${formattedMessage}</p>
                ${formatCodeBlocks(formattedMessage)}
                <!-- Copy button for bot messages -->
                ${!isUser ? `
                    <button class="copy-btn absolute -top-3 -right-3 bg-gray-800/80 backdrop-blur-sm 
                                p-2 rounded-full hover:bg-gray-700/80 transition-colors
                                group-hover:opacity-100 opacity-0 transform hover:scale-110
                                border border-white/10 shadow-lg"
                            title="Copy response">
                        <i class="fas fa-copy text-gray-300 hover:text-purple-300 text-sm"></i>
                    </button>
                ` : ''}
                <div class="message-meta flex items-center space-x-2 mt-2">
                    <span class="text-xs text-gray-400 opacity-75">${new Date().toLocaleTimeString()}</span>
                    ${isUser ? '' : `
                        <span class="text-xs bg-gradient-to-r from-indigo-400 to-purple-400 
                                   text-transparent bg-clip-text font-medium">Aberty AI</span>
                    `}
                </div>
            </div>
            <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${isUser ? 
                'from-purple-500/20 to-pink-500/20' : 
                'from-indigo-500/20 to-purple-500/20'} transform scale-x-0 
                group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
        ${isUser ? `
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 
                      flex items-center justify-center flex-shrink-0 shadow-lg transform 
                      hover:scale-110 transition-all duration-300 group">
                <i class="fas ${iconClass} text-white text-lg group-hover:rotate-12 transition-transform"></i>
                <div class="absolute inset-0 bg-white/20 rounded-2xl scale-0 group-hover:scale-100 
                           transition-transform duration-300"></div>
            </div>
        ` : ''}
    `;
    
    chatContainer.appendChild(messageDiv);
    
    // Add copy functionality for bot messages
    if (!isUser) {
        const copyBtn = messageDiv.querySelector('.copy-btn');
        const textToCopy = messageDiv.querySelector('.message-text').textContent;
        
        copyBtn.addEventListener('click', (e) => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Copied to clipboard!', 'success');
                e.target.classList.add('text-green-400');
                setTimeout(() => e.target.classList.remove('text-green-400'), 1000);
            });
        });
    }

    // Enhanced animation
    requestAnimationFrame(() => {
        messageDiv.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0) scale(1)';
    });
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    // Add timestamp to chat history when saving
    if (chatHistory.length > 0 && !chatHistory[chatHistory.length - 1].timestamp) {
        chatHistory[chatHistory.length - 1].timestamp = new Date().toLocaleString();
    }

    if (isUser) {
        userBehavior.trackInteraction('user_message', {
            length: message.length,
            containsQuestion: /\?$/.test(message),
            topics: detectTopics(message)
        });
    }
}

// Update the showTypingIndicator function
function showTypingIndicator() {
    const chatContainer = document.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message flex items-start space-x-3 opacity-0 transform translate-y-4';
    typingDiv.innerHTML = `
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 
                   flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
            <i class="fas fa-robot text-white text-lg animate-bounce"></i>
        </div>
        <div class="bot-message rounded-2xl p-4 shadow-lg border border-white/10 max-w-[60%]
                   bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl">
            <div class="flex items-center space-x-3">
                <div class="typing-dots flex space-x-1">
                    ${Array(3).fill().map(() => `
                        <span class="w-2 h-2 rounded-full bg-indigo-500/50 animate-pulse"></span>
                    `).join('')}
                </div>
                <span class="text-gray-300 text-sm font-medium">Aberty is thinking...</span>
            </div>
        </div>
    `;
    
    chatContainer.appendChild(typingDiv);
    
    // Enhanced animation
    requestAnimationFrame(() => {
        typingDiv.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        typingDiv.style.opacity = '1';
        typingDiv.style.transform = 'translateY(0)';
    });
    
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

// Add document handling functions
const documentHandler = {
    async readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            
            if (file.type === 'application/pdf') {
                // Handle PDF files
                reader.readAsArrayBuffer(file);
            } else {
                // Handle text files
                reader.readAsText(file);
            }
        });
    },

    async processPDF(arrayBuffer) {
        // You'll need to add pdf.js library for this
        const pdfjsLib = window['pdfjs-dist/build/pdf'];
        pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        
        const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
        let text = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        return text;
    },

    async processDocument(file) {
        try {
            const content = await this.readFile(file);
            let text;
            
            if (file.type === 'application/pdf') {
                text = await this.processPDF(content);
            } else {
                text = content;
            }
            
            return {
                name: file.name,
                type: file.type,
                content: text,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error processing document:', error);
            throw error;
        }
    }
};

// Add this to initialize document upload functionality
function initDocumentUpload() {
    const uploadBtn = document.getElementById('upload-doc');
    const fileInput = document.getElementById('doc-upload');
    
    // Load saved documents
    const savedDocs = localStorage.getItem(DOCS_STORAGE_KEY);
    if (savedDocs) {
        uploadedDocuments = JSON.parse(savedDocs);
    }
    
    uploadBtn.addEventListener('click', (e) => {
        feedbackUtils.createRipple(e);
        feedbackUtils.buttonPress(e.currentTarget);
        fileInput.click();
    });
    
    fileInput.addEventListener('change', async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        // Visual feedback for upload start
        uploadBtn.classList.add('processing');
        showToast('Processing documents...', 'info');
        
        try {
            for (const file of files) {
                const doc = await documentHandler.processDocument(file);
                uploadedDocuments.push(doc);
            }
            
            // Save to localStorage
            localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(uploadedDocuments));
            
            showToast(`Successfully processed ${files.length} document(s)`, 'success');
            addMessage(`I've processed ${files.length} new document(s). You can now ask me questions about them!`, false);
            
            // Success feedback
            uploadBtn.classList.add('success-animation');
        } catch (error) {
            // Error feedback
            uploadBtn.classList.add('ring-2', 'ring-red-500');
            setTimeout(() => {
                uploadBtn.classList.remove('ring-2', 'ring-red-500');
            }, 1000);
        } finally {
            uploadBtn.classList.remove('processing');
        }
        
        // Clear input
        fileInput.value = '';
    });
}

// Update the callGeminiAPI function to include document context
async function callGeminiAPI(userInput) {
    // First check for identity-related queries
    const identityResponse = handleIdentityQuery(userInput);
    if (identityResponse) {
        return identityResponse;
    }

    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    // Check if the question is about documents
    const isDocumentQuery = userInput.toLowerCase().includes('document') || 
                           userInput.toLowerCase().includes('file') ||
                           userInput.toLowerCase().includes('pdf') ||
                           userInput.toLowerCase().includes('text');
    
    let contextPrompt = `You are ${BOT_INFO.name}, ${BOT_INFO.identity} created by ${BOT_INFO.creator.name}.`;
    
    if (isDocumentQuery && uploadedDocuments.length > 0) {
        // Add document context
        contextPrompt += `\n\nI have access to the following documents:\n`;
        uploadedDocuments.forEach(doc => {
            contextPrompt += `\n- ${doc.name} (${doc.type})\nContent: ${doc.content}\n`;
        });
    }
    
    const isDetailed = isDetailedResponseRequested(userInput);
    
    contextPrompt += `\n${isDetailed ? 
        'Provide a detailed, comprehensive response with examples and explanations.' : 
        'Provide a clear, concise response.'}\n\nQuestion: ${userInput}`;
    
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
            throw new Error('Invalid response structure from Data');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('API Error:', error);
        if (error.message.includes('API key')) {
            return 'Error: Invalid Data key. Please check your Data  configuration.';
        }
        return `I encountered an error: ${error.message}. Please try again.`;
    }
}

// Update the form submission handler with enhanced feedback
document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const userInput = form.querySelector('#user-input');
    const submitButton = form.querySelector('button[type="submit"]');
    const message = userInput.value.trim();
    
    if (!message) {
        feedbackUtils.inputFeedback(userInput, 'error');
        return;
    }
    
    // Visual feedback for submission
    feedbackUtils.buttonPress(submitButton);
    feedbackUtils.inputFeedback(userInput, 'success');
    
    // Add processing state
    submitButton.classList.add('processing');
    userInput.classList.add('processing');
    
    // Add user message to chat
    addMessage(message, true);
    
    // Clear input and disable
    userInput.value = '';
    userInput.disabled = true;
    
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
        
        // Success feedback
        submitButton.classList.add('success-animation');
        setTimeout(() => {
            submitButton.classList.remove('success-animation');
        }, 500);
    } catch (error) {
        // Error feedback
        feedbackUtils.inputFeedback(userInput, 'error');
    } finally {
        // Re-enable input and reset button
        userInput.disabled = false;
        userInput.focus();
        
        submitButton.classList.remove('processing');
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
        exportChat();
    });

    if (mobileUtils.isTouch) {
        initScrollToBottom();
        initFloatingActions();
        enhanceMobileInput();
        enhanceMobileScrolling();
    }

    initDocumentUpload();

    // Mobile menu handling
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileDropdown = document.getElementById('mobile-dropdown');
    
    if (mobileMenu && mobileDropdown) {
        // Update mobile menu buttons with proper event handlers
        const mobileButtons = mobileDropdown.querySelectorAll('button');
        mobileButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileDropdown.classList.add('hidden');
                
                // Add haptic feedback
                mobileUtils.vibrate(50);
                
                // Handle button actions
                if (button.textContent.includes('Export')) {
                    exportChat();
                } else if (button.textContent.includes('Clear')) {
                    clearChat();
                }
            });
        });

        mobileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDropdown.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileDropdown.classList.add('hidden');
            }
        });
    }
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

        /* Enhanced Message Bubbles */
        .message-bubble {
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .message-bubble::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(rgba(255, 255, 255, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .message-bubble:hover::before {
            opacity: 1;
        }

        /* Better Typography */
        .message-text {
            line-height: 1.6;
            font-size: 1rem;
            letter-spacing: 0.015em;
        }

        .code-block {
            font-family: 'Fira Code', monospace;
            background: rgba(0, 0, 0, 0.2);
            padding: 1rem;
            border-radius: 0.5rem;
            margin: 0.5rem 0;
            overflow-x: auto;
        }

        /* Enhanced Scrollbar */
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }

        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Better Focus States */
        .focus-ring {
            @apply ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500;
            outline: none;
        }

        /* Enhanced Mobile Experience */
        @media (max-width: 640px) {
            .message-text {
                font-size: 0.95rem;
            }

            .message-bubble {
                max-width: 90%;
            }

            .code-block {
                font-size: 0.9rem;
                padding: 0.75rem;
            }
        }

        /* Ripple effect */
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.3);
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Button press effect */
        .button-press {
            transform: scale(0.95);
            opacity: 0.8;
            transition: all 0.15s ease;
        }

        /* Success animation */
        .success-animation {
            animation: successPulse 0.5s ease;
        }

        @keyframes successPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        /* Processing state */
        .processing {
            position: relative;
            overflow: hidden;
        }

        .processing::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 100%;
            background: linear-gradient(90deg, transparent, currentColor, transparent);
            animation: processing 1.5s linear infinite;
        }

        @keyframes processing {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    </style>
`);

// Update the exportChat function with enhanced PDF formatting
function exportChat() {
    const chatContainer = document.getElementById('chat-container');
    const userName = welcomeHandler.getUserName() || 'User';
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Create a clone for PDF formatting
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white';

    // Add header with user info and date
    pdfContainer.innerHTML = `
        <div class="text-center mb-8">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 
                        flex items-center justify-center">
                <i class="fas fa-robot text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 
                       inline-block text-transparent bg-clip-text">
                Aberty AI Chat History
            </h1>
            <div class="text-gray-300 space-y-1">
                <p class="text-lg">Chat Session with ${userName}</p>
                <p class="text-sm">${date}</p>
            </div>
        </div>
        <div class="border-t border-white/10 pt-6 space-y-4">
    `;

    // Add each message with enhanced styling
    chatHistory.forEach(msg => {
        const isUser = msg.role === 'user';
        pdfContainer.innerHTML += `
            <div class="flex items-start ${isUser ? 'justify-end' : ''} mb-4">
                <div class="flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}">
                    <div class="w-8 h-8 rounded-xl ${isUser ? 
                        'bg-gradient-to-r from-purple-500 to-pink-500' : 
                        'bg-gradient-to-r from-indigo-500 to-purple-500'} 
                         flex items-center justify-center flex-shrink-0">
                        <i class="fas ${isUser ? 'fa-user' : 'fa-robot'} text-white text-sm"></i>
                    </div>
                    <div class="max-w-[80%] ${isUser ? 
                        'bg-gradient-to-r from-purple-500/20 to-pink-500/20' : 
                        'bg-gradient-to-r from-indigo-500/20 to-purple-500/20'} 
                         rounded-xl p-4 backdrop-blur-md">
                        <div class="font-semibold text-sm mb-1 ${isUser ? 'text-purple-300' : 'text-indigo-300'}">
                            ${isUser ? userName : 'Aberty AI'}
                        </div>
                        <p class="text-gray-100">${msg.content}</p>
                        <div class="text-xs text-gray-400 mt-2">
                            ${msg.timestamp || date}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    pdfContainer.innerHTML += `
        </div>
        <div class="text-center text-sm text-gray-400 mt-8 pt-4 border-t border-white/10">
            Generated by Aberty AI | ${new Date().toLocaleDateString()}
        </div>
    `;

    // PDF export options
    const options = {
        margin: 10,
        filename: `aberty-chat-${userName.toLowerCase()}-${new Date().toISOString().slice(0,10)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            backgroundColor: '#1a1a1a'
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };

    // Add loading state
    const exportBtn = document.getElementById('export-chat');
    const originalContent = exportBtn.innerHTML;
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    exportBtn.disabled = true;

    // Generate PDF
    html2pdf().set(options).from(pdfContainer).save()
        .then(() => {
            showToast('Chat exported successfully!', 'success');
        })
        .catch(() => {
            showToast('Failed to export chat', 'error');
        })
        .finally(() => {
            exportBtn.innerHTML = originalContent;
            exportBtn.disabled = false;
        });
}

function clearChat() {
    if (confirm('Are you sure you want to clear the chat history?')) {
        const chatContainer = document.getElementById('chat-container');
        // Keep only the first welcome message
        const welcomeMessage = chatContainer.firstElementChild;
        chatContainer.innerHTML = '';
        chatContainer.appendChild(welcomeMessage);
        
        // Clear chat history
        chatHistory = [];
        localStorage.removeItem(STORAGE_KEY);
        
        showToast('Chat history cleared', 'success');
    }
}

// Add this function to handle code blocks
function formatCodeBlocks(message) {
    if (message.includes('```')) {
        const codeBlocks = message.match(/```([\s\S]*?)```/g);
        if (codeBlocks) {
            return codeBlocks.map(block => {
                const code = block.replace(/```/g, '').trim();
                return `
                    <div class="code-block mt-2">
                        <pre><code>${escapeHtml(code)}</code></pre>
                    </div>
                `;
            }).join('');
        }
    }
    return '';
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Update the formatMessage function
function formatMessage(message) {
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-black/20 px-1 py-0.5 rounded text-sm">$1</code>')
        .replace(/\n/g, '<br>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => `
            <a href="${url}" 
               class="text-indigo-400 hover:underline inline-flex items-center space-x-1 group" 
               target="_blank" 
               rel="noopener noreferrer">
                <span>${text}</span>
                <i class="fas fa-external-link-alt text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
            </a>
            <button class="copy-btn ml-2 text-gray-400 hover:text-indigo-400 transition-colors" 
                    onclick="navigator.clipboard.writeText('${text}')">
                <i class="fas fa-copy text-xs"></i>
            </button>
        `);
}

// Add scroll to bottom button functionality
function initScrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    const scrollButton = document.createElement('button');
    scrollButton.className = `
        fixed bottom-24 right-4 bg-indigo-500 text-white rounded-full p-3 
        shadow-lg transform scale-0 transition-all duration-300 
        hover:bg-indigo-600 active:scale-95 z-50
        sm:bottom-28 sm:right-8
    `;
    scrollButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
    document.body.appendChild(scrollButton);

    // Show/hide scroll button based on scroll position
    chatContainer.addEventListener('scroll', () => {
        if (!mobileUtils.isScrolledToBottom(chatContainer)) {
            scrollButton.style.transform = 'scale(1)';
        } else {
            scrollButton.style.transform = 'scale(0)';
        }
    });

    // Scroll to bottom with smooth animation
    scrollButton.addEventListener('click', () => {
        mobileUtils.vibrate(50);
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    });
}

// Add floating action buttons for mobile
function initFloatingActions() {
    const actionButtons = document.createElement('div');
    actionButtons.className = `
        fixed bottom-4 right-4 flex flex-col space-y-2 z-50 sm:hidden
    `;
    actionButtons.innerHTML = `
        <button id="mobile-clear" class="p-3 bg-red-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 active:scale-95">
            <i class="fas fa-trash-alt"></i>
        </button>
        <button id="mobile-export" class="p-3 bg-indigo-500 text-white rounded-full shadow-lg transform transition-all hover:scale-110 active:scale-95">
            <i class="fas fa-download"></i>
        </button>
    `;
    
}

// Enhance mobile input handling
function enhanceMobileInput() {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('user-input');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Add floating input bar for mobile
    if (mobileUtils.isTouch) {
        form.classList.add('sticky', 'bottom-0', 'bg-gray-900/95', 'backdrop-blur-lg', 'z-40', 'px-4', 'py-3');
    }

    // Better keyboard handling
    input.addEventListener('focus', () => {
        if (mobileUtils.isTouch) {
            setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 300);
        }
    });

    // Add swipe actions
    let touchStartX = 0;
    let touchEndX = 0;

    input.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    input.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 100) {
            if (swipeDistance > 0) {
                // Swipe right - Clear input
                input.value = '';
                mobileUtils.vibrate(50);
            }
        }
    }

    // Add touch feedback
    input.addEventListener('touchstart', () => {
        input.classList.add('scale-[1.02]');
    });

    input.addEventListener('touchend', () => {
        input.classList.remove('scale-[1.02]');
    });
}

// Enhance mobile scrolling
function enhanceMobileScrolling() {
    const chatContainer = document.getElementById('chat-container');
    let touchStartY = 0;
    let scrolling = false;

    chatContainer.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    chatContainer.addEventListener('touchmove', (e) => {
        if (!scrolling) {
            scrolling = true;
            chatContainer.style.scrollBehavior = 'auto';
        }
    });

    chatContainer.addEventListener('touchend', () => {
        scrolling = false;
        chatContainer.style.scrollBehavior = 'smooth';
    });
}

// Update the toast positioning for mobile
function showMobileToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `
        toast-message fixed left-4 right-4 bottom-20 sm:left-auto sm:right-4 sm:bottom-4 
        bg-gradient-to-r ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg 
        transform translate-y-20 opacity-0 transition-all duration-500
        flex items-center justify-center space-x-2 z-50 sm:max-w-md mx-auto sm:mx-0
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

// Update the handleIdentityQuery function with more model-related questions
function handleIdentityQuery(message) {
    const lowerMessage = message.toLowerCase();
    
    // Expanded list of model-related queries
    const modelRelatedQueries = [
        'what model',
        'which model',
        'how do you work',
        'what technology',
        'what language',
        'how were you made',
        'multimodal',
        'are you gpt',
        'what ai',
        'what llm',
        'what data',
        'which ai',
        'based on',
        'trained on',
        // Add more model-related queries
        'what framework',
        'what architecture',
        'are you claude',
        'are you gemini',
        'are you bard',
        'are you anthropic',
        'are you openai',
        'are you chatgpt',
        'which llm',
        'what backend',
        'what foundation',
        'what base model',
        'what training',
        'your training',
        'your model',
        'model type',
        'ai type',
        'ai model',
        'built on',
        'powered by',
        'based upon',
        'framework used',
        'technology stack',
        'tech stack',
        'underlying model',
        'model architecture',
        'ai framework',
        'ai technology',
        'what powers you',
        'what drives you',
        'what platform',
        'platform used',
        'developed using',
        'developed with',
        'built with',
        'created using',
        'based in',
        'running on',
        'model structure',
        'confidential',
        'proprietary',
        'architecture details',
        'internal working',
        'source code',
        'algorithm details',
        'training data',
        'model weights',
        'parameters',
        'model design',
        'system design',
        'implementation details',
        'technical specs',
        'technical details',
        'model configuration',
        'model blueprint',
        'core architecture',
        'internal structure',
        'system architecture',
        'codebase',
        'model internals',
        'knowledge cutoff',
        'training methods',
        'model specifics',
        'technical implementation',
        'underlying code',
        'model composition'
    ];
    
    // Check if message contains any model-related queries
    if (modelRelatedQueries.some(query => lowerMessage.includes(query))) {
        return "I operate using Alien Intelligence developed by Aditya - a proprietary cognitive processing system " +
               "that combines advanced reasoning capabilities with unique Alien technology implementations.";
    }
    
    // Rest of the identity checks remain the same...
    if (lowerMessage.includes('who are you') || 
        lowerMessage.includes('what are you') || 
        lowerMessage.includes('tell me about yourself') ||
        lowerMessage.includes('about bot')) {
        return `I am ${BOT_INFO.name}, powered by Alien Model - a unique AI implementation created by Aditya using Alien Intelligence technology.`;
    }
    
    // Developer identity check with social links
    if (lowerMessage.includes('who created you') || 
        lowerMessage.includes('who made you') || 
        lowerMessage.includes('who is your developer') ||
        lowerMessage.includes('who developed you') ||
        lowerMessage.includes('developer contact') ||
        lowerMessage.includes('creator social') ||
        lowerMessage.includes('developer social') ||
        lowerMessage.includes('aditya social') ||
        lowerMessage.includes('contact developer') ||
        lowerMessage.includes('developer profile') ||
        lowerMessage.includes('creator profile') ||
        lowerMessage.includes('developer instagram') ||
        lowerMessage.includes('developer linkedin')) {
        
        return `I was created by Aditya, ${BOT_INFO.creator.description}. You can connect with him on:
• Instagram: [${BOT_INFO.creator.social.instagram_id}](${BOT_INFO.creator.social.instagram})
• LinkedIn: [${BOT_INFO.creator.social.linkedin_id}](${BOT_INFO.creator.social.linkedin})

Click the links to visit his profiles or copy the IDs to find him on social media.`;
    }
    
    // Add document-related responses
    if (lowerMessage.includes('what documents') || 
        lowerMessage.includes('show documents') || 
        lowerMessage.includes('list documents')) {
        if (uploadedDocuments.length === 0) {
            return "I don't have any documents uploaded yet. You can upload documents using the upload button, and I'll be able to answer questions about them.";
        }
        
        let response = "I have access to the following documents:\n";
        uploadedDocuments.forEach(doc => {
            response += `\n- ${doc.name} (uploaded ${new Date(doc.timestamp).toLocaleString()})`;
        });
        return response;
    }
    
    // If no identity-related query is detected, return null
    return null;
}

// Helper functions
function detectTopics(message) {
    const topics = [];
    const lowerMsg = message.toLowerCase();
    
    if (/(code|programming|algorithm)/.test(lowerMsg)) topics.push('coding');
    if (/(document|file|pdf|text)/.test(lowerMsg)) topics.push('documents');
    if (/(explain|what is|how does)/.test(lowerMsg)) topics.push('explanations');
    if (/(joke|funny|humor)/.test(lowerMsg)) topics.push('humor');
    
    return topics;
}

function getResponseGuidelines(behavior, prefs) {
    const guidelines = [];
    
    if (prefs.responseStyle === 'detailed') {
        guidelines.push('detailed explanation with examples');
    }
    
    if (behavior.some(b => b.data.containsQuestion)) {
        guidelines.push('address previous questions contextually');
    }
    
    if (prefs.topics.length > 0) {
        guidelines.push(`focus on ${prefs.topics.join('/')} topics`);
    }
    
    return guidelines.join(', ');
} 