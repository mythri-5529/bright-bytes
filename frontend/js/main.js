// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const healthBtn = document.getElementById('healthBtn');
const healthStatus = document.getElementById('healthStatus');
const loadItemsBtn = document.getElementById('loadItemsBtn');
const itemsList = document.getElementById('itemsList');
const itemForm = document.getElementById('itemForm');

// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link and corresponding section
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Health Check
healthBtn.addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        
        showStatus(healthStatus, true, `✓ ${data.message}`);
    } catch (error) {
        showStatus(healthStatus, false, `✗ Failed to reach API: ${error.message}`);
    }
});

// Load Items
loadItemsBtn.addEventListener('click', async () => {
    try {
        loadItemsBtn.disabled = true;
        loadItemsBtn.textContent = 'Loading...';
        
        const response = await fetch(`${API_BASE_URL}/data`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        itemsList.innerHTML = '';
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                const itemCard = createItemCard(item);
                itemsList.appendChild(itemCard);
            });
        } else {
            itemsList.innerHTML = '<p class="placeholder">No items found</p>';
        }
    } catch (error) {
        itemsList.innerHTML = `<p class="placeholder error">Error loading items: ${error.message}</p>`;
    } finally {
        loadItemsBtn.disabled = false;
        loadItemsBtn.textContent = 'Load Items';
    }
});

// Create Item
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('itemTitle').value;
    const description = document.getElementById('itemDescription').value;
    
    try {
        const response = await fetch(`${API_BASE_URL}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newItem = await response.json();
        
        // Clear form
        itemForm.reset();
        
        // Show success message (you could add a toast notification here)
        alert(`Item "${title}" created successfully!`);
        
        // Reload items list
        loadItemsBtn.click();
    } catch (error) {
        alert(`Error creating item: ${error.message}`);
    }
});

// Helper function to create item card
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h4>${escapeHtml(item.title)}</h4>
        <p>${escapeHtml(item.description)}</p>
    `;
    return card;
}

// Helper function to show status message
function showStatus(element, isSuccess, message) {
    element.textContent = message;
    element.className = 'status-message';
    element.classList.add(isSuccess ? 'success' : 'error');
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize - set home as active section
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bright Bytes app loaded!');
});
