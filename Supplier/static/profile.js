document.getElementById('avatarInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatarPreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Form submission
document.getElementById('profileForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Gather form data
    const data = {
        fullName: document.getElementById('fullName').value,
        shopName: document.getElementById('shopName').value,
        gstin: document.getElementById('gstin').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        businessType: document.getElementById('businessType').value,
        location: document.getElementById('location').value,
        experience: document.getElementById('experience').value,
        specialization: document.getElementById('specialization').value
    };
    // Send to backend
    try {
        const res = await fetch('/api/supplier', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (res.ok) {
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        } else {
            let msg = document.createElement('div');
            msg.textContent = 'Failed to update profile.';
            msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            document.body.appendChild(msg);
            setTimeout(() => msg.remove(), 3000);
        }
    } catch (err) {
        let msg = document.createElement('div');
        msg.textContent = 'Error updating profile.';
        msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }
});

// Reset functionality
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('profileForm').reset();
    document.getElementById('avatarPreview').src = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face';
});

// Add some interactivity to form fields
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('scale-105');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('scale-105');
    });
});

// Fetch and populate profile data on page load
window.addEventListener('DOMContentLoaded', async function() {
    const supplierId = window.currentSupplierId || 'currentSupplierId'; // Replace with real logic
    try {
        const res = await fetch(`/api/supplier/${supplierId}`);
        if (res.ok) {
            const data = await res.json();
            document.getElementById('fullName').value = data.fullName || '';
            document.getElementById('shopName').value = data.shopName || '';
            document.getElementById('gstin').value = data.gstin || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('businessType').value = data.businessType || '';
            document.getElementById('location').value = data.location || '';
            document.getElementById('experience').value = data.experience || '';
            document.getElementById('specialization').value = data.specialization || '';
            if (data.avatarUrl) {
                document.getElementById('avatarPreview').src = data.avatarUrl;
            }
        }
    } catch (err) {
        // Optionally show an error message
    }
});