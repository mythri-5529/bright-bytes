// WebSocket/Socket.io connection
// This file includes Socket.io client library and connection setup

// Socket.io will be loaded from the server at /socket.io/socket.io.js
// This is automatically provided by Flask-SocketIO

let socket;

function initSocketIO() {
    // Connect to Socket.io server
    socket = io({
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
    });

    // Connection events
    socket.on('connect', () => {
        console.log('Connected to server');
        emit('status', 'Connected to WebSocket');
    });

    socket.on('response', (data) => {
        console.log('Server response:', data);
    });

    socket.on('new_comment', (comment) => {
        console.log('New comment:', comment);
        // Emit custom event for UI updates
        window.dispatchEvent(new CustomEvent('newComment', { detail: comment }));
    });

    socket.on('status', (data) => {
        console.log('Status:', data);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
}

function joinItemRoom(itemId) {
    if (socket) {
        socket.emit('join_item', { item_id: itemId });
    }
}

function leaveItemRoom(itemId) {
    if (socket) {
        socket.emit('leave_item', { item_id: itemId });
    }
}

// Initialize on page load if socket.io is available
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSocketIO);
} else {
    // If DOM is already loaded
    setTimeout(initSocketIO, 100);
}
