class VendorRegistration {
    init() {
    this.setupEventListeners();
    this.setupValidation();
    this.formFields.firstName.focus();

    // Ensure modal is hidden on page load
    this.successModal.classList.add('hidden');
    document.body.style.overflow = '';
    }

    constructor() {
        this.form = document.getElementById('registrationForm');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.registerBtn = document.getElementById('registerBtn');
        this.successModal = document.getElementById('successModal');
        
        this.formFields = {
            firstName: document.getElementById('firstName'),
            lastName: document.getElementById('lastName'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            businessName: document.getElementById('businessName'),
            businessType: document.getElementById('businessType'),
            taxId: document.getElementById('taxId'),
            businessAddress: document.getElementById('businessAddress'),
            userId: document.getElementById('userId'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('confirmPassword'),
            agreeTerms: document.getElementById('agreeTerms')
        };
        
        this.init();
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Password toggle
        if (this.passwordToggle) {
            this.passwordToggle.addEventListener('click', () => this.togglePassword());
        }
        
        // Real-time validation for all fields
        Object.values(this.formFields).forEach(field => {
            if (field && field.type !== 'checkbox') {
                field.addEventListener('input', () => this.validateField(field));
                field.addEventListener('blur', () => this.validateField(field));
            }
        });
        
        // Special validation for confirm password
        if (this.formFields.confirmPassword) {
            this.formFields.confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
            this.formFields.confirmPassword.addEventListener('blur', () => this.validatePasswordMatch());
        }
        
        // Password field changes should also trigger confirm password validation
        if (this.formFields.password) {
            this.formFields.password.addEventListener('input', () => {
                if (this.formFields.confirmPassword.value) {
                    this.validatePasswordMatch();
                }
            });
        }
        
        // Modal close
        this.successModal.addEventListener('click', (e) => {
            if (e.target === this.successModal) {
                this.closeModal();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }
    
    setupValidation() {
        // Add focus/blur effects
        Object.values(this.formFields).forEach(field => {
            if (field && field.type !== 'checkbox') {
                field.addEventListener('focus', () => {
                    field.parentElement.classList.add('focused');
                    this.clearFieldError(field);
                });
                
                field.addEventListener('blur', () => {
                    field.parentElement.classList.remove('focused');
                });
            }
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        this.clearAllErrors();
        
        // Get form data
        const formData = this.getFormData();
        
        // Validate all fields
        if (!this.validateAllFields(formData)) {
            this.shakeForm();
            this.scrollToFirstError();
            return;
        }
        
        // Start loading state
        this.setLoadingState(true);
        
        try {
            const response = await this.registerVendor(formData);
            if (response.success) {
                this.handleRegistrationSuccess(response);
            } else {
                this.handleRegistrationError(response.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            this.handleRegistrationError(error.message || 'Registration failed.');
        }
    }
    
    getFormData() {
        const data = {};
        Object.keys(this.formFields).forEach(key => {
            const field = this.formFields[key];
            if (field) {
                if (field.type === 'checkbox') {
                    data[key] = field.checked;
                } else {
                    data[key] = field.value.trim();
                }
            }
        });
        return data;
    }
    
    validateAllFields(data) {
        let isValid = true;
        
        // Required field validation
        const requiredFields = [
            { key: 'firstName', message: 'First name is required' },
            { key: 'lastName', message: 'Last name is required' },
            { key: 'email', message: 'Email address is required' },
            { key: 'phone', message: 'Phone number is required' },
            { key: 'businessName', message: 'Business name is required' },
            { key: 'businessType', message: 'Please select a business type' },
            { key: 'businessAddress', message: 'Business address is required' },
            { key: 'userId', message: 'User ID is required' },
            { key: 'password', message: 'Password is required' },
            { key: 'confirmPassword', message: 'Please confirm your password' }
        ];
        
        requiredFields.forEach(({ key, message }) => {
            if (!data[key]) {
                this.showFieldError(this.formFields[key], message);
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showFieldError(this.formFields.email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        if (data.phone && !this.isValidPhone(data.phone)) {
            this.showFieldError(this.formFields.phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // User ID validation
        if (data.userId && data.userId.length < 4) {
            this.showFieldError(this.formFields.userId, 'User ID must be at least 4 characters');
            isValid = false;
        }
        
        // Password validation
        if (data.password && !this.isValidPassword(data.password)) {
            this.showFieldError(this.formFields.password, 'Password must be at least 8 characters with uppercase, lowercase, and number');
            isValid = false;
        }
        
        // Password match validation
        if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
            this.showFieldError(this.formFields.confirmPassword, 'Passwords do not match');
            isValid = false;
        }
        
        // Terms agreement validation
        if (!data.agreeTerms) {
            this.showFormError('You must agree to the Terms of Service and Privacy Policy to continue');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Clear previous state
        field.classList.remove('error', 'success');
        this.clearFieldError(field);
        
        if (value.length === 0) {
            return; // Empty field - neutral state
        }
        
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                isValid = value.length >= 2;
                errorMessage = 'Must be at least 2 characters';
                break;
                
            case 'email':
                isValid = this.isValidEmail(value);
                errorMessage = 'Please enter a valid email address';
                break;
                
            case 'phone':
                isValid = this.isValidPhone(value);
                errorMessage = 'Please enter a valid phone number';
                break;
                
            case 'businessName':
                isValid = value.length >= 2;
                errorMessage = 'Business name must be at least 2 characters';
                break;
                
            case 'userId':
                isValid = value.length >= 4;
                errorMessage = 'User ID must be at least 4 characters';
                break;
                
            case 'password':
                isValid = this.isValidPassword(value);
                errorMessage = 'Password must be at least 8 characters with uppercase, lowercase, and number';
                break;
                
            case 'businessAddress':
                isValid = value.length >= 10;
                errorMessage = 'Please enter a complete address';
                break;
        }
        
        if (isValid) {
            field.classList.add('success');
        } else {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }
    }
    
    validatePasswordMatch() {
        const password = this.formFields.password.value;
        const confirmPassword = this.formFields.confirmPassword.value;
        
        this.formFields.confirmPassword.classList.remove('error', 'success');
        this.clearFieldError(this.formFields.confirmPassword);
        
        if (confirmPassword.length === 0) {
            return;
        }
        
        if (password === confirmPassword) {
            this.formFields.confirmPassword.classList.add('success');
        } else {
            this.formFields.confirmPassword.classList.add('error');
            this.showFieldError(this.formFields.confirmPassword, 'Passwords do not match');
        }
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    isValidPassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasMinLength = password.length >= 8;
        
        return hasUpperCase && hasLowerCase && hasNumbers && hasMinLength;
    }
    
    async registerVendor(formData) {
    // Simulate API call only AFTER valid form submission
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const mockResponse = {
            success: true,
            message: 'Registration successful',
            vendorId: 'VEN' + Date.now(),
            redirectUrl: 'login.html'
        };

        // Only trigger success from handleSubmit()
        resolve(mockResponse);
        }, 2000);
    });    
    }

    
    handleRegistrationSuccess(data) {
        // Show success modal
        this.showSuccessModal();
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = data.redirectUrl || 'index.html';
        }, 3000);
    }
    
    handleRegistrationError(message) {
        this.showFormError(message);
        this.shakeForm();
        this.scrollToFirstError();
    }
    
    setLoadingState(loading) {
        const btnContent = this.registerBtn.querySelector('.btn-content');
        const btnLoader = this.registerBtn.querySelector('.btn-loader');
        
        if (loading) {
            this.registerBtn.disabled = true;
            btnContent.style.opacity = '0';
            btnLoader.classList.remove('hidden');
        } else {
            this.registerBtn.disabled = false;
            btnContent.style.opacity = '1';
            btnLoader.classList.add('hidden');
        }
    }
    
    togglePassword() {
        const eyeOpen = this.passwordToggle.querySelector('.eye-open');
        const eyeClosed = this.passwordToggle.querySelector('.eye-closed');
        const passwordField = this.formFields.password;
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeOpen.classList.add('hidden');
            eyeClosed.classList.remove('hidden');
        } else {
            passwordField.type = 'password';
            eyeOpen.classList.remove('hidden');
            eyeClosed.classList.add('hidden');
        }
        
        passwordField.focus();
    }
    
    showFormError(message) {
        this.clearAllErrors();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>${message}</span>
        `;
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 8000);
    }
    
    showFieldError(input, message) {
        const inputGroup = input.closest('.input-group');
        let errorElement = inputGroup.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            inputGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
        input.classList.remove('success');
    }
    
    clearFieldError(input) {
        const inputGroup = input.closest('.input-group');
        const errorElement = inputGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    clearAllErrors() {
        // Remove form errors
        const formErrors = this.form.querySelectorAll('.form-error');
        formErrors.forEach(error => error.remove());
        
        // Remove field errors
        const fieldErrors = this.form.querySelectorAll('.field-error');
        fieldErrors.forEach(error => error.remove());
        
        // Remove error styling
        Object.values(this.formFields).forEach(field => {
            if (field && field.classList) {
                field.classList.remove('error');
            }
        });
    }
    
    shakeForm() {
        this.form.classList.add('shake');
        setTimeout(() => {
            this.form.classList.remove('shake');
        }, 500);
    }
    
    scrollToFirstError() {
        const firstError = this.form.querySelector('.form-input.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    showSuccessModal() {
        this.clearAllErrors();
        this.successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
closeModal() {
    this.successModal.classList.add('hidden');
    document.body.style.overflow = '';

    // 👇 Optional: Reset form when modal closes
    this.form.reset();
    Object.values(this.formFields).forEach(field => {
        if (field && field.classList) {
            field.classList.remove('error', 'success');
        }
    });
}

    
    handleKeyboardShortcuts(e) {
        if (e.key === 'Escape' && !this.successModal.classList.contains('hidden')) {
            this.closeModal();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VendorRegistration();
});