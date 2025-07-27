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