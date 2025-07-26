// Street Food Data
const streetFoodData = {
    'Phuchka': {
        ingredients: ['Semolina', 'Tamarind', 'Mint', 'Chickpeas', 'Potatoes', 'Cumin', 'Black Salt', 'Green Chili']
    },
    'Vada Pav': {
        ingredients: ['Bread Rolls', 'Potato', 'Gram Flour', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Green Chili', 'Garlic']
    },
    'Chole Bhature': {
        ingredients: ['Chickpeas', 'All Purpose Flour', 'Yogurt', 'Onions', 'Tomatoes', 'Garam Masala', 'Coriander', 'Oil']
    },
    'Masala Chai': {
        ingredients: ['Black Tea', 'Milk', 'Sugar', 'Cardamom', 'Ginger', 'Cinnamon', 'Cloves', 'Black Pepper']
    },
    'Pav Bhaji': {
        ingredients: ['Mixed Vegetables', 'Butter', 'Bread Rolls', 'Onions', 'Tomatoes', 'Pav Bhaji Masala', 'Lemon', 'Coriander']
    },
    'Samosa': {
        ingredients: ['All Purpose Flour', 'Potatoes', 'Green Peas', 'Cumin Seeds', 'Coriander Seeds', 'Red Chili', 'Oil', 'Ajwain']
    },
    'Dosa': {
        ingredients: ['Rice', 'Black Gram Dal', 'Fenugreek Seeds', 'Oil', 'Curry Leaves', 'Mustard Seeds', 'Coconut', 'Green Chili']
    },
    'Bhel Puri': {
        ingredients: ['Puffed Rice', 'Sev', 'Tamarind Chutney', 'Green Chutney', 'Onions', 'Tomatoes', 'Coriander', 'Lemon']
    },
    'Kachori': {
        ingredients: ['All Purpose Flour', 'Moong Dal', 'Fennel Seeds', 'Asafoetida', 'Red Chili', 'Ginger', 'Oil', 'Salt']
    },
    'Jalebi': {
        ingredients: ['All Purpose Flour', 'Sugar', 'Saffron', 'Cardamom', 'Lemon Juice', 'Oil', 'Food Color', 'Rose Water']
    },
    'Aloo Tikki': {
        ingredients: ['Potatoes', 'Green Peas', 'Bread Crumbs', 'Cumin Powder', 'Coriander', 'Green Chili', 'Ginger', 'Oil']
    },
    'Kulfi': {
        ingredients: ['Full Fat Milk', 'Sugar', 'Cardamom', 'Pistachios', 'Almonds', 'Saffron', 'Rose Water', 'Condensed Milk']
    },
    'Paratha': {
        ingredients: ['Wheat Flour', 'Oil', 'Salt', 'Water', 'Potatoes', 'Onions', 'Green Chili', 'Coriander']
    },
    'Chaat': {
        ingredients: ['Potatoes', 'Chickpeas', 'Yogurt', 'Tamarind Chutney', 'Green Chutney', 'Sev', 'Onions', 'Chaat Masala']
    }
};

// Food categories for auto-suggestions  
const foodCategories = Object.keys(streetFoodData);

// DOM Elements
const searchInput = document.getElementById('foodSearch');
const suggestionsContainer = document.getElementById('suggestions');
const foodCard = document.getElementById('foodCard');
const searchBtn = document.getElementById('searchBtn');

// Vendor list (stored in memory)
let vendorList = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupSearchFunctionality();
    setupScrollAnimations();
    setupStoryAnimations();
}

// Search Functionality
function setupSearchFunctionality() {
    searchInput.addEventListener('input', handleSearchInput);
    searchInput.addEventListener('focus', handleSearchFocus);
    searchInput.addEventListener('blur', handleSearchBlur);
    searchBtn.addEventListener('click', handleSearch);
    
    // Handle Enter key
    searchInput.addEventListener('keydown', function(e) {
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
    
    const filteredCategories = foodCategories.filter(category => 
        category.toLowerCase().includes(query)
    );
    
    showSuggestions(filteredCategories);
}

function handleSearchFocus() {
    if (searchInput.value.trim().length > 0) {
        const query = searchInput.value.toLowerCase().trim();
        const filteredCategories = foodCategories.filter(category => 
            category.toLowerCase().includes(query)
        );
        showSuggestions(filteredCategories);
    }
}

function handleSearchBlur() {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
        hideSuggestions();
    }, 150);
}

function showSuggestions(categories) {
    if (categories.length === 0) {
        hideSuggestions();
        return;
    }
    
    suggestionsContainer.innerHTML = '';
    
    categories.slice(0, 6).forEach(category => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.textContent = category;
        suggestionItem.addEventListener('click', () => selectFood(category));
        suggestionsContainer.appendChild(suggestionItem);
    });
    
    suggestionsContainer.style.display = 'block';
}

function hideSuggestions() {
    suggestionsContainer.style.display = 'none';
}

function selectFood(foodName) {
    searchInput.value = foodName;
    hideSuggestions();
    displayFoodCard(foodName);
}

function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        const matchedFood = foodCategories.find(food => 
            food.toLowerCase() === query.toLowerCase()
        );
        
        if (matchedFood) {
            displayFoodCard(matchedFood);
        } else {
            showNoResultsMessage();
        }
    }
    hideSuggestions();
}

function displayFoodCard(foodName) {
    const foodData = streetFoodData[foodName];
    
    if (!foodData) {
        showNoResultsMessage();
        return;
    }
    
    const ingredientTags = foodData.ingredients.map(ingredient => 
        `<span class="ingredient-tag">${ingredient}</span>`
    ).join('');
    
    foodCard.innerHTML = `
        <h3>${foodName}</h3>
        <div class="ingredients">
            <h4>Key Ingredients:</h4>
            <div class="ingredient-list">
                ${ingredientTags}
            </div>
        </div>
        <button class="add-btn" onclick="addToVendorList('${foodName}')">
            <i class="fas fa-plus"></i> Add to My Vendor List
        </button>
    `;
    
    foodCard.classList.remove('hidden');
    
    // Animate the card appearance
    foodCard.style.opacity = '0';
    foodCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        foodCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        foodCard.style.opacity = '1';
        foodCard.style.transform = 'translateY(0)';
    }, 10);
}

function showNoResultsMessage() {
    foodCard.innerHTML = `
        <h3>No Results Found</h3>
        <p style="color: rgba(255, 255, 255, 0.8); margin-top: 10px;">
            Try searching for popular street foods like Samosa, Dosa, Vada Pav, or Chai.
        </p>
    `;
    foodCard.classList.remove('hidden');
}

function addToVendorList(foodName) {
    if (!vendorList.includes(foodName)) {
        vendorList.push(foodName);
        showSuccessMessage(`${foodName} added to your vendor list!`);
        
        // Animate button
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))';
        }, 2000);
    } else {
        showInfoMessage(`${foodName} is already in your vendor list!`);
    }
}

function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showInfoMessage(message) {
    showToast(message, 'info');
}

function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #3498db, #2980b9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Scroll Animations for Success Stories
function setupStoryAnimations() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, observerOptions);
    
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        storyObserver.observe(card);
    });
}

// Enhanced scroll animations
function setupScrollAnimations() {
    // Parallax effect for carousel
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.carousel-row');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Search button animation
searchBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(360deg)';
});

searchBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
});

// Add loading animation for search
function showSearchLoading() {
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchBtn.disabled = true;
}

function hideSearchLoading() {
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.disabled = false;
}

// Carousel pause on hover
document.querySelectorAll('.carousel-row').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// Add keyboard navigation for suggestions
document.addEventListener('keydown', function(e) {
    const suggestions = document.querySelectorAll('.suggestion-item');
    if (suggestions.length === 0) return;
    
    let currentIndex = Array.from(suggestions).findIndex(item => 
        item.classList.contains('highlighted')
    );
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex < suggestions.length - 1) {
            if (currentIndex >= 0) suggestions[currentIndex].classList.remove('highlighted');
            suggestions[currentIndex + 1].classList.add('highlighted');
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            suggestions[currentIndex].classList.remove('highlighted');
            suggestions[currentIndex - 1].classList.add('highlighted');
        }
    } else if (e.key === 'Enter' && currentIndex >= 0) {
        e.preventDefault();
        suggestions[currentIndex].click();
    }
});

// Add CSS for highlighted suggestions
const style = document.createElement('style');
style.textContent = `
    .suggestion-item.highlighted {
        background: rgba(255, 255, 255, 0.2) !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce search input
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

// Replace the direct event listener with debounced version
const debouncedSearchInput = debounce(handleSearchInput, 300);
searchInput.removeEventListener('input', handleSearchInput);
searchInput.addEventListener('input', debouncedSearchInput);