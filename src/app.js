const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const gameRoutes = require('./routes/gameRoutes');
const { setupWebSocket } = require('./utils/websocket');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api', gameRoutes());

// WebSocket setup
setupWebSocket(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});