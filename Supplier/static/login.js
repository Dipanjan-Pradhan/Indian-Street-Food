// Toggle between login and signup
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleBtn = document.getElementById('toggleBtn');
const toggleText = document.getElementById('toggleText');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const formMessage = document.getElementById('formMessage');
let isSignup = false;
toggleBtn.addEventListener('click', () => {
    isSignup = !isSignup;
    if (isSignup) {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        formTitle.textContent = 'Supplier Sign Up';
        formSubtitle.textContent = 'Create your account to get started.';
        toggleText.textContent = 'Already have an account?';
        toggleBtn.textContent = 'Login';
    } else {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        formTitle.textContent = 'Supplier Login';
        formSubtitle.textContent = 'Welcome back! Please login to continue.';
        toggleText.textContent = "Don't have an account?";
        toggleBtn.textContent = 'Sign Up';
    }
    formMessage.classList.add('hidden');
});

// Add form submission handlers for login and signup
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const res = await fetch('/api/supplier/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            window.location.href = '/Supplier/welcome.html';
        } else {
            formMessage.textContent = data.error || 'Login failed';
            formMessage.classList.remove('hidden');
        }
    } catch (err) {
        formMessage.textContent = 'Network error';
        formMessage.classList.remove('hidden');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const password2 = document.getElementById('signup-password2').value;
    if (password !== password2) {
        formMessage.textContent = 'Passwords do not match';
        formMessage.classList.remove('hidden');
        return;
    }
    try {
        const res = await fetch('/api/supplier/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            formMessage.textContent = 'Sign up successful! Please login.';
            formMessage.classList.remove('hidden');
            setTimeout(() => {
                toggleBtn.click();
            }, 1000);
        } else {
            formMessage.textContent = data.error || 'Sign up failed';
            formMessage.classList.remove('hidden');
        }
    } catch (err) {
        formMessage.textContent = 'Network error';
        formMessage.classList.remove('hidden');
    }
});