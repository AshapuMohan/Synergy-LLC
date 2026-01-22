document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const messageContainer = document.getElementById('messageContainer');
    const togglePasswordBtn = document.querySelector('.toggle-password');

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = togglePasswordBtn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    const VALID_USER = 'user';
    const VALID_PASS = 'password';

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleLogin();
        });
    }

    function handleLogin() {
        messageContainer.className = 'message-container';
        messageContainer.innerText = '';

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username && !password) {
            showMessage('Please enter your username and password.', 'error');
            return;
        }

        if (!username) {
            showMessage('Please enter your username.', 'error');
            return;
        }

        if (!password) {
            showMessage('Please enter your password.', 'error');
            return;
        }

        const originalBtnText = loginBtn.innerText;
        loginBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Logging In...';
        loginBtn.disabled = true;

        setTimeout(() => {
            if (username === VALID_USER && password === VALID_PASS) {
                showMessage('Login Successful! Redirecting...', 'success');
                setTimeout(() => {
                    // Redirect logic here
                }, 1000);
            } else {
                showMessage('Invalid username or password.', 'error');
            }
            loginBtn.innerText = originalBtnText;
            loginBtn.disabled = false;
        }, 1500);
    }

    function showMessage(msg, type) {
        if (type === 'error') {
            messageContainer.innerHTML = `<span class="error-icon-hexagon"><i>!</i></span> ${msg}`;
        } else {
            messageContainer.innerText = msg;
        }
        messageContainer.className = `message-container message-${type}`;
    }

    const supportIcon = document.querySelector('.support-icon');
    const modal = document.getElementById('supportModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (supportIcon && modal) {
        supportIcon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
