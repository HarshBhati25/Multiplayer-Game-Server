const express = require('express');
const GameController = require('../controllers/gameController');

const router = express.Router();
const gameController = new GameController();

function setRoutes(app) {
    router.post('/login', gameController.login);
    router.post('/register', gameController.register);
    router.get('/matchmake', gameController.matchmake);
    router.post('/game/update', gameController.updateGame);
    router.get('/player/stats/:id', gameController.getPlayerStats);

    app.use('/api/game', router);
}

module.exports = setRoutes;