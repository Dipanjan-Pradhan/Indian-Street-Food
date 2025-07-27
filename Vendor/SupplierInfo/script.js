// Remove the hardcoded suppliers array at the top of the file
// (lines 2-97 can be deleted)

// Initialize with empty suppliers array
let suppliers = [];
let currentSort = 'distance';
let filteredSuppliers = [];
let isInitialized = false;

// Initialize the page only once
document.addEventListener('DOMContentLoaded', function() {
    if (!isInitialized) {
        isInitialized = true;
        getIngredientFromURL();
        fetchSuppliers();
    }
});

// Fetch suppliers from the database based on the ingredient
async function fetchSuppliers() {
    const urlParams = new URLSearchParams(window.location.search);
    const ingredient = urlParams.get('ingredient') || 'Fresh Tomatoes';
    
    try {
        // Show loading spinner
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
        
        // Fetch suppliers that have the selected ingredient
        let response;
        try {
            // Use the byitem endpoint to get supplier items matching the ingredient name
            response = await fetch(`/api/supplieritem/byitem?itemname=${encodeURIComponent(ingredient)}`);
            
            if (response.ok) {
                const supplierItems = await response.json();
                
                // If we have supplier items, fetch the corresponding supplier details
                if (supplierItems && supplierItems.length > 0) {
                    const supplierPromises = supplierItems.map(async (item) => {
                        const supplierResponse = await fetch(`/api/supplier?userId=${item.user}`);
                        if (supplierResponse.ok) {
                            const supplierData = await supplierResponse.json();
                            if (supplierData && supplierData.length > 0) {
                                // Get user data for name, phone, email
                                const userResponse = await fetch(`/api/user/${supplierData[0].user}`);
                                let userData = {};
                                if (userResponse.ok) {
                                    userData = await userResponse.json();
                                }
                                
                                // Combine supplier data with item data and user data
                                return {
                                    id: supplierData[0]._id,
                                    name: userData.name || 'Unknown Supplier',
                                    business: supplierData[0].shopname || 'Unknown Business',
                                    avatar: `/api/supplier/${supplierData[0]._id}/image`,
                                    price: item.price || 0,
                                    distance: 5, // Placeholder - would need geolocation calculation
                                    rating: 4.5, // Placeholder - would need rating system
                                    reviews: 10, // Placeholder
                                    location: supplierData[0].location || 'Unknown Location',
                                    phone: userData.phone || 'Unknown',
                                    email: userData.email || 'Unknown',
                                    description: `${supplierData[0].specialization || 'Various products'} with ${supplierData[0].experience || '0'} years of experience`,
                                    minOrder: 5, // Placeholder
                                    deliveryTime: "2-4 hours" // Placeholder
                                };
                            }
                        }
                        return null;
                    });
                    
                    suppliers = (await Promise.all(supplierPromises)).filter(s => s !== null);
                }
            }
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
        
        // If no suppliers found, show the no suppliers message
        if (!suppliers || suppliers.length === 0) {
            // Hide loading spinner
            if (loadingSpinner) {
                loadingSpinner.style.display = 'none';
            }
            
            // Show no suppliers message
            const noSuppliers = document.getElementById('noSuppliers');
            if (noSuppliers) {
                noSuppliers.style.display = 'block';
            }
            return;
        }
        
        // Update the UI
        filteredSuppliers = [...suppliers];
        displaySuppliers(filteredSuppliers);
        updateStats();
        setupEventListeners();
        
    } catch (error) {
        console.error('Error:', error);
        // Hide loading spinner
        const loadingSpinner = document.getElementById('loadingSpinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        
        // Show error message
        const noSuppliers = document.getElementById('noSuppliers');
        if (noSuppliers) {
            noSuppliers.style.display = 'block';
        }
    }
}

function setupEventListeners() {
    // Sort buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            sortAndDisplaySuppliers();
        });
    });

    // Filter inputs
    const distanceFilter = document.getElementById('distanceFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (distanceFilter) {
        distanceFilter.addEventListener('input', function() {
            const distanceValue = document.getElementById('distanceValue');
            if (distanceValue) {
                distanceValue.textContent = this.value;
            }
        filterSuppliers();
    });
    }

    if (priceFilter) {
        priceFilter.addEventListener('input', function() {
            const priceValue = document.getElementById('priceValue');
            if (priceValue) {
                priceValue.textContent = this.value;
            }
            filterSuppliers();
        });
    }
}

function filterSuppliers() {
    const distanceFilter = document.getElementById('distanceFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (!distanceFilter || !priceFilter) return;

    const maxDistance = parseInt(distanceFilter.value);
    const maxPrice = parseInt(priceFilter.value);

    filteredSuppliers = suppliers.filter(supplier => 
        supplier.distance <= maxDistance && supplier.price <= maxPrice
    );

    console.log('Filtered suppliers:', filteredSuppliers.length);
    sortAndDisplaySuppliers();
}

function sortAndDisplaySuppliers() {
    const sortedSuppliers = [...filteredSuppliers].sort((a, b) => {
        switch(currentSort) {
            case 'distance':
                return a.distance - b.distance;
            case 'price':
                return a.price - b.price;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    displaySuppliers(sortedSuppliers);
}

function displaySuppliers(suppliersList) {
    const container = document.getElementById('suppliersContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const noSuppliers = document.getElementById('noSuppliers');

    if (!container) {
        console.error('Suppliers container not found');
        return;
    }

    // Show loading
    if (loadingSpinner) {
    loadingSpinner.style.display = 'block';
    }
    container.innerHTML = '';

    setTimeout(() => {
        if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
        }

        if (suppliersList.length === 0) {
            if (noSuppliers) {
            noSuppliers.style.display = 'block';
            }
            return;
        }

        if (noSuppliers) {
        noSuppliers.style.display = 'none';
        }

        console.log('Displaying', suppliersList.length, 'suppliers');
        suppliersList.forEach((supplier, index) => {
            const supplierCard = createSupplierCard(supplier, index);
            container.appendChild(supplierCard);
        });
    }, 500);
}

function createSupplierCard(supplier, index) {
    const card = document.createElement('div');
    card.className = 'supplier-card fade-in-up';
    card.style.animationDelay = `${index * 0.1}s`;

    const stars = '★'.repeat(Math.floor(supplier.rating)) + '☆'.repeat(5 - Math.floor(supplier.rating));

    card.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-2 col-sm-3 mb-3 mb-sm-0">
                <img src="${supplier.avatar}" alt="${supplier.name}" class="supplier-avatar">
            </div>
            <div class="col-md-7 col-sm-6">
                <h5 class="mb-1">${supplier.name}</h5>
                <p class="text-muted mb-2">${supplier.business}</p>
                <div class="d-flex align-items-center gap-3 mb-2">
                    <span class="rating-stars">${stars}</span>
                    <span class="text-muted">${supplier.rating} (${supplier.reviews} reviews)</span>
                </div>
                <p class="mb-2">${supplier.description}</p>
                <div class="d-flex gap-2 flex-wrap">
                    <span class="badge bg-light text-dark">
                        <i class="fas fa-map-marker-alt me-1"></i>${supplier.location}
                    </span>
                    <span class="badge bg-light text-dark">
                        <i class="fas fa-clock me-1"></i>${supplier.deliveryTime}
                    </span>
                    <span class="badge bg-light text-dark">
                        <i class="fas fa-box me-1"></i>Min: ${supplier.minOrder}kg
                    </span>
                </div>
            </div>
            <div class="col-md-3 col-sm-3 text-md-end">
                <div class="price-badge mb-2">₹${supplier.price}/kg</div>
                <div class="distance-badge mb-3">${supplier.distance} km</div>
                <div class="d-flex flex-column gap-2">
                    <button class="contact-btn" onclick="contactSupplier(${supplier.id})">
                        <i class="fas fa-phone me-2"></i>Call
                    </button>
                    <button class="contact-btn" onclick="emailSupplier(${supplier.id})">
                        <i class="fas fa-envelope me-2"></i>Email
                    </button>
                </div>
            </div>
        </div>
    `;

    return card;
}

function updateStats() {
    const totalSuppliers = suppliers.length;
    const avgPrice = Math.round(suppliers.reduce((sum, s) => sum + s.price, 0) / suppliers.length);
    const nearestDistance = Math.min(...suppliers.map(s => s.distance));
    const avgRating = (suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length).toFixed(1);

    const totalSuppliersEl = document.getElementById('totalSuppliers');
    const avgPriceEl = document.getElementById('avgPrice');
    const nearestDistanceEl = document.getElementById('nearestDistance');
    const avgRatingEl = document.getElementById('avgRating');

    if (totalSuppliersEl) totalSuppliersEl.textContent = totalSuppliers;
    if (avgPriceEl) avgPriceEl.textContent = `₹${avgPrice}`;
    if (nearestDistanceEl) nearestDistanceEl.textContent = nearestDistance;
    if (avgRatingEl) avgRatingEl.textContent = avgRating;
}

function contactSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        alert(`Calling ${supplier.name} at ${supplier.phone}`);
    }
}

function emailSupplier(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        window.open(`mailto:${supplier.email}?subject=Inquiry about Tomatoes&body=Hi ${supplier.name}, I'm interested in your tomatoes. Please provide more details.`);
    }
}

// URL parameter handling for ingredient name
function getIngredientFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const ingredient = urlParams.get('ingredient') || 'Fresh Tomatoes';
    const ingredientNameEl = document.getElementById('ingredientName');
    if (ingredientNameEl) {
        ingredientNameEl.textContent = ingredient;
    }
    document.title = `${ingredient} Suppliers | VendorConnect`;
}