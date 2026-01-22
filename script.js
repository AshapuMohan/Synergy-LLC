document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const messageContainer = document.getElementById('messageContainer');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const supportIcon = document.querySelector('.support-icon');
    const modal = document.getElementById('supportModal');
    const closeModalBtn = document.getElementById('closeModal');

    const CONFIG = {
        mockUser: 'user',
        mockPass: 'password',
        redirectDelay: 1000,
        loginDelay: 1500
    };

    const togglePasswordVisibility = () => {
        if (!passwordInput || !togglePasswordBtn) return;

        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

        const icon = togglePasswordBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        }
    };

    const displayMessage = (message, type = 'info') => {
        messageContainer.className = `message-container message-${type}`;

        if (type === 'error') {
            messageContainer.innerHTML = `<span class="error-icon-hexagon"><i>!</i></span> ${message}`;
        } else {
            messageContainer.innerText = message;
        }
    };

    const performLogin = () => {
        return new Promise(resolve => setTimeout(resolve, CONFIG.loginDelay));
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        displayMessage(' ', 'reset');

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (!username || !password) {
            let errorMsg = 'Please enter your username and password.';
            if (!username && password) errorMsg = 'Please enter your username.';
            if (username && !password) errorMsg = 'Please enter your password.';

            displayMessage(errorMsg, 'error');
            return;
        }

        const originalBtnText = loginBtn.innerText;
        loginBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Logging In...';
        loginBtn.disabled = true;

        try {
            await performLogin();

            if (username === CONFIG.mockUser && password === CONFIG.mockPass) {
                displayMessage('Login Successful! Redirecting...', 'success');
                setTimeout(() => {
                    console.log('Redirecting to dashboard...');
                }, CONFIG.redirectDelay);
            } else {
                displayMessage('Invalid username or password.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            displayMessage('An unexpected error occurred.', 'error');
        } finally {
            if (loginBtn.disabled && messageContainer.className.includes('error')) {
                loginBtn.innerText = originalBtnText;
                loginBtn.disabled = false;
            }
        }
    };

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', onLoginSubmit);
    }

    if (supportIcon && modal) {
        supportIcon.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
        });
    }

    if (closeModalBtn && modal) {
        closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
