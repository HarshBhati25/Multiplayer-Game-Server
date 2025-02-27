const socket = new WebSocket('ws://localhost:3000'); // Adjust the URL as needed

socket.onopen = function() {
    console.log('Connected to the server');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    handleServerMessage(data);
};

function handleServerMessage(data) {
    switch(data.type) {
        case 'gameUpdate':
            updateGameState(data.payload);
            break;
        case 'playerStats':
            updatePlayerStats(data.payload);
            break;
        // Add more cases as needed
    }
}

function updateGameState(gameState) {
    // Logic to update the game state on the frontend
}

function updatePlayerStats(stats) {
    // Logic to update player stats on the frontend
}

function authenticatePlayer(username, password) {
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Login successful');
            // Handle successful login
        } else {
            console.error('Login failed:', data.message);
        }
    });
}

function registerPlayer(username, password) {
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Registration successful');
            // Handle successful registration
        } else {
            console.error('Registration failed:', data.message);
        }
    });
}

// Additional functions for game actions, matchmaking, etc. can be added here.