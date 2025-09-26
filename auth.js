// Tab switching
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

loginTab.onclick = function() {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = '';
    registerForm.style.display = 'none';
    authMessage.textContent = '';
};
registerTab.onclick = function() {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = '';
    loginForm.style.display = 'none';
    authMessage.textContent = '';
};

// Show/hide password
Array.from(document.querySelectorAll('.toggle-password')).forEach(el => {
    el.onclick = function() {
        const target = document.getElementById(el.getAttribute('data-target'));
        if (target.type === 'password') {
            target.type = 'text';
            el.textContent = '🙈';
        } else {
            target.type = 'password';
            el.textContent = '👁️';
        }
    };
});

// Mock login/register
loginForm.onsubmit = function(e) {
    e.preventDefault();
    // For demo, any username/password works
    window.location.href = 'index.html';
};
registerForm.onsubmit = function(e) {
    e.preventDefault();
    authMessage.textContent = 'Registration successful! You can now log in.';
    setTimeout(() => {
        loginTab.click();
    }, 1200);
};

document.getElementById('googleLoginBtn').onclick = function() {
    // Mock Google login
    authMessage.textContent = 'Logging in with Google...';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}; 