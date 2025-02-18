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

    // Create and show welcome popup
    showWelcomePopup() {
        const isReturning = this.isReturningUser();
        const greeting = this.getGreeting();
        
        // Create popup container with enhanced backdrop and animations
        const popup = document.createElement('div');
        popup.className = `
            fixed inset-0 flex items-center justify-center z-50 
            bg-black/70 backdrop-blur-lg opacity-0 transition-all duration-500
            p-4 sm:p-0 animate-fadeIn
        `;

        // Create popup content with enhanced design and animations
        popup.innerHTML = `
            <div class="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-3xl p-8 max-w-md w-full mx-auto
                        shadow-2xl transform scale-95 opacity-0 transition-all duration-500 
                        border border-white/10 backdrop-blur-xl relative overflow-hidden
                        hover:border-white/20 group">
                
                <!-- Enhanced decorative elements -->
                <div class="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 pointer-events-none 
                            group-hover:opacity-75 transition-opacity duration-500"></div>
                <div class="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl
                            group-hover:scale-110 transition-transform duration-700"></div>
                <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl
                            group-hover:scale-110 transition-transform duration-700"></div>
                
                <!-- Animated particles background -->
                <div class="particle-container absolute inset-0 overflow-hidden pointer-events-none"></div>
                
                <div class="relative space-y-6">
                    <!-- Enhanced header section with animations -->
                    <div class="text-center space-y-4">
                        <div class="relative">
                            <div class="w-24 h-24 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 
                                      mx-auto flex items-center justify-center transform hover:scale-105 transition-all duration-300
                                      shadow-lg hover:shadow-xl relative overflow-hidden group">
                                <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-0 
                                          group-hover:opacity-100 transition-all duration-300"></div>
                                <i class="fas fa-robot text-white text-4xl relative z-10 transform group-hover:rotate-12 
                                        transition-transform duration-300"></i>
                                <!-- Glowing effect -->
                                <div class="absolute inset-0 bg-gradient-to-r from-violet-500/50 to-fuchsia-500/50 
                                          animate-pulse-slow"></div>
                            </div>
                            <!-- Circular glow effect -->
                            <div class="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 
                                      rounded-full filter blur-xl animate-pulse-slow -z-10"></div>
                        </div>
                        <div class="space-y-3 transform hover:scale-[1.01] transition-transform duration-300">
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

                    <!-- Enhanced buttons section with improved animations -->
                    <div class="space-y-3 pt-4">
                        <button id="accept-welcome" 
                                class="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 
                                       text-white font-semibold transform hover:scale-[1.02] 
                                       transition-all duration-300 shadow-lg hover:shadow-xl
                                       relative overflow-hidden group">
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
                        <div class="text-center space-y-1 pt-4 border-t border-white/10">
                            <div class="flex items-center justify-center space-x-2 text-sm text-gray-400">
                                <i class="fas fa-history text-violet-400"></i>
                                <p>Visit count: <span class="text-violet-400 font-semibold">
                                    ${JSON.parse(localStorage.getItem('aberty_user')).visits}</span></p>
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

        // Add these styles to your existing styles
        document.head.insertAdjacentHTML('beforeend', `
            <style>
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

                .particle {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    pointer-events: none;
                    opacity: 0;
                    animation: particle 1s ease-in-out infinite;
                }

                @keyframes particle {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(-20px) scale(1); opacity: 0; }
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

        // Enhanced animations...
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            const content = popup.querySelector('div');
            content.style.opacity = '1';
            content.style.transform = 'scale(1) translateY(0)';
        });

        // Enhanced button interactions
        const acceptBtn = popup.querySelector('#accept-welcome');
        const closeBtn = popup.querySelector('#close-welcome');

        const closePopup = (accepted = false) => {
            popup.style.opacity = '0';
            const content = popup.querySelector('div');
            content.style.opacity = '0';
            content.style.transform = accepted ? 'scale(1.05)' : 'scale(0.95)';
            
            setTimeout(() => {
                popup.remove();
                // Add a welcome toast if accepted
                if (accepted) {
                    showWelcomeToast(isReturning);
                }
            }, 300);
            
            this.saveUserVisit();
        };

        acceptBtn.addEventListener('click', () => {
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
function showWelcomeToast(isReturning) {
    const toast = document.createElement('div');
    toast.className = `
        fixed bottom-4 right-4 bg-gradient-to-r from-violet-500 to-fuchsia-500
        text-white px-6 py-3 rounded-xl shadow-lg transform translate-y-20 opacity-0
        transition-all duration-500 flex items-center space-x-3
    `;
    
    toast.innerHTML = `
        <i class="fas fa-robot text-xl"></i>
        <span>${isReturning ? 'Welcome back! Ready to help you again!' : 'Thanks for joining! Let\'s get started!'}</span>
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