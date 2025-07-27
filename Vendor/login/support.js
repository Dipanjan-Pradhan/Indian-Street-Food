class SupportPage {
    constructor() {
        this.copyButtons = document.querySelectorAll('.copy-btn');
        this.toast = document.getElementById('toast');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
    }
    
    setupEventListeners() {
        // Copy button functionality
        this.copyButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleCopy(e));
        });
        
        // Contact card hover effects
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateCard(card, true));
            card.addEventListener('mouseleave', () => this.animateCard(card, false));
        });
        
        // FAQ card interactions
        const faqCards = document.querySelectorAll('.faq-card');
        faqCards.forEach(card => {
            card.addEventListener('mouseenter', () => this.animateFaqCard(card, true));
            card.addEventListener('mouseleave', () => this.animateFaqCard(card, false));
        });
    }
    
    setupAnimations() {
        // Intersection Observer for scroll animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe elements for animation
            const animateElements = document.querySelectorAll(
                '.contact-card, .faq-card, .hours-card, .support-header'
            );
            animateElements.forEach(el => observer.observe(el));
        }
        
        // Add staggered animation delays
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });
        
        const faqCards = document.querySelectorAll('.faq-card');
        faqCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    async handleCopy(e) {
        const button = e.currentTarget;
        const textToCopy = button.getAttribute('data-copy');
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback for older browsers
                this.fallbackCopyText(textToCopy);
            }
            
            this.showCopySuccess(button);
            this.showToast('Copied to clipboard!');
            
        } catch (error) {
            console.error('Failed to copy text:', error);
            this.showToast('Failed to copy. Please try again.', 'error');
        }
    }
    
    fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
        } finally {
            textArea.remove();
        }
    }
    
    showCopySuccess(button) {
        const originalContent = button.innerHTML;
        const originalClass = button.className;
        
        // Change button appearance temporarily
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/>
            </svg>
            Copied!
        `;
        button.className = button.className.replace('secondary', 'primary');
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.className = originalClass;
        }, 2000);
    }
    
    showToast(message, type = 'success') {
        const toastMessage = this.toast.querySelector('.toast-message');
        const toastIcon = this.toast.querySelector('.toast-icon');
        
        toastMessage.textContent = message;
        
        // Update icon based on type
        if (type === 'error') {
            toastIcon.innerHTML = `
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
            `;
            this.toast.style.background = 'var(--error-500)';
        } else {
            toastIcon.innerHTML = `
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/>
            `;
            this.toast.style.background = 'var(--success-500)';
        }
        
        // Show toast
        this.toast.classList.remove('hidden');
        
        // Hide after 3 seconds
        setTimeout(() => {
            this.toast.classList.add('hidden');
        }, 3000);
    }
    
    animateCard(card, isHover) {
        const icon = card.querySelector('.contact-icon');
        
        if (isHover) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-xl)';
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-lg)';
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        }
    }

    animateFaqCard(card, isHover) {
        if (isHover) {
            card.style.transform = 'translateY(-3px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        }
    }
}