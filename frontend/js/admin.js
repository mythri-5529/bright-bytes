// Admin Dashboard JavaScript

const API_BASE_URL = 'http://localhost:5000/api';

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
        
        // Add active to clicked
        item.classList.add('active');
        const sectionId = item.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        
        // Load section data
        loadSectionData(sectionId);
    });
});

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        logout();
    }
});

// Load dashboard stats
async function loadDashboardStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/stats`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const stats = await response.json();
            document.getElementById('totalUsers').textContent = stats.total_users;
            document.getElementById('totalItems').textContent = stats.total_items;
            document.getElementById('totalComments').textContent = stats.total_comments;
            document.getElementById('totalFiles').textContent = stats.total_files;
            document.getElementById('activeUsers').textContent = stats.active_users;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load users
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const users = await response.json();
            const tbody = document.getElementById('usersTable');
            
            if (users.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No users found</td></tr>';
                return;
            }
            
            tbody.innerHTML = users.map(user => `
                <tr>
                    <td>${escapeHtml(user.username)}</td>
                    <td>${escapeHtml(user.email)}</td>
                    <td>${user.is_admin ? '<span class="badge badge-admin">Admin</span>' : 'User'}</td>
                    <td><span class="badge badge-active">Active</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="table-btn btn-toggle" onclick="toggleAdmin(${user.id})">
                                ${user.is_admin ? 'Remove Admin' : 'Make Admin'}
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

// Load items
async function loadItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/items?per_page=50`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            const data = await response.json();
            const tbody = document.getElementById('itemsTable');
            
            if (data.items.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No items found</td></tr>';
                return;
            }
            
            tbody.innerHTML = data.items.map(item => `
                <tr>
                    <td>${escapeHtml(item.title)}</td>
                    <td>${escapeHtml(item.owner_username)}</td>
                    <td>${escapeHtml(item.category)}</td>
                    <td><span class="badge badge-active">${item.status}</span></td>
                    <td>${item.views}</td>
                    <td>${new Date(item.created_at).toLocaleDateString()}</td>
                    <td>
                        <div class="table-actions">
                            <button class="table-btn btn-delete" onclick="deleteItem(${item.id})">Delete</button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading items:', error);
    }
}

// Toggle admin status
async function toggleAdmin(userId) {
    if (!confirm('Change admin status for this user?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/toggle-admin`, {
            method: 'PUT',
            credentials: 'include'
        });
        
        if (response.ok) {
            loadUsers();
            alert('Admin status updated');
        }
    } catch (error) {
        console.error('Error toggling admin:', error);
    }
}

// Delete item
async function deleteItem(itemId) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (response.ok) {
            loadItems();
            alert('Item deleted');
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Load section data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboardStats();
            break;
        case 'users':
            loadUsers();
            break;
        case 'items':
            loadItems();
            break;
        case 'files':
            loadFiles();
            break;
    }
}

// Placeholder for files loading
async function loadFiles() {
    console.log('Loading files...');
}

// Helper: Escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Check authorization and load dashboard
window.addEventListener('DOMContentLoaded', async () => {
    const user = await getCurrentUser();
    
    if (!user || !user.is_admin) {
        window.location.href = '/index.html';
        return;
    }
    
    loadDashboardStats();
});
