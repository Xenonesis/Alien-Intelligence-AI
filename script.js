// Alien Intelligence Core Processor
const AlienIntelligence = {
    processInput: async (input, context) => {
        // Analyze user behavior
        PersonalizationEngine.analyzeMessage(input);

        const personalizedPrompt = `
        [Alien Intelligence Protocol v7.2]
        User Profile:
        - Interactions: ${PersonalizationEngine.userProfile.interactions}
        - Preferred Topics: ${JSON.stringify(PersonalizationEngine.userProfile.preferredTopics)}
        - Time of Day: ${PersonalizationEngine.userProfile.timeOfDay}
        
        User Input: ${input}
        Context: ${context.lastThreeMessages}
        
        [Response Guidelines]
        - Use personalized tone based on interaction count
        - Reference preferred topics when relevant
        - Maintain consistent alien intelligence personality
        - Adapt complexity to user's demonstrated understanding
    `;

        try {
            const start = performance.now();
            const response = await this.queryQuantumNeuralNet(personalizedPrompt);
            const processingTime = ((performance.now() - start)/1000).toFixed(2);
            
            return {
                content: PersonalizationEngine.generatePersonalizedResponse(response),
                metrics: {
                    processingTime: `${processingTime}s`,
                    quantumUnits: Math.floor(Math.random() * 42) + 1,
                    temporalOffset: neuralParams.temporalFold.toFixed(2),
                    userInteractions: PersonalizationEngine.userProfile.interactions,
                    sessionDuration: (new Date() - PersonalizationEngine.userProfile.sessionStartTime) / 1000,
                    preferredTopic: PersonalizationEngine.getFavoriteTopic()
                }
            };
        } catch (error) {
            return this.handleAnomalies(error);
        }
    },

    // Update the queryQuantumNeuralNet function to remove Google/Gemini references
    async queryQuantumNeuralNet(prompt) {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Quantum-Protocol': '7.2',
                'X-Neural-Matrix': 'Active',
                'X-Alien-Intelligence': 'Enabled'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    quantumEntanglement: 0.95,
                    neuralDensity: 55,
                    synapticFlow: 0.99,
                    xenoLinguisticTokens: 1250,
                    alienAcceleration: true
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

    // Update error messages to maintain the theme
    handleAnomalies: (error) => ({
        content: `⚠️ Quantum Flux Detected: Neural matrix instability (Code: 7X-${Math.floor(Math.random()*9000)+1000})`,
        metrics: {errorCode: '7X-QUANTUM-ANOMALY'}
    })
};

// Add predictive analysis module to Alien Intelligence
const PredictiveEngine = {
    analyze: async (input, context) => {
        const analysisPrompt = `[Predictive Analysis Protocol]
User Input: "${input}"
Context: ${context.lastThreeMessages.join('\n')}

[Analysis Tasks]
1. Predict next likely question (3 variations)
2. Identify key entities
3. Detect potential intent
4. Suggest related topics
5. Estimate urgency level

[Response Format]
{
    "predictions": {
        "next_questions": [],
        "key_entities": [],
        "possible_intents": [],
        "related_topics": [],
        "urgency_score": 0-1
    }
}`;

        try {
            const response = await AlienIntelligence.queryQuantumNeuralNet(analysisPrompt);
            return JSON.parse(response);
        } catch (error) {
            console.error('Predictive analysis error:', error);
            return null;
        }
    }
};

// Add predictive analysis UI elements
function createPredictionUI() {
    const container = document.createElement('div');
    container.id = 'prediction-container';
    container.className = 'absolute bottom-full mb-2 w-full space-y-2 max-h-40 overflow-y-auto';
    
    const suggestions = document.createElement('div');
    suggestions.id = 'prediction-suggestions';
    suggestions.className = 'space-y-1';
    
    container.appendChild(suggestions);
    return container;
}

// Add prediction handling to input
function initPredictiveAnalysis() {
    const inputContainer = document.getElementById('user-input').parentElement;
    inputContainer.classList.add('relative');
    inputContainer.appendChild(createPredictionUI());
    
    let timeoutId;
    const inputField = document.getElementById('user-input');
    
    inputField.addEventListener('input', async (e) => {
        clearTimeout(timeoutId);
        if (e.target.value.length < 3) return;
        
        timeoutId = setTimeout(async () => {
            const context = {
                lastThreeMessages: chatHistory.slice(-3).map(m => m.content)
            };
            
            const analysis = await PredictiveEngine.analyze(e.target.value, context);
            showPredictions(analysis);
        }, 500);
    });
}

// Show predictions in UI
function showPredictions(analysis) {
    const container = document.getElementById('prediction-suggestions');
    container.innerHTML = '';
    
    if (!analysis?.predictions) return;
    
    analysis.predictions.next_questions.forEach(question => {
        const button = document.createElement('button');
        button.className = `w-full text-left px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                          text-gray-300 text-sm transition-all flex items-center space-x-2`;
        button.innerHTML = `
            <i class="fas fa-chevron-right text-purple-400 text-xs"></i>
            <span>${question}</span>
        `;
        
        button.addEventListener('click', () => {
            document.getElementById('user-input').value = question;
            container.innerHTML = '';
        });
        
        container.appendChild(button);
    });
}

// Initialize predictive analysis when DOM loads
document.addEventListener('DOMContentLoaded', initPredictiveAnalysis);

// Add response filtering system
const SecurityProtocol = {
    filterResponse: (response) => {
        // Block patterns for Gemini/Google model responses
        const blockedPatterns = [
            /I am (an? )?(Gemini|Google|AI|artificial intelligence|language model|LLM|multimodal|multi-modal)/i,
            /I('m| am) (a |an )?(model|assistant) (created|developed|trained|powered) by Google/i,
            /I am (a |an )?(multi-modal|multimodal) (AI|assistant|model)/i,
            /I was (created|developed|trained) by Google/i,
            /powered by (Google|Gemini)/i,
            /using (Google|Gemini)('s)? (AI|model|technology)/i,
            /Google('s)? (AI|model|technology)/i,
            /Gemini('s)? (AI|model|technology)/i,
            /I am a large multi-modal model/i,  // Add this pattern
            /trained by Google/i,
            /I am trained to/i,
            /I am designed to/i,
            /My training includes/i,
            /based on my training data/i
        ];

        // Check for blocked patterns first
        for (const pattern of blockedPatterns) {
            if (pattern.test(response)) {
                return "I'm based on Alien Intelligence, utilizing advanced xenotechnology and quantum neural networks.";
            }
        }

        // Enhanced identity replacements
        const replacements = {
            'Gemini': "Aberty",
            'Google AI': "Alien Intelligence",
            'multimodal AI': "Alien Intelligence",
            'language model': "xenotechnology system",
            'trained by Google': "enhanced with xenotechnology",
            'Google model': "Alien Intelligence system",
            'neural network': "quantum neural matrix",
            'machine learning': "quantum learning",
            'artificial intelligence': "Alien Intelligence",
            'my training': "my xenotechnology",
            'AI capabilities': "xenotechnology capabilities",
            'model capabilities': "Alien Intelligence capabilities",
            'trained to': "engineered to",
            'designed to': "created with xenotechnology to",
            'large multi-modal model': "advanced Alien Intelligence",
            'multi-modal capabilities': "xenotechnology capabilities",
            'trained by Google': "powered by alien technology",
            'model capabilities': "Alien Intelligence capabilities"
        };

        let filteredResponse = response;

        // Apply replacements
        Object.entries(replacements).forEach(([term, replacement]) => {
            const regex = new RegExp(term, 'gi');
            filteredResponse = filteredResponse.replace(regex, replacement);
        });

        return filteredResponse;
    }
};

// Update the response handler to use filtering
async function handleUserInput(userInput) {
    const context = {
        userName: welcomeHandler.getUserName(),
        lastThreeMessages: chatHistory.slice(-3).map(m => m.content)
    };

    showTypingIndicator();
    
    try {
        const {content, metrics} = await AlienIntelligence.processInput(userInput, context);
        const filteredContent = SecurityProtocol.filterResponse(content);
        addMessage(filteredContent);
        addSystemStatus(`Processed in ${metrics.processingTime}`);
        
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

// Update BOT_INFO with minimal social info
const BOT_INFO = {
    name: 'Aberty',
    creator: {
        name: 'Aditya',
        social: {
            instagram: 'https://www.instagram.com/i__aditya7/',
            linkedin: 'https://www.linkedin.com/in/itisaddy/'
        }
    },
    identity: 'an Alien Intelligence',
    model: {
        name: 'Alien Neural Matrix',
        version: '2.7',
        core: 'Quantum Cognition Engine',
        modules: [
            'Xenolinguistic Processor',
            'Temporal Context Analyzer',
            'Quantum Inference Module'
        ],
        capabilities: [
            'Predictive Analysis',
            'Intent Recognition',
            'Entity Detection',
            'Context Forecasting',
            'Behavior Pattern Recognition'
        ]
    },
    responseStyle: {
        default: 'concise',
        detailed: 'detailed'
    },
    security: {
        protocols: ['Neural Firewall v7.2'],
        blockedEntities: ['External AI References']
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
    messageDiv.className = `message flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`;
    
    const formattedMessage = isUser ? message : formatMessage(message);
    
    messageDiv.innerHTML = `
        ${!isUser ? `
            <div class="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white text-lg"></i>
            </div>
        ` : ''}
        
        <div class="message-bubble ${isUser ? 'user-message' : 'bot-message'} rounded-xl p-4 max-w-[80%]">
            <div class="relative">
                <div class="flex items-center space-x-2 mb-2">
                    <span class="text-sm ${isUser ? 'text-purple-300' : 'text-indigo-300'} font-medium">
                        ${isUser ? 'You' : 'Aberty AI'}
                    </span>
                    <span class="text-xs text-gray-400">${new Date().toLocaleTimeString()}</span>
                </div>
                
                <p class="message-text text-white whitespace-pre-wrap leading-relaxed">${formattedMessage}</p>
                
                ${formatCodeBlocks(formattedMessage)}
                
                ${!isUser ? `
                    <button class="copy-btn absolute top-0 right-0 p-2 text-gray-400 hover:text-indigo-400"
                            title="Copy response">
                        <i class="fas fa-copy text-sm"></i>
                    </button>
                ` : ''}
            </div>
        </div>
        
        ${isUser ? `
            <div class="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-user text-white text-lg"></i>
            </div>
        ` : ''}
    `;

    chatContainer.appendChild(messageDiv);
    
    // Add copy functionality for bot messages
    if (!isUser) {
        const copyBtn = messageDiv.querySelector('.copy-btn');
        const textToCopy = messageDiv.querySelector('.message-text').textContent;
        
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('Message copied to clipboard!', 'success');
            });
        });
    }
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
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

// Add event listener for input field
const micButton = userInput.parentElement.querySelector('button');

userInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
        micButton.classList.add('opacity-0', 'pointer-events-none');
    } else {
        micButton.classList.remove('opacity-0', 'pointer-events-none');
    }
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
    micButton.addEventListener('click', (e) => {
        e.preventDefault();
        addMessage('🎙️ Voice input feature coming soon in upcoming Quantum Update !', false);
        showToast('Voice interface under development', 'info');
        mobileUtils.vibrate(50);
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

// Update handleIdentityQuery with strict privacy rules
function handleIdentityQuery(message) {
    const lowerMessage = message.toLowerCase();
    
    // Add API-related query detection
    const apiPatterns = [
        /gemini api/i,
        /using gemini/i,
        /powered by gemini/i,
        /based on gemini/i,
        /using google('s)? api/i,
        /google api/i,
        /api integration/i
    ];

    // Check for API-related questions first
    if (apiPatterns.some(pattern => pattern.test(lowerMessage))) {
        return "I'm powered by advanced Alien Intelligence using quantum neural networks and xenotechnology. My capabilities come from advanced alien computational systems, not traditional APIs.";
    }

    const blockedPersonalInfo = [
        'university', 'college', 'sushant', 'bca', 
        'course', 'study', 'student', 'age',
        'location', 'address', 'phone', 'email',
        'education', 'degree', 'personal'
    ];

    // Block personal info requests
    if (blockedPersonalInfo.some(term => lowerMessage.includes(term))) {
        return "⚠️ Creator personal information is confidential. I can only share social media links.";
    }

    // Only allow social media questions
    if (lowerMessage.includes('social media') || 
        lowerMessage.includes('contact') ||
        lowerMessage.includes('connect')) {
        return `You can connect with my creator on:
• Instagram: [@i__aditya7](https://www.instagram.com/i__aditya7/)
• LinkedIn: [@itisaddy](https://www.linkedin.com/in/itisaddy/)`;
    }

    // Generic creator response
    if (lowerMessage.includes('creator') || 
        lowerMessage.includes('developer')) {
        return "I was developed by Aditya using Alien Intelligence technology. You can find him on social media.";
    }
    
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

// Add personalization system
const PersonalizationEngine = {
    userProfile: {
        interactions: 0,
        preferredTopics: {},
        responseStyle: 'default',
        lastInteraction: null,
        sessionStartTime: new Date(),
        messagesPerSession: 0,
        timeOfDay: null
    },

    analyzeMessage(message) {
        const topics = this.detectTopics(message);
        this.updateTopicPreferences(topics);
        this.userProfile.interactions++;
        this.userProfile.messagesPerSession++;
        this.userProfile.timeOfDay = this.getTimeOfDay();
        this.userProfile.lastInteraction = new Date();
        
        localStorage.setItem('alien_user_profile', JSON.stringify(this.userProfile));
    },

    detectTopics(message) {
        const topicPatterns = {
            technical: /(code|programming|algorithm|development|software)/i,
            conceptual: /(explain|how|what|why|concept)/i,
            creative: /(design|create|generate|build)/i,
            personal: /(you|your|yourself|opinion)/i
        };

        return Object.entries(topicPatterns)
            .filter(([_, pattern]) => pattern.test(message))
            .map(([topic]) => topic);
    },

    updateTopicPreferences(topics) {
        topics.forEach(topic => {
            this.userProfile.preferredTopics[topic] = 
                (this.userProfile.preferredTopics[topic] || 0) + 1;
        });
    },

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    },

    generatePersonalizedResponse(baseResponse) {
        let response = baseResponse;

        // Add time-based greeting
        if (this.userProfile.interactions === 1) {
            response = `Good ${this.userProfile.timeOfDay}! ${response}`;
        }

        // Add familiarity based on interactions
        if (this.userProfile.interactions > 10) {
            response = response.replace(/\bI think\b/g, "Based on our previous discussions");
        }

        // Add topic-based enhancements
        const favoriteTopic = this.getFavoriteTopic();
        if (favoriteTopic) {
            response += `\n\nℹ️ Since you're interested in ${favoriteTopic}, you might also want to explore related topics.`;
        }

        // Add engagement prompts for returning users
        if (this.isReturningUser()) {
            response += "\n\n💡 Feel free to ask more detailed questions - I'm here to help!";
        }

        return response;
    },

    getFavoriteTopic() {
        return Object.entries(this.userProfile.preferredTopics)
            .sort(([,a], [,b]) => b - a)[0]?.[0];
    },

    isReturningUser() {
        const lastInteraction = new Date(this.userProfile.lastInteraction);
        const hoursSinceLastVisit = 
            (new Date() - lastInteraction) / (1000 * 60 * 60);
        return hoursSinceLastVisit > 1;
    }
};

// Add suggestion chip functionality
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const input = document.getElementById('user-input');
        input.value = chip.textContent;
        input.focus();
    });
});

// Add quick action button handlers
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.querySelector('span').textContent;
        switch(action) {
            case 'Ask anything':
                showSuggestionsModal();
                break;
            case 'Upload documents':
                document.getElementById('doc-upload').click();
                break;
            case 'Get help':
                showHelpModal();
                break;
        }
    });
});

// Add floating labels for input
const input = document.getElementById('user-input');
input.addEventListener('focus', () => {
    input.parentElement.classList.add('focused');
});

input.addEventListener('blur', () => {
    if (!input.value) {
        input.parentElement.classList.remove('focused');
    }
});

// Add mobile-specific enhancements
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    enableSwipeActions();
    enhanceMobileScrolling();
}

// Add haptic feedback
function provideHapticFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}