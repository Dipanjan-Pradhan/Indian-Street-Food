// DOM Elements
const profileImage = document.getElementById('profileImage');
const editOverlay = document.getElementById('editOverlay');
const imageUpload = document.getElementById('imageUpload');
const displayName = document.getElementById('displayName');
const displayTagline = document.getElementById('displayTagline');
const foodShowcase = document.getElementById('foodShowcase');
const customSelect = document.getElementById('customSelect');
const selectDisplay = document.getElementById('selectDisplay');
const selectOptions = document.getElementById('selectOptions');
const selectedFoods = document.getElementById('selectedFoods');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Navigation elements
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const notificationBtn = document.querySelector('.notification-btn');
const profileDropdown = document.querySelector('.profile-dropdown');

// Form inputs
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const address = document.getElementById('address');
const stallName = document.getElementById('stallName');
const tagline = document.getElementById('tagline');
const bio = document.getElementById('bio');

// Selected food items array
let selectedFoodItems = [];

// Default blank state
const blankState = {
    profileImage: 'https://via.placeholder.com/120x120/e1e8ed/999?text=Photo',
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    stallName: '',
    tagline: '',
    bio: '',
    selectedFoods: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateSelectedFoodsDisplay();
    updateFoodShowcase();
    initializeNavigation();
});

// Navigation functionality
function initializeNavigation() {
    // Navigation link interactions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Handle navigation
            const href = this.getAttribute('href');
            switch(href) {
                case '#dashboard':
                    showToast('Navigating to Dashboard...', 'info');
                    break;
                case '#profile':
                    showToast('You are on Profile Creation page', 'info');
                    break;
                case '#orders':
                    showToast('Navigating to Orders...', 'info');
                    break;
            }
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('mobile-open');
        this.classList.toggle('active');
    });
    
    // Notification button
    notificationBtn.addEventListener('click', function() {
        showToast('Opening notifications...', 'info');
        // Reset notification badge
        const badge = this.querySelector('.notification-badge');
        if (badge) {
            badge.style.animation = 'none';
            setTimeout(() => {
                badge.textContent = '0';
                badge.style.display = 'none';
            }, 500);
        }
    });
    
    // Profile dropdown
    profileDropdown.addEventListener('click', function() {
        showToast('Opening profile menu...', 'info');
    });
}

// Profile image upload functionality
editOverlay.addEventListener('click', function() {
    imageUpload.click();
});

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            showToast('Profile picture updated!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// Custom select functionality
selectDisplay.addEventListener('click', function() {
    selectOptions.classList.toggle('show');
    selectDisplay.classList.toggle('active');
});

// Close select when clicking outside
document.addEventListener('click', function(e) {
    if (!customSelect.contains(e.target)) {
        selectOptions.classList.remove('show');
        selectDisplay.classList.remove('active');
    }
});

// Handle option selection
selectOptions.addEventListener('click', function(e) {
    if (e.target.classList.contains('option')) {
        const value = e.target.dataset.value;
        const text = e.target.textContent;
        
        if (!selectedFoodItems.includes(text)) {
            selectedFoodItems.push(text);
            updateSelectedFoodsDisplay();
            updateFoodShowcase();
            updateSelectDisplay();
        }
        
        selectOptions.classList.remove('show');
        selectDisplay.classList.remove('active');
    }
});

// Update selected foods display
function updateSelectedFoodsDisplay() {
    selectedFoods.innerHTML = '';
    selectedFoodItems.forEach(food => {
        const foodTag = document.createElement('div');
        foodTag.className = 'selected-food';
        foodTag.innerHTML = `
            ${food}
            <span class="remove-food" data-food="${food}">×</span>
        `;
        selectedFoods.appendChild(foodTag);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-food').forEach(btn => {
        btn.addEventListener('click', function() {
            const foodToRemove = this.dataset.food;
            selectedFoodItems = selectedFoodItems.filter(food => food !== foodToRemove);
            updateSelectedFoodsDisplay();
            updateFoodShowcase();
            updateSelectDisplay();
        });
    });
}

// Update select display text
function updateSelectDisplay() {
    const displayText = selectedFoodItems.length > 0 
        ? `${selectedFoodItems.length} item(s) selected`
        : 'Select Food Items';
    selectDisplay.querySelector('span').textContent = displayText;
}

// Update food showcase in profile header
function updateFoodShowcase() {
    foodShowcase.innerHTML = '';
    if (selectedFoodItems.length === 0) {
        const noItems = document.createElement('div');
        noItems.className = 'no-items';
        noItems.textContent = 'Select food items to display here';
        foodShowcase.appendChild(noItems);
    } else {
        selectedFoodItems.forEach(food => {
            const foodItem = document.createElement('div');
            foodItem.className = 'food-item';
            foodItem.textContent = food;
            foodShowcase.appendChild(foodItem);
        });
    }
}

// Update profile header when name changes
fullName.addEventListener('input', function() {
    displayName.textContent = this.value || 'Your Name';
});

// Update tagline in profile header
tagline.addEventListener('input', function() {
    displayTagline.textContent = this.value || 'Add your tagline here';
});

// Form validation
function validateForm() {
    const errors = [];
    
    // Name validation
    if (!fullName.value.trim()) {
        errors.push('Full name is required');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email.value)) {
        errors.push('Please enter a valid email address');
    }
    
    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobile.value.trim()) {
        errors.push('Mobile number is required');
    } else if (!mobileRegex.test(mobile.value.replace(/\s/g, ''))) {
        errors.push('Please enter a valid 10-digit mobile number');
    }
    
    // Address validation
    if (!address.value.trim()) {
        errors.push('Address is required');
    }
    
    // Food selection validation
    if (selectedFoodItems.length === 0) {
        errors.push('Please select at least one food item');
    }
    
    return errors;
}

// Save profile functionality
saveBtn.addEventListener('click', function() {
    const errors = validateForm();
    
    if (errors.length > 0) {
        showToast(`Please fix the following errors: ${errors.join(', ')}`, 'error');
        return;
    }
    
    // Simulate saving data
    const profileData = {
        profileImage: profileImage.src,
        fullName: fullName.value,
        email: email.value,
        mobile: mobile.value,
        address: address.value,
        stallName: stallName.value,
        tagline: tagline.value,
        bio: bio.value,
        selectedFoods: selectedFoodItems
    };
    
    console.log('Profile data to save:', profileData);
    
    // Add loading animation
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    saveBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Restore button
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Create Profile';
        saveBtn.disabled = false;
        
        // Show success message
        showToast('Profile created successfully!', 'success');
        
    }, 1500);
});

// Reset profile functionality - Clear everything to blank
resetBtn.addEventListener('click', function() {
    if (confirm('Are you sure? This will clear all entered information.')) {
        // Reset profile image to placeholder
        profileImage.src = blankState.profileImage;
        
        // Clear all form fields
        fullName.value = '';
        email.value = '';
        mobile.value = '';
        address.value = '';
        stallName.value = '';
        tagline.value = '';
        bio.value = '';
        
        // Clear selected foods
        selectedFoodItems = [];
        updateSelectedFoodsDisplay();
        updateFoodShowcase();
        updateSelectDisplay();
        
        // Reset profile header
        displayName.textContent = 'Your Name';
        displayTagline.textContent = 'Add your tagline here';
        
        // Add reset animation
        resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Clearing...';
        resetBtn.disabled = true;
        
        setTimeout(() => {
            resetBtn.innerHTML = '<i class="fas fa-refresh"></i> Clear All';
            resetBtn.disabled = false;
            showToast('All fields cleared!', 'info');
        }, 1000);
    }
});

// Toast notification function
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // Change toast color based on type
    if (type === 'error') {
        toast.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
    } else if (type === 'info') {
        toast.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    } else {
        toast.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Input animations and effects
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Mobile number formatting
mobile.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    this.value = value;
});

// Auto-resize textarea
bio.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

address.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Footer link functionality
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const action = this.getAttribute('href').substring(1);
        
        switch(action) {
            case 'logout':
                if (confirm('Are you sure you want to logout?')) {
                    showToast('Logging out...', 'info');
                    setTimeout(() => {
                        // Redirect to login page
                        console.log('Redirecting to login page');
                    }, 1500);
                }
                break;
            case 'support':
                showToast('Opening support chat...', 'info');
                break;
            case 'help':
                showToast('Opening help center...', 'info');
                break;
        }
    });
});

// Social media links
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showToast('Opening social media...', 'info');
    });
});

// Smooth scrolling for page navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Initialize select display text
updateSelectDisplay();

// Add some visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animations to cards
    const cards = document.querySelectorAll('.profile-header, .info-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s ease forwards';
    });
});

// CSS animation keyframes (add to head if needed)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);