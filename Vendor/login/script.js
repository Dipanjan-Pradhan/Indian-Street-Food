class VendorLogin {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.userIdInput = document.getElementById('userId');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loginBtn = document.getElementById('loginBtn');
        this.successModal = document.getElementById('successModal');
        this.rememberMeCheckbox = document.getElementById('rememberMe');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupInputValidation();
        this.loadRememberedCredentials();
        this.userIdInput.focus();
    }
    
    setupEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Password toggle
        this.passwordToggle.addEventListener('click', () => this.togglePassword());
        
        // Input events for real-time validation
        this.userIdInput.addEventListener('input', () => this.validateField(this.userIdInput));
        this.userIdInput.addEventListener('blur', () => this.validateField(this.userIdInput));
        
        this.passwordInput.addEventListener('input', () => this.validateField(this.passwordInput));
        this.passwordInput.addEventListener('blur', () => this.validateField(this.passwordInput));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
        
        // Modal close
        this.successModal.addEventListener('click', (e) => {
            if (e.target === this.successModal) {
                this.closeModal();
            }
        });
    }
    
    setupInputValidation() {
        // Add input animation effects
        [this.userIdInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
                this.clearFieldError(input);
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }
    
    loadRememberedCredentials() {
        try {
            const rememberedUserId = localStorage.getItem('rememberedUserId');
            if (rememberedUserId) {
                this.userIdInput.value = rememberedUserId;
                this.rememberMeCheckbox.checked = true;
                this.validateField(this.userIdInput);
                this.passwordInput.focus();
            }
        } catch (error) {
            console.warn('Could not load remembered credentials:', error);
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const userId = this.userIdInput.value.trim();
        const password = this.passwordInput.value.trim();
        const rememberMe = this.rememberMeCheckbox.checked;
        
        // Clear previous errors
        this.clearAllErrors();
        
        // Validate inputs
        if (!this.validateInputs(userId, password)) {
            this.shakeForm();
            return;
        }
        
        // Start loading state
        this.setLoadingState(true);
        
        try {
            // Simulate authentication (replace with actual API call)
            await this.authenticateUser(userId, password, rememberMe);
        } catch (error) {
            console.error('Authentication failed:', error);
            this.handleAuthError(error.message || 'Authentication failed. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    validateInputs(userId, password) {
        let isValid = true;
        
        if (!userId) {
            this.showFieldError(this.userIdInput, 'Please enter your User ID');
            isValid = false;
        } else if (userId.length < 3) {
            this.showFieldError(this.userIdInput, 'User ID must be at least 3 characters');
            isValid = false;
        }
        
        if (!password) {
            this.showFieldError(this.passwordInput, 'Please enter your password');
            isValid = false;
        } else if (password.length < 6) {
            this.showFieldError(this.passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        const isUserId = input === this.userIdInput;
        const isPassword = input === this.passwordInput;
        
        // Clear previous state
        input.classList.remove('error', 'success');
        this.clearFieldError(input);
        
        if (value.length === 0) {
            // Empty field - neutral state
            return;
        }
        
        if (isUserId) {
            if (value.length >= 3) {
                input.classList.add('success');
            } else {
                input.classList.add('error');
                this.showFieldError(input, 'User ID must be at least 3 characters');
            }
        }
        
        if (isPassword) {
            if (value.length >= 6) {
                input.classList.add('success');
            } else {
                input.classList.add('error');
                this.showFieldError(input, 'Password must be at least 6 characters');
            }
        }
    }
    
    async authenticateUser(userId, password, rememberMe) {
        // Simulate API call with realistic delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // For demo purposes, accept any valid credentials
                if (userId.length >= 3 && password.length >= 6) {
                    const mockResponse = {
                        success: true,
                        token: 'mock-jwt-token',
                        vendor: {
                            id: '12345',
                            name: 'John Doe',
                            businessName: 'Demo Business'
                        },
                        redirectUrl: 'dashboard.html'
                    };
                    this.handleAuthSuccess(mockResponse, rememberMe, userId);
                    resolve(mockResponse);
                } else {
                    reject(new Error('Invalid credentials. Please check your User ID and password.'));
                }
            }, 1500);
        });
    }
    
    handleAuthSuccess(data, rememberMe, userId) {
        // Store session data (using variables instead of sessionStorage for demo)
        window.vendorData = {
            token: data.token,
            vendor: data.vendor
        };
        
        // Handle remember me
        try {
            if (rememberMe) {
                localStorage.setItem('rememberedUserId', userId);
            } else {
                localStorage.removeItem('rememberedUserId');
            }
        } catch (error) {
            console.warn('Could not save remember me preference:', error);
        }
        
        // Show success modal
        this.showSuccessModal();
        
        // Simulate redirect after delay
        setTimeout(() => {
            console.log('Would redirect to:', data.redirectUrl || 'dashboard.html');
            // window.location.href = data.redirectUrl || 'dashboard.html';
        }, 2500);
    }
    
    handleAuthError(message) {
        this.showFormError(message);
        this.highlightErrorFields();
        this.shakeForm();
        
        // Focus back to first input
        this.userIdInput.focus();
    }
    
    setLoadingState(loading) {
        const btnContent = this.loginBtn.querySelector('.btn-content');
        const btnLoader = this.loginBtn.querySelector('.btn-loader');
        
        if (loading) {
            this.loginBtn.disabled = true;
            btnContent.style.opacity = '0';
            btnLoader.classList.remove('hidden');
        } else {
            this.loginBtn.disabled = false;
            btnContent.style.opacity = '1';
            btnLoader.classList.add('hidden');
        }
    }
    
    togglePassword() {
        const eyeOpen = this.passwordToggle.querySelector('.eye-open');
        const eyeClosed = this.passwordToggle.querySelector('.eye-closed');
        
        if (this.passwordInput.type === 'password') {
            this.passwordInput.type = 'text';
            eyeOpen.classList.add('hidden');
            eyeClosed.classList.remove('hidden');
        } else {
            this.passwordInput.type = 'password';
            eyeOpen.classList.remove('hidden');
            eyeClosed.classList.add('hidden');
        }
        
        // Maintain focus
        this.passwordInput.focus();
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
        
        // Auto-remove after 8 seconds
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
        errorElement.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>${message}</span>
        `;
    }
    clearFieldError(input) {
        const inputGroup = input.closest('.input-group');
        const errorElement = inputGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    } 


    clearAllErrors() {
      // Remove form-level errors
      const formError = this.form.querySelector('.form-error');
      if (formError) {
        formError.remove();
      }
      // Remove field-level errors
      [this.userIdInput, this.passwordInput].forEach(input => this.clearFieldError(input));
    }

    highlightErrorFields() {
      [this.userIdInput, this.passwordInput].forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
        }
      });
    }

    shakeForm() {
      this.form.classList.remove('shake');
      // Force reflow to restart animation
      void this.form.offsetWidth;
      this.form.classList.add('shake');
      setTimeout(() => {
        this.form.classList.remove('shake');
      }, 500);
    }

    showSuccessModal() {
      this.successModal.classList.add('active');
      // Optionally, set modal content here if needed
    }

    closeModal() {
      this.successModal.classList.remove('active');
    }

    handleKeyboardShortcuts(e) {
      // Submit form on Enter if not loading
      if (e.key === 'Enter' && !this.loginBtn.disabled) {
        if (document.activeElement === this.userIdInput || document.activeElement === this.passwordInput) {
          this.form.requestSubmit();
        }
      }
      // Toggle password visibility with Ctrl+Shift+V
      if (e.ctrlKey && e.shiftKey && (e.key === 'V' || e.key === 'v')) {
        this.togglePassword();
      }
        }
        }

        // Initialize the VendorLogin class when DOM is ready
        document.addEventListener('DOMContentLoaded', () => {
          new VendorLogin();
        });