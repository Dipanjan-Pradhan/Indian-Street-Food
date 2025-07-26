// Predefined ingredients for different vendor types
const vendorIngredients = {
    phuchkawala: [
        'Semolina (Suji)',
        'Boiled Potatoes',
        'Chaat Masala',
        'Tamarind Water',
        'Mint Chutney',
        'Chickpeas (Chana)',
        'Onions',
        'Coriander Leaves',
        'Black Salt',
        'Red Chili Powder'
    ],
    chaiwala: [
        'Tea Leaves',
        'Milk',
        'Sugar',
        'Ginger',
        'Cardamom',
        'Cloves',
        'Cinnamon',
        'Black Pepper',
        'Fennel Seeds',
        'Disposable Cups'
    ],
    vadapav: [
        'Potatoes',
        'Gram Flour (Besan)',
        'Bread Buns (Pav)',
        'Green Chilies',
        'Ginger',
        'Garlic',
        'Turmeric',
        'Mustard Seeds',
        'Curry Leaves',
        'Oil for Frying',
        'Tamarind Chutney',
        'Garlic Chutney'
    ],
    dosa: [
        'Rice',
        'Black Gram (Urad Dal)',
        'Fenugreek Seeds',
        'Salt',
        'Oil',
        'Potatoes',
        'Onions',
        'Green Chilies',
        'Ginger',
        'Curry Leaves',
        'Mustard Seeds',
        'Turmeric'
    ],
    chaat: [
        'Potatoes',
        'Chickpeas (Chana)',
        'Yogurt',
        'Tamarind Chutney',
        'Mint Chutney',
        'Chaat Masala',
        'Black Salt',
        'Onions',
        'Tomatoes',
        'Coriander Leaves',
        'Sev (Namkeen)',
        'Papdi'
    ],
    samosa: [
        'All Purpose Flour (Maida)',
        'Potatoes',
        'Green Peas',
        'Onions',
        'Ginger',
        'Green Chilies',
        'Cumin Seeds',
        'Coriander Seeds',
        'Garam Masala',
        'Turmeric',
        'Oil for Frying',
        'Salt'
    ],
    juice: [
        'Fresh Fruits (Seasonal)',
        'Sugar',
        'Salt',
        'Black Salt',
        'Lemon',
        'Ice',
        'Water',
        'Disposable Glasses',
        'Straws',
        'Mint Leaves'
    ],
    icecream: [
        'Ice Cream Mix',
        'Milk',
        'Sugar',
        'Vanilla Essence',
        'Chocolate Syrup',
        'Strawberry Syrup',
        'Nuts (Almonds, Cashews)',
        'Cones',
        'Cups',
        'Spoons'
    ]
};

// Global variables
let currentIngredients = [];
let vendorForm, vendorTypeSelect, ingredientsSection, ingredientsList, submitSection;
let newIngredientInput, addIngredientBtn, submitBtn, successMessage;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
});

// Initialize DOM elements
function initializeElements() {
    vendorForm = document.getElementById('vendorForm');
    vendorTypeSelect = document.getElementById('vendorType');
    ingredientsSection = document.getElementById('ingredientsSection');
    ingredientsList = document.getElementById('ingredientsList');
    submitSection = document.getElementById('submitSection');
    newIngredientInput = document.getElementById('newIngredient');
    addIngredientBtn = document.getElementById('addIngredientBtn');
    submitBtn = document.getElementById('submitBtn');
    successMessage = document.getElementById('successMessage');
}

// Setup event listeners
function setupEventListeners() {
    // Vendor type selection
    vendorTypeSelect.addEventListener('change', handleVendorTypeChange);
    
    // Add ingredient functionality
    addIngredientBtn.addEventListener('click', addNewIngredient);
    newIngredientInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewIngredient();
        }
    });
    
    // Form submission
    vendorForm.addEventListener('submit', handleFormSubmit);
    
    // Mobile number validation
    document.getElementById('mobileNumber').addEventListener('input', validateMobileNumber);
    
    // New registration button
    document.getElementById('newRegistration').addEventListener('click', resetForm);
}

// Handle vendor type change
function handleVendorTypeChange() {
    const selectedType = vendorTypeSelect.value;
    
    if (selectedType && vendorIngredients[selectedType]) {
        currentIngredients = [...vendorIngredients[selectedType]];
        displayIngredients();
        showSection(ingredientsSection);
        showSection(submitSection);
    } else {
        hideSection(ingredientsSection);
        hideSection(submitSection);
        currentIngredients = [];
    }
}

// Display ingredients list
function displayIngredients() {
    ingredientsList.innerHTML = '';
    
    currentIngredients.forEach((ingredient, index) => {
        const ingredientItem = createIngredientElement(ingredient, index);
        ingredientsList.appendChild(ingredientItem);
    });
}

// Create ingredient element
function createIngredientElement(ingredient, index) {
    const div = document.createElement('div');
    div.className = 'ingredient-item';
    
    div.innerHTML = `
        <span class="ingredient-name">${ingredient}</span>
        <button type="button" class="remove-btn" onclick="removeIngredient(${index})">
            🗑️ Remove
        </button>
    `;
    
    return div;
}

// Remove ingredient
function removeIngredient(index) {
    currentIngredients.splice(index, 1);
    displayIngredients();
}

// Add new ingredient
function addNewIngredient() {
    const newIngredient = newIngredientInput.value.trim();
    
    if (newIngredient === '') {
        alert('Please enter an ingredient name');
        return;
    }
    
    if (currentIngredients.includes(newIngredient)) {
        alert('This ingredient is already in the list');
        return;
    }
    
    currentIngredients.push(newIngredient);
    displayIngredients();
    newIngredientInput.value = '';
    newIngredientInput.focus();
}

// Validate mobile number
function validateMobileNumber(e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 10) {
        value = value.slice(0, 10); // Limit to 10 digits
    }
    e.target.value = value;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(vendorForm);
    const vendorData = {
        name: formData.get('vendorName'),
        mobile: formData.get('mobileNumber'),
        type: formData.get('vendorType'),
        ingredients: currentIngredients
    };
    
    // Validate form
    if (!validateForm(vendorData)) {
        return;
    }
    
    // Show loading state
    submitBtn.textContent = '⏳ Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Log the data (in real app, this would be sent to server)
        console.log('Vendor Registration Data:', vendorData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset button state
        submitBtn.textContent = '✅ Submit Request';
        submitBtn.disabled = false;
    }, 2000);
}

// Validate form data
function validateForm(data) {
    if (!data.name || data.name.length < 2) {
        alert('Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    if (!data.mobile || data.mobile.length !== 10) {
        alert('Please enter a valid 10-digit mobile number');
        return false;
    }
    
    if (!data.type) {
        alert('Please select your business type');
        return false;
    }
    
    if (currentIngredients.length === 0) {
        alert('Please add at least one ingredient to your list');
        return false;
    }
    
    return true;
}

// Show success message
function showSuccessMessage() {
    successMessage.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Hide success message
function hideSuccessMessage() {
    successMessage.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Reset form for new registration
function resetForm() {
    // Reset form fields
    vendorForm.reset();
    
    // Reset ingredients
    currentIngredients = [];
    ingredientsList.innerHTML = '';
    
    // Hide sections
    hideSection(ingredientsSection);
    hideSection(submitSection);
    
    // Hide success message
    hideSuccessMessage();
    
    // Focus on first input
    document.getElementById('vendorName').focus();
}

// Utility functions for showing/hiding sections
function showSection(section) {
    section.style.display = 'block';
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideSection(section) {
    section.style.display = 'none';
}

// Handle back button or page refresh
window.addEventListener('beforeunload', function(e) {
    const formData = new FormData(vendorForm);
    const hasData = formData.get('vendorName') || formData.get('mobileNumber') || formData.get('vendorType');
    
    if (hasData) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Smooth scrolling for better user experience
function smoothScrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    // Escape key to close success message
    if (e.key === 'Escape' && successMessage.style.display === 'flex') {
        hideSuccessMessage();
    }
});

// Auto-focus management for better user experience
function manageFocus() {
    // Focus on name field when page loads
    setTimeout(() => {
        document.getElementById('vendorName').focus();
    }, 500);
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

// Handle offline/online status
window.addEventListener('online', function() {
    if (submitBtn.disabled) {
        submitBtn.textContent = '✅ Submit Request';
        submitBtn.disabled = false;
    }
});

window.addEventListener('offline', function() {
    if (submitBtn.disabled) {
        submitBtn.textContent = '⚠️ No Internet Connection';
    }
});

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

// Apply debounced validation to inputs
const debouncedMobileValidation = debounce(validateMobileNumber, 300);

// Additional mobile-friendly features
if ('ontouchstart' in window) {
    // Add touch-friendly class for mobile devices
    document.body.classList.add('touch-device');
    
    // Prevent zoom on input focus for iOS
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px';
        });
    });
}