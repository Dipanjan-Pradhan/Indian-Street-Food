// Street Food Platform with AI Integration
class StreetFoodPlatform {
    constructor() {
        this.vendorList = [];
        this.currentStoryIndex = 0;
        this.stories = [];
        this.storyAutoSlide = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSuccessStories();
        this.setupNavigation();
        this.setupModals();
        this.setupScrollAnimations();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('foodSearch');
        const searchBtn = document.getElementById('searchBtn');
        
        searchInput.addEventListener('input', this.debounce(this.handleSearchInput.bind(this), 300));
        searchBtn.addEventListener('click', this.handleSearch.bind(this));
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        // Food item clicks
        document.querySelectorAll('.food-item').forEach(item => {
            item.addEventListener('click', () => {
                const foodName = item.dataset.food;
                this.openVendorModal(foodName);
            });
        });

        // Navigation buttons
        document.getElementById('vendorListBtn').addEventListener('click', this.openVendorListModal.bind(this));
        document.getElementById('getStartedBtn').addEventListener('click', this.scrollToSearch.bind(this));
        
        // Story navigation
        document.getElementById('prevStory').addEventListener('click', this.prevStory.bind(this));
        document.getElementById('nextStory').addEventListener('click', this.nextStory.bind(this));

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll.bind(this));
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    async handleSearchInput(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }

        // For demo purposes, we'll use a predefined list for suggestions
        // In production, this would call an AI API
        const suggestions = await this.getAISuggestions(query);
        this.showSuggestions(suggestions);
    }

    async getAISuggestions(query) {
        // Simulate AI API call with popular street foods
        const popularFoods = [
            'Pizza', 'Burger', 'Tacos', 'Hot Dog', 'Ramen', 'Sushi', 'Kebab', 
            'Falafel', 'Crepe', 'Gyros', 'Bao', 'Empanada', 'Churros', 'Pretzel',
            'Fish and Chips', 'Poutine', 'Corn Dog', 'Shawarma', 'Pad Thai', 'Pho'
        ];
        
        return popularFoods.filter(food => 
            food.toLowerCase().includes(query)
        ).slice(0, 6);
    }

    showSuggestions(suggestions) {
        const container = document.getElementById('suggestions');
        container.innerHTML = '';
        
        if (suggestions.length === 0) {
            container.style.display = 'none';
            return;
        }

        suggestions.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('click', () => {
                document.getElementById('foodSearch').value = suggestion;
                this.hideSuggestions();
                this.handleSearch();
            });
            container.appendChild(item);
        });

        container.style.display = 'block';
    }

    hideSuggestions() {
        document.getElementById('suggestions').style.display = 'none';
    }

    async handleSearch() {
        const query = document.getElementById('foodSearch').value.trim();
        if (!query) return;

        this.showLoading();
        
        try {
            // Simulate AI API call to get food information
            const foodData = await this.getFoodDataFromAI(query);
            
            if (foodData) {
                this.hideLoading();
                this.openVendorModal(query, foodData);
            } else {
                this.hideLoading();
                this.showNotFoundMessage(query);
            }
        } catch (error) {
            this.hideLoading();
            this.showErrorMessage();
        }
        
        this.hideSuggestions();
    }

    async getFoodDataFromAI(foodName) {
        // Simulate AI API response
        // In production, this would call OpenAI API or similar
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockData = {
                    ingredients: this.generateIngredients(foodName),
                    tips: this.generateBusinessTips(foodName),
                    popularity: this.generatePopularityInfo(foodName)
                };
                resolve(mockData);
            }, 1500);
        });
    }

    generateIngredients(foodName) {
        const ingredientMap = {
            'pizza': ['Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Olive Oil', 'Basil', 'Pepperoni', 'Mushrooms', 'Bell Peppers'],
            'burger': ['Burger Buns', 'Ground Beef', 'Lettuce', 'Tomato', 'Onion', 'Cheese', 'Pickles', 'Condiments'],
            'tacos': ['Corn Tortillas', 'Ground Meat', 'Onions', 'Cilantro', 'Lime', 'Salsa', 'Cheese', 'Lettuce'],
            'ramen': ['Ramen Noodles', 'Broth Base', 'Soy Sauce', 'Miso Paste', 'Green Onions', 'Eggs', 'Pork', 'Nori'],
            'default': ['Main Ingredient', 'Spices', 'Oil', 'Salt', 'Vegetables', 'Herbs', 'Sauce Base', 'Garnish']
        };
        
        return ingredientMap[foodName.toLowerCase()] || ingredientMap['default'];
    }

    generateBusinessTips(foodName) {
        return [
            'Start with high-quality ingredients for better taste',
            'Maintain consistent portion sizes',
            'Keep your cooking area clean and hygienic',
            'Price competitively but ensure profit margins',
            'Build relationships with regular customers',
            'Consider peak hours for maximum sales',
            'Always have backup ingredients ready',
            'Get proper food handling permits'
        ];
    }

    generatePopularityInfo(foodName) {
        const regions = ['North America', 'Europe', 'Asia', 'South America', 'Middle East', 'Africa'];
        const randomRegion = regions[Math.floor(Math.random() * regions.length)];
        
        return {
            region: `Popular in ${randomRegion}`,
            description: `${foodName} is beloved for its unique flavors and accessibility. Perfect for street vendors looking to serve quality food quickly.`
        };
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    showNotFoundMessage(query) {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="not-found">
                <i class="fas fa-search"></i>
                <h3>Food Not Found</h3>
                <p>Sorry, we couldn't find information about "${query}". Try searching for popular foods like Pizza, Burger, Tacos, or Ramen.</p>
            </div>
        `;
        resultsContainer.classList.remove('hidden');
    }

    showErrorMessage() {
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = `
            <div class="not-found">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Something went wrong</h3>
                <p>Please try again later. Our AI service might be temporarily unavailable.</p>
            </div>
        `;
        resultsContainer.classList.remove('hidden');
    }

    openVendorModal(foodName, foodData = null) {
        const modal = document.getElementById('vendorModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = `Start Your ${foodName} Vendor Journey`;

        if (foodData) {
            modalBody.innerHTML = `
                <div class="vendor-info">
                    <div class="ingredients-section">
                        <h4><i class="fas fa-shopping-basket"></i> Key Ingredients</h4>
                        <div class="ingredients-list">
                            ${foodData.ingredients.map(ingredient => 
                                `<span class="ingredient-tag">${ingredient}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="business-tips">
                        <h4><i class="fas fa-lightbulb"></i> Business Tips</h4>
                        <ul>
                            ${foodData.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div class="popularity-info">
                    <h4><i class="fas fa-globe"></i> Market Information</h4>
                    <p><strong>Region:</strong> ${foodData.popularity.region}</p>
                    <p>${foodData.popularity.description}</p>
                </div>
                <button class="add-to-list-btn" onclick="streetFoodPlatform.addToVendorList('${foodName}')">
                    <i class="fas fa-plus"></i> Add to My Vendor List
                </button>
            `;
        } else {
            // For predefined foods from carousel
            modalBody.innerHTML = `
                <div class="loading-food-data">
                    <div class="spinner"></div>
                    <p>Loading ${foodName} information...</p>
                </div>
            `;
            
            // Simulate loading data
            setTimeout(() => {
                this.getFoodDataFromAI(foodName).then(data => {
                    this.openVendorModal(foodName, data);
                });
            }, 1000);
        }

        modal.style.display = 'block';
    }

    addToVendorList(foodName) {
        if (!this.vendorList.includes(foodName)) {
            this.vendorList.push(foodName);
            this.updateVendorListCount();
            this.showToast(`${foodName} added to your vendor list!`, 'success');
            
            // Update button
            const btn = event.target;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added to List!';
            btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))';
            }, 2000);
        } else {
            this.showToast(`${foodName} is already in your list!`, 'info');
        }
    }

    updateVendorListCount() {
        document.getElementById('listCount').textContent = this.vendorList.length;
    }

    openVendorListModal() {
        const modal = document.getElementById('vendorListModal');
        const modalBody = document.getElementById('vendorListBody');

        if (this.vendorList.length === 0) {
            modalBody.innerHTML = `
                <div class="empty-list">
                    <i class="fas fa-list" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 20px;"></i>
                    <h3>Your vendor list is empty</h3>
                    <p>Start exploring foods and add them to your list to begin your vendor journey!</p>
                </div>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="vendor-list">
                    ${this.vendorList.map(food => `
                        <div class="vendor-list-item">
                            <div>
                                <h4>${food}</h4>
                                <p>Ready to start your ${food} business</p>
                            </div>
                            <button class="remove-btn" onclick="streetFoodPlatform.removeFromVendorList('${food}')">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <button class="add-to-list-btn" onclick="streetFoodPlatform.exportVendorList()">
                        <i class="fas fa-download"></i> Export My List
                    </button>
                </div>
            `;
        }

        modal.style.display = 'block';
    }

    removeFromVendorList(foodName) {
        this.vendorList = this.vendorList.filter(food => food !== foodName);
        this.updateVendorListCount();
        this.openVendorListModal(); // Refresh the modal
        this.showToast(`${foodName} removed from your list`, 'info');
    }

    exportVendorList() {
        const dataStr = JSON.stringify(this.vendorList, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-vendor-list.json';
        link.click();
        URL.revokeObjectURL(url);
        this.showToast('Vendor list exported successfully!', 'success');
    }

    async loadSuccessStories() {
        // Simulate loading real success stories from web search or API
        // In production, this would call a web search API or database
        const stories = await this.fetchSuccessStories();
        this.stories = stories;
        this.renderStories();
        this.startStoryAutoSlide();
    }

    async fetchSuccessStories() {
        // Simulated API call - in production, use web search API
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockStories = [
                    {
                        name: "Maria Rodriguez",
                        location: "Los Angeles, CA",
                        business: "Taco Truck",
                        image: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
                        quote: "Started with $2000 and one taco truck. Now I own 5 trucks and serve 1000+ customers daily!",
                        revenue: "$50K/month"
                    },
                    {
                        name: "Ahmed Hassan",
                        location: "New York, NY",
                        business: "Halal Cart",
                        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                        quote: "From street vendor to restaurant owner. This platform helped me understand ingredients and pricing.",
                        revenue: "$75K/month"
                    },
                    {
                        name: "Lisa Chen",
                        location: "San Francisco, CA",
                        business: "Bao Stand",
                        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                        quote: "AI-powered ingredient sourcing reduced my costs by 30%. Now expanding to 3 locations!",
                        revenue: "$40K/month"
                    },
                    {
                        name: "Roberto Silva",
                        location: "Miami, FL",
                        business: "Empanada Cart",
                        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                        quote: "Found my authentic recipes and suppliers here. Customers love the traditional taste!",
                        revenue: "$35K/month"
                    },
                    {
                        name: "Priya Patel",
                        location: "Chicago, IL",
                        business: "Indian Street Food",
                        image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
                        quote: "Transformed my hobby into a thriving business. The ingredient insights were game-changing!",
                        revenue: "$45K/month"
                    }
                ];
                resolve(mockStories);
            }, 1000);
        });
    }

    renderStories() {
        const track = document.getElementById('storiesTrack');
        const indicators = document.getElementById('storyIndicators');
        
        track.innerHTML = this.stories.map(story => `
            <div class="story-card">
                <div class="story-image">
                    <img src="${story.image}" alt="${story.name}">
                </div>
                <div class="story-content">
                    <h3>${story.name}</h3>
                    <p class="location">${story.location}</p>
                    <p class="business-info">${story.business} • ${story.revenue}</p>
                    <blockquote>${story.quote}</blockquote>
                </div>
            </div>
        `).join('');

        indicators.innerHTML = this.stories.map((_, index) => `
            <div class="story-indicator ${index === 0 ? 'active' : ''}" 
                 onclick="streetFoodPlatform.goToStory(${index})"></div>
        `).join('');
    }

    startStoryAutoSlide() {
        this.storyAutoSlide = setInterval(() => {
            this.nextStory();
        }, 6000); // Change story every 6 seconds
    }

    stopStoryAutoSlide() {
        if (this.storyAutoSlide) {
            clearInterval(this.storyAutoSlide);
        }
    }

    nextStory() {
        this.currentStoryIndex = (this.currentStoryIndex + 1) % this.stories.length;
        this.updateStoriesDisplay();
    }

    prevStory() {
        this.currentStoryIndex = this.currentStoryIndex === 0 ? 
            this.stories.length - 1 : this.currentStoryIndex - 1;
        this.updateStoriesDisplay();
    }

    goToStory(index) {
        this.currentStoryIndex = index;
        this.updateStoriesDisplay();
        this.stopStoryAutoSlide();
        this.startStoryAutoSlide(); // Restart auto-slide
    }

    updateStoriesDisplay() {
        const track = document.getElementById('storiesTrack');
        const translateX = -this.currentStoryIndex * (350 + 30); // card width + gap
        track.style.transform = `translateX(${translateX}px)`;

        // Update indicators
        document.querySelectorAll('.story-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentStoryIndex);
        });
    }

    setupModals() {
        // Close modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('vendorModal').style.display = 'none';
        });

        document.getElementById('closeVendorListModal').addEventListener('click', () => {
            document.getElementById('vendorListModal').style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const vendorModal = document.getElementById('vendorModal');
            const listModal = document.getElementById('vendorListModal');
            
            if (e.target === vendorModal) {
                vendorModal.style.display = 'none';
            }
            if (e.target === listModal) {
                listModal.style.display = 'none';
            }
        });
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    scrollToSearch() {
        document.getElementById('search').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    setupScrollAnimations() {
        // Parallax effect for carousel
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.carousel-row');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Pause carousel on hover
        document.querySelectorAll('.carousel-row').forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.animationPlayState = 'paused';
            });
            
            row.addEventListener('mouseleave', () => {
                row.style.animationPlayState = 'running';
            });
        });
    }

    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Toast styles
        toast.style.cssText = `
            position: fixed;
            top: 100px;
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
            display: flex;
            align-items: center;
            gap: 10px;
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

    debounce(func, wait) {
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
}

// Initialize the platform
const streetFoodPlatform = new StreetFoodPlatform();

// Global functions for HTML onclick events
window.streetFoodPlatform = streetFoodPlatform;