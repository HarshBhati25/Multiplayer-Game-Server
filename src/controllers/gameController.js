class GameController {
    constructor(gameService, authService, matchmakingService) {
        this.gameService = gameService;
        this.authService = authService;
        this.matchmakingService = matchmakingService;
    }

    async authenticatePlayer(req, res) {
        try {
            const { username, password } = req.body;
            const player = await this.authService.login(username, password);
            res.status(200).json(player);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async updateGameState(req, res) {
        try {
            const { gameId, state } = req.body;
            const updatedGame = await this.gameService.updateGameState(gameId, state);
            res.status(200).json(updatedGame);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async trackPlayerStats(req, res) {
        try {
            const { playerId, stats } = req.body;
            const updatedStats = await this.gameService.trackStats(playerId, stats);
            res.status(200).json(updatedStats);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async findMatch(req, res) {
        try {
            const playerId = req.body.playerId;
            const match = await this.matchmakingService.findMatch(playerId);
            res.status(200).json(match);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default GameController;