// Street Food Search Data
const streetFoodsData = [
    'Vada Pav', 'Vada', 'Pav', 'Wada Pav', 'Wada', 'Batata Vada',
    'Phuchka', 'Puchka', 'Pani Puri', 'Golgappa', 'Gupchup',
    'Chole Bhature', 'Chole', 'Bhature', 'Chana Bhatura',
    'Pav Bhaji', 'Bhaji Pav',
    'Samosa', 'Samosas',
    'Dosa', 'Masala Dosa', 'Plain Dosa',
    'Idli', 'Idly',
    'Chai', 'Tea', 'Masala Chai',
    'Jalebi', 'Jilebi',
    'Kulfi', 'Ice Cream Kulfi',
    'Biryani', 'Chicken Biryani', 'Mutton Biryani', 'Veg Biryani',
    'Tandoori Chicken', 'Tandoori',
    'Paratha', 'Aloo Paratha', 'Paneer Paratha',
    'Naan', 'Butter Naan', 'Garlic Naan',
    'Rasgulla', 'Roshogolla',
    'Kachori', 'Kachauri',
    'Chaat', 'Chat', 'Papdi Chaat', 'Aloo Chaat',
    'Bhel Puri', 'Bhelpuri',
    'Sev Puri', 'Sevpuri',
    'Dhokla', 'Khaman Dhokla',
    'Masala Dosa',
    'Uttapam',
    'Poha', 'Kanda Poha',
    'Upma',
    'Aloo Tikki', 'Aloo Tiki'
];

// Helper: Map similar names to main food slug
const foodNameToSlug = {
    'vada pav': 'vada-pav',
    'vada': 'vada-pav',
    'wada pav': 'vada-pav',
    'wada': 'vada-pav',
    'batata vada': 'vada-pav',
    'phuchka': 'phuchka',
    'puchka': 'phuchka',
    'pani puri': 'phuchka',
    'golgappa': 'phuchka',
    'gupchup': 'phuchka',
    'chole bhature': 'chole-bhature',
    'chole': 'chole-bhature',
    'bhature': 'chole-bhature',
    'chana bhatura': 'chole-bhature',
    'pav bhaji': 'pav-bhaji',
    'bhaji pav': 'pav-bhaji',
    'samosa': 'samosa',
    'samosas': 'samosa',
    'dosa': 'masala-dosa',
    'masala dosa': 'masala-dosa',
    'plain dosa': 'masala-dosa',
    'idli': 'idli',
    'idly': 'idli',
    'chai': 'chai',
    'tea': 'chai',
    'masala chai': 'chai',
    'jalebi': 'jalebi',
    'jilebi': 'jalebi',
    'kulfi': 'kulfi',
    'ice cream kulfi': 'kulfi',
    'biryani': 'biryani',
    'chicken biryani': 'biryani',
    'mutton biryani': 'biryani',
    'veg biryani': 'biryani',
    'tandoori chicken': 'tandoori-chicken',
    'tandoori': 'tandoori-chicken',
    'paratha': 'paratha',
    'aloo paratha': 'paratha',
    'paneer paratha': 'paratha',
    'naan': 'naan',
    'butter naan': 'naan',
    'garlic naan': 'naan',
    'rasgulla': 'rasgulla',
    'roshogolla': 'rasgulla',
    'kachori': 'kachori',
    'kachauri': 'kachori',
    'chaat': 'chaat',
    'chat': 'chaat',
    'papdi chaat': 'chaat',
    'aloo chaat': 'chaat',
    'bhel puri': 'bhel-puri',
    'bhelpuri': 'bhel-puri',
    'sev puri': 'sev-puri',
    'sevpuri': 'sev-puri',
    'dhokla': 'dhokla',
    'khaman dhokla': 'dhokla',
    'uttapam': 'uttapam',
    'poha': 'poha',
    'kanda poha': 'poha',
    'upma': 'upma',
    'aloo tikki': 'aloo-tikki',
    'aloo tiki': 'aloo-tikki'
};

// Helper: Get main food slug from user input
function getFoodSlugFromInput(input) {
    const normalized = input.toLowerCase().replace(/\s+/g, ' ').trim();
    return foodNameToSlug[normalized] || normalized.replace(/\s+/g, '-');
}

// Ingredients data for different foods
const ingredientsData = {
    'vada-pav': [
        { name: 'Potatoes', quantity: '1kg', price: '₹40' },
        { name: 'Bread Buns', quantity: '20 pieces', price: '₹60' },
        { name: 'Gram Flour (Besan)', quantity: '500g', price: '₹80' },
        { name: 'Green Chilies', quantity: '100g', price: '₹20' },
        { name: 'Ginger', quantity: '100g', price: '₹25' },
        { name: 'Turmeric Powder', quantity: '100g', price: '₹30' },
        { name: 'Oil for frying', quantity: '1L', price: '₹120' },
        { name: 'Hing (Asafoetida)', quantity: '50g', price: '₹40' },
        { name: 'Coriander Seeds', quantity: '100g', price: '₹35' },
        { name: 'Tamarind', quantity: '200g', price: '₹45' }
    ],
    'phuchka': [
        { name: 'Semolina (Suji)', quantity: '500g', price: '₹60' },
        { name: 'Tamarind', quantity: '300g', price: '₹65' },
        { name: 'Boiled Potatoes', quantity: '1kg', price: '₹40' },
        { name: 'Chickpeas', quantity: '500g', price: '₹70' },
        { name: 'Black Salt', quantity: '100g', price: '₹25' },
        { name: 'Chaat Masala', quantity: '100g', price: '₹50' },
        { name: 'Mint Leaves', quantity: '100g', price: '₹20' },
        { name: 'Green Chilies', quantity: '100g', price: '₹20' },
        { name: 'Jaggery', quantity: '200g', price: '₹40' },
        { name: 'Oil for frying', quantity: '500ml', price: '₹60' }
    ],
    'chole-bhature': [
        { name: 'Chickpeas (Chole)', quantity: '1kg', price: '₹120' },
        { name: 'All Purpose Flour', quantity: '1kg', price: '₹50' },
        { name: 'Yogurt', quantity: '500ml', price: '₹40' },
        { name: 'Onions', quantity: '1kg', price: '₹30' },
        { name: 'Tomatoes', quantity: '1kg', price: '₹50' },
        { name: 'Ginger-Garlic Paste', quantity: '200g', price: '₹60' },
        { name: 'Chole Masala', quantity: '100g', price: '₹80' },
        { name: 'Oil', quantity: '1L', price: '₹120' },
        { name: 'Baking Powder', quantity: '100g', price: '₹30' },
        { name: 'Fresh Coriander', quantity: '100g', price: '₹25' }
    ],
    'chai': [
        { name: 'Tea Leaves', quantity: '500g', price: '₹200' },
        { name: 'Milk', quantity: '5L', price: '₹250' },
        { name: 'Sugar', quantity: '1kg', price: '₹45' },
        { name: 'Cardamom', quantity: '100g', price: '₹400' },
        { name: 'Ginger', quantity: '200g', price: '₹50' },
        { name: 'Cloves', quantity: '50g', price: '₹150' },
        { name: 'Cinnamon Sticks', quantity: '50g', price: '₹120' },
        { name: 'Black Pepper', quantity: '50g', price: '₹180' }
    ],
    'samosa': [
        { name: 'All Purpose Flour', quantity: '1kg', price: '₹50' },
        { name: 'Potatoes', quantity: '2kg', price: '₹80' },
        { name: 'Green Peas', quantity: '500g', price: '₹60' },
        { name: 'Cumin Seeds', quantity: '100g', price: '₹80' },
        { name: 'Coriander Seeds', quantity: '100g', price: '₹35' },
        { name: 'Garam Masala', quantity: '100g', price: '₹60' },
        { name: 'Oil for frying', quantity: '2L', price: '₹240' },
        { name: 'Green Chilies', quantity: '100g', price: '₹20' },
        { name: 'Ginger', quantity: '100g', price: '₹25' },
        { name: 'Fresh Coriander', quantity: '100g', price: '₹25' }
    ],
    'pav-bhaji': [
        { name: 'Potatoes', quantity: '1kg', price: '₹40' },
        { name: 'Cauliflower', quantity: '500g', price: '₹30' },
        { name: 'Green Peas', quantity: '250g', price: '₹30' },
        { name: 'Capsicum', quantity: '250g', price: '₹25' },
        { name: 'Onions', quantity: '500g', price: '₹15' },
        { name: 'Tomatoes', quantity: '1kg', price: '₹50' },
        { name: 'Pav Bhaji Masala', quantity: '100g', price: '₹60' },
        { name: 'Butter', quantity: '200g', price: '₹90' },
        { name: 'Pav (Bread Rolls)', quantity: '20 pieces', price: '₹60' },
        { name: 'Lemon', quantity: '5 pieces', price: '₹20' }
    ],
    // 15 more street food items
    'idli': [
        { name: 'Rice', quantity: '1kg', price: '₹50' },
        { name: 'Urad Dal', quantity: '500g', price: '₹60' },
        { name: 'Fenugreek Seeds', quantity: '50g', price: '₹20' },
        { name: 'Salt', quantity: '100g', price: '₹10' }
    ],
    'jalebi': [
        { name: 'All Purpose Flour', quantity: '500g', price: '₹25' },
        { name: 'Curd', quantity: '200g', price: '₹20' },
        { name: 'Sugar', quantity: '1kg', price: '₹45' },
        { name: 'Saffron', quantity: '1g', price: '₹80' },
        { name: 'Oil for frying', quantity: '1L', price: '₹120' }
    ],
    'kulfi': [
        { name: 'Full Cream Milk', quantity: '2L', price: '₹100' },
        { name: 'Sugar', quantity: '500g', price: '₹25' },
        { name: 'Cardamom', quantity: '20g', price: '₹80' },
        { name: 'Pistachios', quantity: '50g', price: '₹120' },
        { name: 'Almonds', quantity: '50g', price: '₹100' }
    ],
    'biryani': [
        { name: 'Basmati Rice', quantity: '1kg', price: '₹120' },
        { name: 'Chicken/Mutton', quantity: '1kg', price: '₹300' },
        { name: 'Onions', quantity: '500g', price: '₹15' },
        { name: 'Yogurt', quantity: '200g', price: '₹20' },
        { name: 'Biryani Masala', quantity: '100g', price: '₹60' },
        { name: 'Saffron', quantity: '1g', price: '₹80' },
        { name: 'Oil/Ghee', quantity: '250ml', price: '₹60' }
    ],
    'tandoori-chicken': [
        { name: 'Chicken', quantity: '1kg', price: '₹220' },
        { name: 'Yogurt', quantity: '200g', price: '₹20' },
        { name: 'Tandoori Masala', quantity: '100g', price: '₹60' },
        { name: 'Lemon', quantity: '2 pieces', price: '₹8' },
        { name: 'Oil', quantity: '100ml', price: '₹20' }
    ],
    'paratha': [
        { name: 'Wheat Flour', quantity: '1kg', price: '₹40' },
        { name: 'Potatoes', quantity: '500g', price: '₹20' },
        { name: 'Ghee', quantity: '200g', price: '₹80' },
        { name: 'Green Chilies', quantity: '50g', price: '₹10' },
        { name: 'Salt', quantity: '100g', price: '₹10' }
    ],
    'naan': [
        { name: 'All Purpose Flour', quantity: '1kg', price: '₹50' },
        { name: 'Yogurt', quantity: '200g', price: '₹20' },
        { name: 'Baking Powder', quantity: '50g', price: '₹15' },
        { name: 'Butter', quantity: '100g', price: '₹45' },
        { name: 'Salt', quantity: '100g', price: '₹10' }
    ],
    'rasgulla': [
        { name: 'Milk', quantity: '2L', price: '₹100' },
        { name: 'Lemon Juice', quantity: '50ml', price: '₹10' },
        { name: 'Sugar', quantity: '1kg', price: '₹45' },
        { name: 'Cardamom', quantity: '10g', price: '₹40' }
    ],
    'kachori': [
        { name: 'All Purpose Flour', quantity: '1kg', price: '₹50' },
        { name: 'Moong Dal', quantity: '500g', price: '₹60' },
        { name: 'Spices Mix', quantity: '100g', price: '₹30' },
        { name: 'Oil for frying', quantity: '1L', price: '₹120' }
    ],
    'chaat': [
        { name: 'Papdi', quantity: '200g', price: '₹30' },
        { name: 'Boiled Potatoes', quantity: '500g', price: '₹20' },
        { name: 'Chickpeas', quantity: '250g', price: '₹35' },
        { name: 'Yogurt', quantity: '200g', price: '₹20' },
        { name: 'Tamarind Chutney', quantity: '100g', price: '₹25' },
        { name: 'Green Chutney', quantity: '100g', price: '₹20' }
    ],
    'bhel-puri': [
        { name: 'Puffed Rice', quantity: '500g', price: '₹30' },
        { name: 'Sev', quantity: '200g', price: '₹25' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Tomatoes', quantity: '200g', price: '₹10' },
        { name: 'Tamarind Chutney', quantity: '100g', price: '₹25' },
        { name: 'Green Chutney', quantity: '100g', price: '₹20' }
    ],
    'sev-puri': [
        { name: 'Papdi', quantity: '200g', price: '₹30' },
        { name: 'Sev', quantity: '200g', price: '₹25' },
        { name: 'Potatoes', quantity: '500g', price: '₹20' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Tamarind Chutney', quantity: '100g', price: '₹25' },
        { name: 'Green Chutney', quantity: '100g', price: '₹20' }
    ],
    'dhokla': [
        { name: 'Gram Flour (Besan)', quantity: '500g', price: '₹80' },
        { name: 'Yogurt', quantity: '200g', price: '₹20' },
        { name: 'Eno Fruit Salt', quantity: '10g', price: '₹10' },
        { name: 'Mustard Seeds', quantity: '20g', price: '₹15' },
        { name: 'Curry Leaves', quantity: '20g', price: '₹10' }
    ],
    'masala-dosa': [
        { name: 'Rice', quantity: '1kg', price: '₹50' },
        { name: 'Urad Dal', quantity: '500g', price: '₹60' },
        { name: 'Potatoes', quantity: '500g', price: '₹20' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Mustard Seeds', quantity: '20g', price: '₹15' },
        { name: 'Curry Leaves', quantity: '20g', price: '₹10' }
    ],
    'uttapam': [
        { name: 'Rice', quantity: '1kg', price: '₹50' },
        { name: 'Urad Dal', quantity: '500g', price: '₹60' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Tomatoes', quantity: '200g', price: '₹10' },
        { name: 'Green Chilies', quantity: '50g', price: '₹10' }
    ],
    'poha': [
        { name: 'Flattened Rice (Poha)', quantity: '500g', price: '₹30' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Potatoes', quantity: '200g', price: '₹8' },
        { name: 'Peanuts', quantity: '100g', price: '₹20' },
        { name: 'Mustard Seeds', quantity: '20g', price: '₹15' },
        { name: 'Curry Leaves', quantity: '20g', price: '₹10' }
    ],
    'upma': [
        { name: 'Semolina (Suji)', quantity: '500g', price: '₹30' },
        { name: 'Onions', quantity: '200g', price: '₹6' },
        { name: 'Green Chilies', quantity: '50g', price: '₹10' },
        { name: 'Mustard Seeds', quantity: '20g', price: '₹15' },
        { name: 'Curry Leaves', quantity: '20g', price: '₹10' }
    ],
    'aloo-tikki': [
        { name: 'Potatoes', quantity: '1kg', price: '₹40' },
        { name: 'Bread Crumbs', quantity: '200g', price: '₹20' },
        { name: 'Green Chilies', quantity: '50g', price: '₹10' },
        { name: 'Spices Mix', quantity: '50g', price: '₹20' },
        { name: 'Oil for frying', quantity: '1L', price: '₹120' }
    ]


};

// DOM Elements
const searchInput = document.getElementById('foodSearch');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBtn = document.getElementById('searchBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeAnimations();
    initializeCarousel();
    initializeSuccessStories();
});

// Search Functionality
function initializeSearch() {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', showSuggestions);
    searchInput.addEventListener('blur', hideSuggestions);
    searchBtn.addEventListener('click', handleSearch);
    
    // Handle Enter key press
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}

function handleSearchInput(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        hideSuggestions();
        return;
    }
    
    const filteredFoods = streetFoodsData.filter(food => 
        food.toLowerCase().includes(query)
    );
    
    displaySuggestions(filteredFoods);
}

function displaySuggestions(suggestions) {
    searchSuggestions.innerHTML = '';
    
    if (suggestions.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestions.slice(0, 8).forEach(suggestion => {
        const suggestionElement = createSuggestionElement(suggestion);
        searchSuggestions.appendChild(suggestionElement);
    });
    
    showSuggestions();
}

function createSuggestionElement(suggestion) {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = suggestion;
    
    div.addEventListener('mousedown', function(e) {
        e.preventDefault(); // Prevent input blur
        selectSuggestion(suggestion);
    });
    
    return div;
}

function selectSuggestion(suggestion) {
    searchInput.value = suggestion;
    hideSuggestions();
    handleSearch();
}

function showSuggestions() {
    searchSuggestions.classList.add('active');
}

function hideSuggestions() {
    setTimeout(() => {
        searchSuggestions.classList.remove('active');
    }, 150);
}

function handleSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        showNotification('Please enter a food item to search', 'warning');
        return;
    }
    
    // Convert search term to URL-friendly format
    const foodSlug = searchTerm.toLowerCase().replace(/\s+/g, '-');
    
    // Store search data for the ingredients page
    const searchData = {
        foodName: searchTerm,
        foodSlug: foodSlug,
        timestamp: Date.now()
    };
    
    // Store in localStorage for the ingredients page
    try {
        localStorage.setItem('selectedFood', JSON.stringify(searchData));
    } catch (e) {
        // Fallback if localStorage is not available
        console.log('Using fallback storage method');
    }
    
    // Show loading animation
    showSearchAnimation();
    
    // Simulate API call delay
    setTimeout(() => {
        // Redirect to ingredients page
        const redirectUrl = `vendor/ingredients.html?food=${encodeURIComponent(foodSlug)}`;
        
        // For demo purposes, we'll show a modal instead of redirecting
        showIngredientsModal(searchTerm, foodSlug);
    }, 1500);
}

function showSearchAnimation() {
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;
    
    setTimeout(() => {
        searchBtn.innerHTML = originalText;
        searchBtn.disabled = false;
    }, 1500);
}

function showIngredientsModal(foodName, foodSlug) {
    const ingredients = ingredientsData[foodSlug] || getDefaultIngredients(foodName);
    
    const modal = createIngredientsModal(foodName, ingredients);
    document.body.appendChild(modal);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createIngredientsModal(foodName, ingredients) {
    const modal = document.createElement('div');
    modal.className = 'ingredients-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Ingredients for ${foodName}</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p class="modal-subtitle">Select the ingredients you need:</p>
                <div class="ingredients-grid">
                    ${ingredients.map((ingredient, index) => `
                        <div class="ingredient-item">
                            <input type="checkbox" id="ingredient-${index}" class="ingredient-checkbox" data-ingredient='${JSON.stringify(ingredient)}'>
                            <label for="ingredient-${index}" class="ingredient-label">
                                <div class="ingredient-info">
                                    <h4>${ingredient.name}</h4>
                                    <p>Quantity: ${ingredient.quantity}</p>
                                    <p class="price">Price: ${ingredient.price}</p>
                                </div>
                            </label>
                        </div>
                    `).join('')}
                </div>
                <div class="modal-actions">
                    <button class="find-suppliers-btn" onclick="findSuppliers()">
                        <i class="fas fa-search"></i>
                        Find Suppliers
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .ingredients-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .ingredients-modal.active {
            opacity: 1;
        }
        
        .modal-content {
            background: white;
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }
        
        @keyframes modalSlideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
            padding: 30px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            border-radius: 20px 20px 0 0;
        }
        
        .modal-header h2 {
            margin: 0;
            font-size: 1.8rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 2rem;
            color: white;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-modal:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-subtitle {
            font-size: 1.2rem;
            margin-bottom: 25px;
            color: #555;
        }
        
        .ingredients-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .ingredient-item {
            position: relative;
        }
        
        .ingredient-checkbox {
            position: absolute;
            opacity: 0;
            pointer-events: none;
        }
        
        .ingredient-label {
            display: block;
            padding: 20px;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #f9f9f9;
        }
        
        .ingredient-checkbox:checked + .ingredient-label {
            border-color: #ff6b35;
            background: linear-gradient(135deg, #fff5f0, #ffe8d6);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(255, 107, 53, 0.2);
        }
        
        .ingredient-info h4 {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            color: #333;
        }
        
        .ingredient-info p {
            margin: 5px 0;
            color: #666;
        }
        
        .ingredient-info .price {
            font-weight: 600;
            color: #ff6b35;
            font-size: 1.1rem;
        }
        
        .modal-actions {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        
        .find-suppliers-btn {
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 30px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .find-suppliers-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(255, 107, 53, 0.3);
        }
        
        .find-suppliers-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
    `;
    
    // Add styles to document if not already added
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    return modal;
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

function findSuppliers() {
    const checkboxes = document.querySelectorAll('.ingredient-checkbox:checked');
    
    if (checkboxes.length === 0) {
        showNotification('Please select at least one ingredient', 'warning');
        return;
    }
    
    const selectedIngredients = Array.from(checkboxes).map(checkbox => {
        return JSON.parse(checkbox.dataset.ingredient);
    });
    
    // Store selected ingredients
    try {
        localStorage.setItem('selectedIngredients', JSON.stringify(selectedIngredients));
    } catch (e) {
        console.log('Using fallback storage method');
    }
    
    // Show success message and simulate redirect
    showNotification(`Found suppliers for ${selectedIngredients.length} ingredients! Redirecting...`, 'success');
    
    setTimeout(() => {
        // In a real application, this would redirect to: /SupplierInfo/ingredient-suppliers.html
        showNotification('Redirect to supplier page would happen here', 'info');
        closeModal(document.querySelector('.ingredients-modal'));
    }, 2000);
}

function getDefaultIngredients(foodName) {
    return [
        { name: 'Basic Ingredient 1', quantity: '500g', price: '₹50' },
        { name: 'Basic Ingredient 2', quantity: '1kg', price: '₹80' },
        { name: 'Spices Mix', quantity: '200g', price: '₹120' },
        { name: 'Oil', quantity: '500ml', price: '₹60' }
    ];
}

// Animation Initialization
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe sections that need animation
    const animatedElements = document.querySelectorAll('.story-card, .food-card, .discover-section, .success-section');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Carousel Functionality
function initializeCarousel() {
    const carouselRows = document.querySelectorAll('.carousel-row');
    
    carouselRows.forEach(row => {
        // Clone food items for infinite scroll
        const foodItems = row.querySelectorAll('.food-item');
        foodItems.forEach(item => {
            const clone = item.cloneNode(true);
            row.appendChild(clone);
        });
    });
    
    // Pause animation on hover
    carouselRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.animationPlayState = 'paused';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.animationPlayState = 'running';
        });
    });
}

// Success Stories Animation
function initializeSuccessStories() {
    const storyCards = document.querySelectorAll('.story-card');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    
                    // Start typewriter effect for quote
                    const quote = entry.target.querySelector('.quote');
                    if (quote && quote.dataset.typewriter !== undefined) {
                        startTypewriter(quote);
                    }
                }, index * 200);
            }
        });
    }, observerOptions);
    
    storyCards.forEach(card => {
        storyObserver.observe(card);
    });
}

function startTypewriter(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already added
    if (!document.getElementById('notification-styles')) {
        const notificationStyles = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 10px;
                color: white;
                font-weight: 600;
                z-index: 10001;
                animation: slideInRight 0.3s ease;
                max-width: 300px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            
            .notification-info {
                background: linear-gradient(135deg, #3498db, #2980b9);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #2ecc71, #27ae60);
            }
            
            .notification-warning {
                background: linear-gradient(135deg, #f39c12, #e67e22);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #e74c3c, #c0392b);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Lazy load images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add scroll-based animations for better user experience
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.header');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translate3d(0, ${speed}px, 0)`;
    }
});

// Add loading screen functionality
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h2>Loading Street Food Ingredients...</h2>
            <p>Preparing the best ingredients for your street food business</p>
        </div>
    `;
    
    const loadingStyles = `
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #ff9933 0%, #ffffff 50%, #138808 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10002;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
            color: #2c3e50;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(44, 62, 80, 0.3);
            border-left: 4px solid #2c3e50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-content h2 {
            font-size: 2rem;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .loading-content p {
            font-size: 1.1rem;
            opacity: 0.8;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after content is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                if (loadingScreen.parentNode) {
                    loadingScreen.parentNode.removeChild(loadingScreen);
                }
            }, 500);
        }, 1000);
    });
}

// Show loading screen on page load
document.addEventListener('DOMContentLoaded', showLoadingScreen);