// Ensure the user ID is available from localStorage if not set
window.currentUserId = window.currentUserId || localStorage.getItem('currentUserId');

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
    const userId = window.currentUserId || localStorage.getItem('currentUserId');
    if (!userId) {
        alert('User ID not found. Please log in again.');
        window.location.href = '/Supplier/login.html';
        return;
    }
    
    // Prepare user data (name, email, phone)
    const userData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };
    
    try {
        // First, update user data
        const userRes = await fetch(`/api/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        if (!userRes.ok) {
            throw new Error('Failed to update user data');
        }
        
        // First, find the supplier by user ID
        const findSupplierRes = await fetch(`/api/supplier?userId=${userId}`);
        let supplierId;
        
        if (findSupplierRes.ok) {
            const suppliers = await findSupplierRes.json();
            if (suppliers && suppliers.length > 0) {
                supplierId = suppliers[0]._id;
            }
        }
        
        // Create FormData for supplier data with image
        const formData = new FormData();
        formData.append('shopname', document.getElementById('shopName').value);
        formData.append('gstin', document.getElementById('gstin').value);
        formData.append('buisnesstype', document.getElementById('businessType').value);
        formData.append('location', document.getElementById('location').value);
        formData.append('experience', document.getElementById('experience').value);
        formData.append('specialization', document.getElementById('specialization').value);
        formData.append('user', userId);
        
        // Add image file if one is selected
        const avatarInput = document.getElementById('avatarInput');
        if (avatarInput.files.length > 0) {
            formData.append('image', avatarInput.files[0]);
        }
        
        let supplierRes;
        
        if (supplierId) {
            // If supplier exists, update it
            supplierRes = await fetch(`/api/supplier/${supplierId}`, {
                method: 'PUT',
                body: formData // No Content-Type header for FormData
            });
        } else {
            // If supplier doesn't exist, create it
            supplierRes = await fetch('/api/supplier', {
                method: 'POST',
                body: formData // No Content-Type header for FormData
            });
        }
        
        if (supplierRes.ok) {
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('hidden');
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        } else {
            throw new Error('Failed to update supplier data');
        }
    } catch (err) {
        console.error('Error updating profile:', err);
        let msg = document.createElement('div');
        msg.textContent = 'Failed to update profile: ' + err.message;
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
    const userId = window.currentUserId || localStorage.getItem('currentUserId');
    if (!userId) {
        console.warn('No user ID found');
        return;
    }
    
    try {
        // Fetch user data (name, email, phone)
        const userRes = await fetch(`/api/user/${userId}`);
        if (userRes.ok) {
            const userData = await userRes.json();
            document.getElementById('fullName').value = userData.name || '';
            document.getElementById('phone').value = userData.phone || '';
            document.getElementById('email').value = userData.email || '';
        }
        
        // Find supplier by user ID
        const findSupplierRes = await fetch(`/api/supplier?userId=${userId}`);
        if (findSupplierRes.ok) {
            const suppliers = await findSupplierRes.json();
            if (suppliers && suppliers.length > 0) {
                const supplierData = suppliers[0];
                document.getElementById('shopName').value = supplierData.shopname || '';
                document.getElementById('gstin').value = supplierData.gstin || '';
                document.getElementById('businessType').value = supplierData.buisnesstype || '';
                document.getElementById('location').value = supplierData.location || '';
                document.getElementById('experience').value = supplierData.experience || '';
                document.getElementById('specialization').value = supplierData.specialization || '';
                
                // Display image if available
                if (supplierData.image) {
                    document.getElementById('avatarPreview').src = `/api/supplier/${supplierData._id}/image`;
                }
            }
        }
    } catch (err) {
        console.error('Error fetching profile data:', err);
        // Optionally show an error message
    }
});