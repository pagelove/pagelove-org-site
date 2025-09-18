// ABOUTME: Main JavaScript file for interactive features and animations
// ABOUTME: Handles neural node animations, smooth scrolling, tooltips, and form submissions

class PageLoveApp {
    constructor() {
        this.currentNode = 0;
        this.nodes = ["stores", "syncs", "thinks"];
        this.init();
    }

    init() {
        this.setupNeuralAnimation();
        this.setupTooltips();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupFeatureCardAnimations();
    }

    // Neural node pulsing animation
    setupNeuralAnimation() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        const featureCards = document.querySelectorAll('.feature-card');
        const indicators = document.querySelectorAll('.neural-indicator');

        if (neuralNodes.length === 0) return;

        const animateNodes = () => {
            // Reset all nodes
            neuralNodes.forEach((node, index) => {
                const concept = node.dataset.concept;
                const color = node.dataset.color;

                if (index === this.currentNode) {
                    // Active state
                    node.className = `neural-node flex items-center gap-2 px-6 py-3 rounded-full border-2 cursor-help transition-all duration-500 border-${color}-400 bg-${color}-500/20 shadow-lg scale-110`;
                    node.style.boxShadow = `0 0 30px hsl(var(--${color === 'blue' ? 'primary' : color === 'emerald' ? 'accent' : 'destructive'})/50)`;
                } else {
                    // Inactive state
                    node.className = `neural-node flex items-center gap-2 px-6 py-3 rounded-full border-2 cursor-help transition-all duration-500 border-${color}-500/50 bg-${color}-500/10 hover:border-${color}-400 hover:bg-${color}-500/20`;
                    node.style.boxShadow = '';
                }
            });

            // Animate feature cards
            featureCards.forEach((card, index) => {
                const indicator = card.querySelector('.neural-indicator');
                if (index === this.currentNode) {
                    card.classList.add('ring-2', 'ring-white/30', 'shadow-2xl');
                    card.querySelector('.absolute.inset-0').classList.add('animate-pulse');
                    if (indicator) {
                        indicator.style.opacity = '1';
                    }
                } else {
                    card.classList.remove('ring-2', 'ring-white/30', 'shadow-2xl');
                    card.querySelector('.absolute.inset-0').classList.remove('animate-pulse');
                    if (indicator) {
                        indicator.style.opacity = '0.5';
                    }
                }
            });

            // Next node
            this.currentNode = (this.currentNode + 1) % 3;
        };

        // Start animation
        animateNodes();
        setInterval(animateNodes, 2000);
    }

    // Neural node interaction - highlight corresponding feature cards
    setupTooltips() {
        const neuralNodes = document.querySelectorAll('.neural-node');
        const featureCards = document.querySelectorAll('.feature-card');

        neuralNodes.forEach(node => {
            const nodeIndex = parseInt(node.dataset.index);

            node.addEventListener('mouseenter', () => {
                // Highlight corresponding feature card
                featureCards.forEach((card, cardIndex) => {
                    if (cardIndex === nodeIndex) {
                        card.classList.add('ring-4', 'ring-white/50', 'scale-105', 'shadow-2xl');
                        card.style.transition = 'all 0.3s ease';
                    } else {
                        card.classList.add('opacity-60');
                    }
                });
            });

            node.addEventListener('mouseleave', () => {
                // Remove highlight from all feature cards
                featureCards.forEach(card => {
                    card.classList.remove('ring-4', 'ring-white/50', 'scale-105', 'shadow-2xl', 'opacity-60');
                });
            });

            // Also add click functionality for mobile
            node.addEventListener('click', () => {
                const targetCard = featureCards[nodeIndex];
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        // Make functions globally available for onclick handlers
        window.scrollToSignup = () => {
            const signupForm = document.querySelector('#signup-form');
            if (signupForm) {
                signupForm.scrollIntoView({ behavior: 'smooth' });
            }
        };

        window.scrollToHowItWorks = () => {
            const howItWorksSection = document.querySelector('#how-it-works');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }

    // Form handling
    setupFormHandling() {
        const signupForm = document.querySelector('#signup-form');
        if (!signupForm) return;

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = signupForm.querySelector('input[name="email"]');
            const email = emailInput.value;

            // Simple email validation
            if (!this.isValidEmail(email)) {
                this.showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // Show success message
            this.showMessage('Thank you! We\'ll notify you when PageLove is ready.', 'success');

            // Reset form
            emailInput.value = '';

            // Log for now (would integrate with actual backend)
            console.log('Email signup:', email);
        });
    }

    // Feature card hover animations
    setupFeatureCardAnimations() {
        const featureCards = document.querySelectorAll('.feature-card');

        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }

    // Utility functions
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(message, type) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PageLoveApp();
});

// Add some additional interactive enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to background elements
    const backgroundElements = document.querySelectorAll('.html-tag');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        backgroundElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Add loading animation
    document.body.classList.add('animate-fade-in');
});