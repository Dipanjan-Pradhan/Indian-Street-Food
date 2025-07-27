// DOM Elements
let registrationForm, submitBtn, successModal, closeModalBtn;
let fullNameInput, mobileInput, emailInput, userTypeInputs, termsCheckbox;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initializeAnimations();
});

// Initialize DOM elements
function initializeElements() {
    registrationForm = document.getElementById('registrationForm');
    submitBtn = document.getElementById('submitBtn');
    successModal = document.getElementById('successModal');
    closeModalBtn = document.getElementById('closeModal');
    
    fullNameInput = document.getElementById('fullName');
    mobileInput = document.getElementById('mobile');
    emailInput = document.getElementById('email');
    userTypeInputs = document.querySelectorAll('input[name="userType"]');
    termsCheckbox = document.getElementById('terms');
}

// Setup event listeners
function setupEventListeners() {
    // Form submission
    registrationForm.addEventListener('submit', handleFormSubmit);
    
    // Input validation
    fullNameInput.addEventListener('input', validateName);
    mobileInput.addEventListener('input', validateMobile);
    emailInput.addEventListener('input', validateEmail);
    
    // Real-time form validation
    [fullNameInput, mobileInput, emailInput, termsCheckbox].forEach(input => {
        input.addEventListener('input', updateSubmitButton);
        input.addEventListener('change', updateSubmitButton);
    });
    
    userTypeInputs.forEach(input => {
        input.addEventListener('change', updateSubmitButton);
    });
    
    // Modal controls
    closeModalBtn.addEventListener('click', closeModal);
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Watch demo button
    const watchDemoBtn = document.getElementById('watchDemo');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function() {
            alert('Demo video coming soon! 🎬');
        });
    }
    
    // Navbar scroll effect
    // window.addEventListener('scroll', handleNavbarScroll);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Get form data
    const formData = new FormData(registrationForm);
    const userData = {
        fullName: formData.get('fullName'),
        mobile: formData.get('mobile'),
        email: formData.get('email'),
        userType: formData.get('userType'),
        timestamp: new Date().toISOString()
    };
    
    // Make real API call
    fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(async response => {
        if (response.ok) {
            // Get the response data with the user ID
            const data = await response.json();
            
            // Store user ID in localStorage so it's available across all pages
            localStorage.setItem('currentUserId', data._id);
            
            // Redirect to login page based on user type
            if (userData.userType === 'supplier') {
                window.location.href = '/Supplier/welcome';
            } else if (userData.userType === 'vendor') {
                window.location.href = '/Vendor/LandPage/vendor';
            } else {
                window.location.href = '/';
            }
        } else {
            let msg = 'Registration failed. Please try again.';
            if (response.status === 409) {
                const data = await response.json();
                msg = data.error || 'User already registered with this name, phone, and email.';
            }
            alert(msg);
        }
        hideLoadingState();
    })
    .catch(error => {
        alert('An error occurred. Please try again.');
        hideLoadingState();
    });
}

// Validate entire form
function validateForm() {
    let isValid = true;
    const errors = [];
    
    // Name validation
    if (!fullNameInput.value.trim() || fullNameInput.value.trim().length < 2) {
        errors.push('Please enter a valid full name (at least 2 characters)');
        addErrorClass(fullNameInput);
        isValid = false;
    } else {
        removeErrorClass(fullNameInput);
    }
    
    // Mobile validation
    if (!validateMobileNumber(mobileInput.value)) {
        errors.push('Please enter a valid 10-digit mobile number');
        addErrorClass(mobileInput);
        isValid = false;
    } else {
        removeErrorClass(mobileInput);
    }
    
    // Email validation
    if (!validateEmailAddress(emailInput.value)) {
        errors.push('Please enter a valid email address');
        addErrorClass(emailInput);
        isValid = false;
    } else {
        removeErrorClass(emailInput);
    }
    
    // User type validation
    const selectedUserType = Array.from(userTypeInputs).find(input => input.checked);
    if (!selectedUserType) {
        errors.push('Please select whether you are a vendor or supplier');
        isValid = false;
    }
    
    // Terms validation
    if (!termsCheckbox.checked) {
        errors.push('Please accept the terms and conditions');
        addErrorClass(termsCheckbox.parentElement);
        isValid = false;
    } else {
        removeErrorClass(termsCheckbox.parentElement);
    }
    
    // Show errors if any
    if (errors.length > 0) {
        showErrors(errors);
    }
    
    return isValid;
}

// Individual field validations
function validateName(e) {
    const name = e.target.value.trim();
    const isValid = name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    
    if (name.length > 0 && !isValid) {
        addErrorClass(e.target);
        showFieldError(e.target, 'Please enter a valid name (letters only, at least 2 characters)');
    } else {
        removeErrorClass(e.target);
        hideFieldError(e.target);
    }
}

function validateMobile(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
    }
    e.target.value = value;
    
    const isValid = value.length === 10;
    
    if (value.length > 0 && !isValid) {
        addErrorClass(e.target);
        showFieldError(e.target, 'Mobile number must be exactly 10 digits');
    } else {
        removeErrorClass(e.target);
        hideFieldError(e.target);
    }
}

function validateEmail(e) {
    const email = e.target.value.trim();
    const isValid = validateEmailAddress(email);
    
    if (email.length > 0 && !isValid) {
        addErrorClass(e.target);
        showFieldError(e.target, 'Please enter a valid email address');
    } else {
        removeErrorClass(e.target);
        hideFieldError(e.target);
    }
}

// Helper validation functions
function validateMobileNumber(mobile) {
    return /^[0-9]{10}$/.test(mobile);
}

function validateEmailAddress(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error handling functions
function addErrorClass(element) {
    element.classList.add('error');
    element.style.borderColor = '#ef4444';
}

function removeErrorClass(element) {
    element.classList.remove('error');
    element.style.borderColor = '';
}

function showFieldError(element, message) {
    let errorElement = element.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
        element.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function hideFieldError(element) {
    const errorElement = element.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showErrors(errors) {
    const errorMessage = errors.join('\n');
    alert('Please fix the following errors:\n\n' + errorMessage);
}

// Update submit button state
function updateSubmitButton() {
    const fullName = fullNameInput.value.trim();
    const mobile = mobileInput.value.trim();
    const email = emailInput.value.trim();
    const userType = Array.from(userTypeInputs).some(input => input.checked);
    const terms = termsCheckbox.checked;
    
    const isFormValid = fullName.length >= 2 && 
                       validateMobileNumber(mobile) && 
                       validateEmailAddress(email) && 
                       userType && 
                       terms;
    
    submitBtn.disabled = !isFormValid;
    submitBtn.style.opacity = isFormValid ? '1' : '0.6';
}

// Loading states
function showLoadingState() {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Creating Account...</span>';
    submitBtn.classList.add('loading');
}

function hideLoadingState() {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-rocket"></i><span>Create Account</span>';
    submitBtn.classList.remove('loading');
}

// Remove all showSuccessModal, closeModal, and modal logic

// Reset form
function resetForm() {
    registrationForm.reset();
    
    // Remove any error states
    document.querySelectorAll('.error').forEach(element => {
        removeErrorClass(element);
    });
    
    // Remove error messages
    document.querySelectorAll('.field-error').forEach(element => {
        element.remove();
    });
    
    // Update submit button
    updateSubmitButton();
}

// Navbar scroll effect
// function handleNavbarScroll() {
//     const navbar = document.querySelector('.navbar');
//     if (window.scrollY > 50) {
//         navbar.style.background = 'rgba(255, 255, 255, 0.98)';
//         navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
//     } else {
//         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
//         navbar.style.boxShadow = '';
//     }
// }

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Escape key to close modal
    if (e.key === 'Escape' && successModal.style.display === 'block') {
        closeModal();
    }
    
    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && document.activeElement === submitBtn) {
        e.preventDefault();
        registrationForm.dispatchEvent(new Event('submit'));
    }
}

// Animation functions
function initializeAnimations() {
    // Animate statistics when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });
}

// Animate statistics numbers
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.dataset.target);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format numbers
            if (target >= 1000000) {
                statNumber.textContent = (current / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                statNumber.textContent = (current / 1000).toFixed(0) + 'K';
            } else {
                statNumber.textContent = Math.floor(current) + (target === 98 ? '%' : '');
            }
        }, 16);
    });
}

// Analytics tracking (placeholder)
function trackRegistration(userType) {
    console.log(`Registration completed: ${userType}`);
    
    // In a real app, you would send this data to your analytics service
    // Example: gtag('event', 'registration', { user_type: userType });
}

// Performance optimization: Debounce input validation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced validation
const debouncedValidateName = debounce(validateName, 300);
const debouncedValidateEmail = debounce(validateEmail, 300);

// Replace direct event listeners with debounced versions for better performance
fullNameInput.removeEventListener('input', validateName);
emailInput.removeEventListener('input', validateEmail);
fullNameInput.addEventListener('input', debouncedValidateName);
emailInput.addEventListener('input', debouncedValidateEmail);

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to form elements
    fullNameInput.setAttribute('aria-label', 'Enter your full name');
    mobileInput.setAttribute('aria-label', 'Enter your 10-digit mobile number');
    emailInput.setAttribute('aria-label', 'Enter your email address');
    
    // Add keyboard navigation for radio buttons
    userTypeInputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % userTypeInputs.length;
                userTypeInputs[nextIndex].focus();
                userTypeInputs[nextIndex].checked = true;
                updateSubmitButton();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + userTypeInputs.length) % userTypeInputs.length;
                userTypeInputs[prevIndex].focus();
                userTypeInputs[prevIndex].checked = true;
                updateSubmitButton();
            }
        });
    });
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Handle network status
window.addEventListener('online', function() {
    if (submitBtn.disabled && !registrationForm.checkValidity()) {
        hideLoadingState();
        alert('Connection restored! You can now submit your registration.');
    }
});

window.addEventListener('offline', function() {
    if (submitBtn.classList.contains('loading')) {
        hideLoadingState();
        alert('No internet connection. Please check your connection and try again.');
    }
});

// Auto-save form data to prevent data loss
function autoSaveFormData() {
    const formData = {
        fullName: fullNameInput.value,
        mobile: mobileInput.value,
        email: emailInput.value,
        userType: Array.from(userTypeInputs).find(input => input.checked)?.value || '',
        timestamp: Date.now()
    };
    
    // Note: localStorage is not available in Claude artifacts
    // In a real application, you would use:
    // localStorage.setItem('registrationFormData', JSON.stringify(formData));
    console.log('Form data auto-saved:', formData);
}

// Auto-save every 10 seconds
setInterval(autoSaveFormData, 10000);

// Restore form data on page load (placeholder)
function restoreFormData() {
    // In a real application, you would use:
    // const savedData = localStorage.getItem('registrationFormData');
    // if (savedData) { ... restore form fields ... }
    console.log('Form data restoration would happen here');
}

// Initialize form data restoration
document.addEventListener('DOMContentLoaded', restoreFormData);