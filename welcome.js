// Welcome popup handler
const welcomeHandler = {
    // Get time-based greeting
    getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "Good Morning";
        if (hour >= 12 && hour < 17) return "Good Afternoon";
        if (hour >= 17 && hour < 22) return "Good Evening";
        return "Good Night";
    },

    // Check if user is returning
    isReturningUser() {
        return localStorage.getItem('aberty_user') !== null;
    },

    // Save user visit
    saveUserVisit() {
        localStorage.setItem('aberty_user', JSON.stringify({
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visits: this.isReturningUser() ? 
                JSON.parse(localStorage.getItem('aberty_user')).visits + 1 : 1
        }));
    },

    // Add method to get/set user name
    getUserName() {
        return localStorage.getItem('aberty_user_name') || '';
    },

    setUserName(name) {
        localStorage.setItem('aberty_user_name', name);
    },

    // Create and show welcome popup
    showWelcomePopup() {
        const isReturning = this.isReturningUser();
        const greeting = this.getGreeting();
        const userName = this.getUserName();
        
        // Create popup container with enhanced backdrop
        const popup = document.createElement('div');
        popup.className = `
            fixed inset-0 flex items-center justify-center z-50 
            bg-black/70 backdrop-blur-xl opacity-0 transition-all duration-500
            p-4 sm:p-0 animate-fadeIn
        `;

        // Create popup content with enhanced design
        popup.innerHTML = `
            <div class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl p-8 max-w-md w-full mx-auto
                        shadow-2xl transform scale-95 opacity-0 transition-all duration-500 
                        border border-white/10 backdrop-blur-xl relative overflow-hidden
                        hover:border-white/20 group">
                
                <!-- Enhanced decorative elements -->
                <div class="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 pointer-events-none 
                            group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="absolute -top-32 -right-32 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl
                            group-hover:scale-110 transition-transform duration-700"></div>
                <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl
                            group-hover:scale-110 transition-transform duration-700"></div>
                
                <!-- Animated particles background -->
                <div class="particle-container absolute inset-0 overflow-hidden pointer-events-none"></div>
                
                <!-- Floating elements -->
                <div class="absolute inset-0 overflow-hidden">
                    ${Array.from({length: 5}, (_, i) => `
                        <div class="floating-element absolute w-2 h-2 bg-white/10 rounded-full"
                             style="
                                top: ${Math.random() * 100}%;
                                left: ${Math.random() * 100}%;
                                animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
                                animation-delay: ${Math.random()}s;
                             "></div>
                    `).join('')}
                </div>
                
                <div class="relative space-y-6">
                    <!-- Enhanced header section -->
                    <div class="text-center space-y-4">
                        <div class="relative">
                            <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 
                                      mx-auto flex items-center justify-center transform hover:scale-105 transition-all duration-300
                                      shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer">
                                <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 
                                          group-hover:opacity-100 transition-all duration-300"></div>
                                <i class="fas fa-robot text-white text-4xl relative z-10 transform group-hover:rotate-12 
                                        transition-transform duration-300"></i>
                                <!-- Glowing ring effect -->
                                <div class="absolute inset-0 bg-white/20 rounded-2xl scale-90 opacity-0
                                          group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"></div>
                            </div>
                            <!-- Glow effect -->
                            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 
                                      rounded-full filter blur-2xl animate-pulse-slow -z-10"></div>
                        </div>
                        <div class="space-y-3">
                            <h2 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                                     from-white via-purple-200 to-gray-300 animate-gradient">
                                ${greeting}!
                            </h2>
                            <p class="text-gray-300 text-lg leading-relaxed">
                                ${isReturning ? 
                                    `Welcome back to <span class="font-semibold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse-slow">Aberty AI</span>! 
                                    Ready to continue our conversation?` : 
                                    `Welcome to <span class="font-semibold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse-slow">Aberty AI</span>! 
                                    I'm here to assist you with anything you need.`}
                            </p>
                        </div>
                    </div>

                    <!-- Name Input Section (show only for new users or if name not set) -->
                    ${!userName ? `
                        <div class="space-y-3">
                            <div class="relative group">
                                <input type="text" 
                                       id="user-name-input"
                                       placeholder="Enter your name"
                                       class="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 
                                              text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                                              focus:ring-violet-500 transition-all duration-300
                                              group-hover:bg-white/10"
                                       value="${userName}"
                                       maxlength="30">
                                <div class="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 
                                          rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 
                                          pointer-events-none"></div>
                            </div>
                            <p class="text-gray-400 text-sm text-center">
                                Let me know what to call you
                            </p>
                        </div>
                    ` : ''}

                    <!-- Enhanced buttons section -->
                    <div class="space-y-3 pt-4">
                        <button id="accept-welcome" 
                                class="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 
                                       text-white font-semibold transform hover:scale-[1.02] 
                                       transition-all duration-300 shadow-lg hover:shadow-xl
                                       relative overflow-hidden group ${!userName ? 'opacity-50 cursor-not-allowed' : ''}">
                            <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 
                                      group-hover:opacity-100 transition-all duration-300"></div>
                            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300"></div>
                            <span class="relative z-10 flex items-center justify-center space-x-2">
                                <span class="transform group-hover:translate-x-1 transition-transform duration-300">
                                    ${isReturning ? 'Continue Chat' : 'Get Started'}
                                </span>
                                <i class="fas fa-arrow-right transform group-hover:translate-x-2 
                                        transition-transform duration-300"></i>
                            </span>
                        </button>
                        <button id="close-welcome" 
                                class="w-full px-6 py-4 rounded-xl bg-white/5 text-gray-300 
                                       hover:bg-white/10 transition-all duration-300 border border-white/10
                                       hover:border-white/20 transform hover:scale-[1.01]
                                       relative overflow-hidden group">
                            <span class="relative z-10 flex items-center justify-center space-x-2">
                                <span class="transform group-hover:translate-x-1 transition-transform duration-300">
                                    Maybe Later
                                </span>
                                <i class="fas fa-times transform group-hover:rotate-90 
                                        transition-transform duration-300"></i>
                            </span>
                        </button>
                    </div>

                    <!-- Enhanced visit counter for returning users -->
                    ${isReturning ? `
                        <div class="text-center space-y-2 pt-4 border-t border-white/10">
                            <div class="inline-flex items-center px-3 py-1 rounded-full bg-white/5 space-x-2">
                                <i class="fas fa-history text-violet-400"></i>
                                <span class="text-sm text-gray-400">Visit count: 
                                    <span class="text-violet-400 font-semibold">
                                        ${JSON.parse(localStorage.getItem('aberty_user')).visits}
                                    </span>
                                </span>
                            </div>
                            <p class="text-xs text-gray-500">
                                Last visit: <span class="text-gray-400">
                                    ${new Date(JSON.parse(localStorage.getItem('aberty_user')).lastVisit)
                                        .toLocaleDateString(undefined, { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                </span>
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Add enhanced animations
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }

                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 8s ease infinite;
                }

                .animate-pulse-slow {
                    animation: pulse 3s ease-in-out infinite;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }

                .floating-element {
                    transform-origin: center;
                    opacity: 0.5;
                }
            </style>
        `);

        // Add particle animation
        function createParticles() {
            const container = popup.querySelector('.particle-container');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = Math.random() * 4 + 'px';
                particle.style.height = particle.style.width;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(particle);
            }
        }

        // Rest of the existing code...
        document.body.appendChild(popup);
        createParticles();

        // Enhanced animations
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            const content = popup.querySelector('div');
            content.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
        });

        // Enhanced button interactions
        const acceptBtn = popup.querySelector('#accept-welcome');
        const closeBtn = popup.querySelector('#close-welcome');

        // Handle name input
        const nameInput = popup.querySelector('#user-name-input');
        
        if (nameInput) {
            nameInput.addEventListener('input', (e) => {
                const name = e.target.value.trim();
                if (name.length > 0) {
                    acceptBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    acceptBtn.classList.add('animate-pulse-slow');
                } else {
                    acceptBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    acceptBtn.classList.remove('animate-pulse-slow');
                }
            });

            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && nameInput.value.trim()) {
                    acceptBtn.click();
                }
            });
        }

        // Update accept button handler
        const closePopup = (accepted = false) => {
            if (accepted && nameInput) {
                const name = nameInput.value.trim();
                if (!name) return;
                this.setUserName(name);
                
                // Update chat context with user's name
                const welcomeMsg = document.querySelector('.message-text');
                if (welcomeMsg) {
                    welcomeMsg.innerHTML = `Hello ${name}! I'm Aberty AI. How can I assist you today? 🚀`;
                }
            }

            popup.style.opacity = '0';
            const content = popup.querySelector('div');
            content.style.opacity = '0';
            content.style.transform = accepted ? 'scale(1.05)' : 'scale(0.95)';
            
            setTimeout(() => {
                popup.remove();
                if (accepted) {
                    showWelcomeToast(isReturning, this.getUserName());
                }
            }, 300);
            
            this.saveUserVisit();
        };

        acceptBtn.addEventListener('click', () => {
            if (!userName && (!nameInput || !nameInput.value.trim())) return;
            acceptBtn.classList.add('scale-95', 'opacity-80');
            setTimeout(() => closePopup(true), 150);
        });

        closeBtn.addEventListener('click', () => closePopup(false));

        // Enhanced backdrop click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.opacity = '0.5';
                setTimeout(() => popup.style.opacity = '1', 100);
            }
        });

        // Add escape key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closePopup(false);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
};

// Add welcome toast function
function showWelcomeToast(isReturning, userName) {
    const toast = document.createElement('div');
    toast.className = `
        fixed bottom-4 right-4 bg-gradient-to-r from-violet-500 to-fuchsia-500
        text-white px-6 py-3 rounded-xl shadow-lg transform translate-y-20 opacity-0
        transition-all duration-500 flex items-center space-x-3
    `;
    
    toast.innerHTML = `
        <i class="fas fa-robot text-xl"></i>
        <span>${isReturning ? 
            `Welcome back, ${userName}! Ready to help you again!` : 
            `Nice to meet you, ${userName}! Let's get started!`}</span>
    `;
    
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });
    
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Show welcome popup when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay for better UX
    setTimeout(() => {
        welcomeHandler.showWelcomePopup();
    }, 1000);
}); 