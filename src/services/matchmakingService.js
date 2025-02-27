const matchmakingQueue = [];
const games = [];

function addToQueue(player) {
    matchmakingQueue.push(player);
    matchPlayers();
}

function matchPlayers() {
    if (matchmakingQueue.length >= 2) {
        const player1 = matchmakingQueue.shift();
        const player2 = matchmakingQueue.shift();
        const gameId = createGame(player1, player2);
        console.log(`Matched players ${player1.username} and ${player2.username} in game ${gameId}`);
    }
}

function createGame(player1, player2) {
    const gameId = games.length + 1; // Simple game ID generation
    games.push({
        id: gameId,
        players: [player1, player2],
        state: 'waiting', // Initial state
    });
    return gameId;
}

function getGameById(gameId) {
    return games.find(game => game.id === gameId);
}

function updateGameState(gameId, newState) {
    const game = getGameById(gameId);
    if (game) {
        game.state = newState;
    }
}

module.exports = {
    addToQueue,
    getGameById,
    updateGameState,
};