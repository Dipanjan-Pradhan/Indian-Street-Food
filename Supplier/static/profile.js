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
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('hidden');
    
    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 3000);
    
    // Here you would typically send the data to your backend
    console.log('Profile updated:', {
        fullName: document.getElementById('fullName').value,
        shopName: document.getElementById('shopName').value,
        gstin: document.getElementById('gstin').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        businessType: document.getElementById('businessType').value,
        location: document.getElementById('location').value,
        experience: document.getElementById('experience').value,
        specialization: document.getElementById('specialization').value
    });
});

// Reset functionality
document.getElementById('resetBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all changes?')) {
        document.getElementById('profileForm').reset();
        document.getElementById('avatarPreview').src = 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face';
    }
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