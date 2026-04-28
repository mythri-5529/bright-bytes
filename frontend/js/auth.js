// Authentication JavaScript

const API_BASE_URL = 'http://localhost:5000/api';

// Check if we're on login or register page
const isLoginPage = document.getElementById('loginForm') !== null;
const isRegisterPage = document.getElementById('registerForm') !== null;

// Handle Login
if (isLoginPage) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('authError');
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Redirect to home or admin based on role
                if (data.user.is_admin) {
                    window.location.href = '/admin.html';
                } else {
                    window.location.href = '/index.html';
                }
            } else {
                showError(errorDiv, data.error);
            }
        } catch (error) {
            showError(errorDiv, `Error: ${error.message}`);
        }
    });
}

// Handle Register
if (isRegisterPage) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorDiv = document.getElementById('authError');
        
        if (password !== confirmPassword) {
            showError(errorDiv, 'Passwords do not match');
            return;
        }
        
        if (password.length < 6) {
            showError(errorDiv, 'Password must be at least 6 characters');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Redirect to login
                alert('Account created successfully! Please log in.');
                window.location.href = '/login.html';
            } else {
                showError(errorDiv, data.error);
            }
        } catch (error) {
            showError(errorDiv, `Error: ${error.message}`);
        }
    });
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
    setTimeout(() => {
        element.classList.remove('show');
    }, 5000);
}

// Get current user info
async function getCurrentUser() {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

// Logout function
async function logout() {
    try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}
