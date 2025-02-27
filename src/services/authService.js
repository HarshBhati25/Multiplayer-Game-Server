const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Player = require('../models/player');

const authService = {
    register: async (username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPlayer = new Player({ username, password: hashedPassword });
        return newPlayer.save();
    },

    login: async (username, password) => {
        const player = await Player.findOne({ username });
        if (!player) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, player.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: player._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, player };
    },

    authenticate: (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).send('Token is required');
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            }
            req.playerId = decoded.id;
            next();
        });
    }
};

module.exports = authService;