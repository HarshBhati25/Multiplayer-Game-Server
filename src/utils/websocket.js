const WebSocket = require('ws');

let clients = {};

const setupWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const playerId = req.url.split('/').pop();
        clients[playerId] = ws;

        ws.on('message', (message) => {
            handleMessage(playerId, message);
        });

        ws.on('close', () => {
            delete clients[playerId];
        });
    });
};

const handleMessage = (playerId, message) => {
    const parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
        case 'gameUpdate':
            broadcastGameUpdate(parsedMessage.data);
            break;
        case 'playerAction':
            handlePlayerAction(playerId, parsedMessage.data);
            break;
        default:
            console.error('Unknown message type:', parsedMessage.type);
    }
};

const broadcastGameUpdate = (data) => {
    Object.values(clients).forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'gameUpdate', data }));
        }
    });
};

const handlePlayerAction = (playerId, action) => {
    // Logic to handle player actions and update game state
    console.log(`Player ${playerId} performed action:`, action);
};

module.exports = {
    setupWebSocketServer
};