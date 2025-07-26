 // Sample supplier data
 const suppliers = [
    {
        id: 1,
        name: "Anita Patel",
        business: "Anita Fresh Groceries",
        avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face",
        price: 42,
        distance: 2.1,
        rating: 4.5,
        reviews: 127,
        location: "Ahmedabad Central Market",
        phone: "+91 98765 43210",
        email: "anita@freshgroceries.com",
        description: "Fresh, organic tomatoes sourced directly from local farms. Daily delivery available.",
        minOrder: 10,
        deliveryTime: "2-4 hours"
    },
    {
        id: 2,
        name: "Sundar Kumar",
        business: "Sundar Fresh Farm",
        avatar: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9?w=100&h=100&fit=crop&crop=face",
        price: 38,
        distance: 3.8,
        rating: 4.8,
        reviews: 89,
        location: "Madurai Vegetable Hub",
        phone: "+91 98765 43211",
        email: "sundar@freshfarm.com",
        description: "Premium quality tomatoes with guaranteed freshness. Bulk orders welcome.",
        minOrder: 5,
        deliveryTime: "1-3 hours"
    },
    {
        id: 3,
        name: "Fatima Sheikh",
        business: "Fatima Spice Supply",
        avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=100&h=100&fit=crop&crop=face",
        price: 45,
        distance: 1.5,
        rating: 4.2,
        reviews: 203,
        location: "Hyderabad Spice Market",
        phone: "+91 98765 43212",
        email: "fatima@spicesupply.com",
        description: "Fresh tomatoes and complete spice solutions for street food vendors.",
        minOrder: 15,
        deliveryTime: "3-5 hours"
    },
    {
        id: 4,
        name: "Rajesh Verma",
        business: "Verma Organic Farms",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        price: 52,
        distance: 5.2,
        rating: 4.7,
        reviews: 156,
        location: "Pune Organic Hub",
        phone: "+91 98765 43213",
        email: "rajesh@organicfarms.com",
        description: "100% organic tomatoes grown without pesticides. Premium quality guaranteed.",
        minOrder: 20,
        deliveryTime: "4-6 hours"
    },
    {
        id: 5,
        name: "Priya Sharma",
        business: "Priya's Fresh Corner",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        price: 40,
        distance: 4.1,
        rating: 4.3,
        reviews: 94,
        location: "Delhi Fresh Market",
        phone: "+91 98765 43214",
        email: "priya@freshcorner.com",
        description: "Daily fresh tomatoes with competitive pricing. Regular customer discounts.",
        minOrder: 8,
        deliveryTime: "2-4 hours"
    },
    {
        id: 6,
        name: "Mohammed Ali",
        business: "Ali's Vegetable World",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        price: 35,
        distance: 6.8,
        rating: 4.0,
        reviews: 67,
        location: "Mumbai Vegetable Market",
        phone: "+91 98765 43215",
        email: "ali@vegetableworld.com",
        description: "Wholesale tomatoes at best prices. Perfect for large orders.",
        minOrder: 25,
        deliveryTime: "5-7 hours"
    }
];

let currentSort = 'distance';
let filteredSuppliers = [...suppliers];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displaySuppliers(filteredSuppliers);
    updateStats();
    setupEventListeners();
});

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
    document.getElementById('distanceFilter').addEventListener('input', function() {
        document.getElementById('distanceValue').textContent = this.value;
        filterSuppliers();
    });

    document.getElementById('priceFilter').addEventListener('input', function() {
        document.getElementById('priceValue').textContent = this.value;
        filterSuppliers();
    });
}

function filterSuppliers() {
    const maxDistance = parseInt(document.getElementById('distanceFilter').value);
    const maxPrice = parseInt(document.getElementById('priceFilter').value);

    filteredSuppliers = suppliers.filter(supplier => 
        supplier.distance <= maxDistance && supplier.price <= maxPrice
    );

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

    // Show loading
    loadingSpinner.style.display = 'block';
    container.innerHTML = '';

    setTimeout(() => {
        loadingSpinner.style.display = 'none';

        if (suppliersList.length === 0) {
            noSuppliers.style.display = 'block';
            return;
        }

        noSuppliers.style.display = 'none';

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

    document.getElementById('totalSuppliers').textContent = totalSuppliers;
    document.getElementById('avgPrice').textContent = `₹${avgPrice}`;
    document.getElementById('nearestDistance').textContent = nearestDistance;
    document.getElementById('avgRating').textContent = avgRating;
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
    document.getElementById('ingredientName').textContent = ingredient;
    document.title = `${ingredient} Suppliers | VendorConnect`;
}

// Initialize with URL parameter
getIngredientFromURL();