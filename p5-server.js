const express = require('express');
const path = require('path');
const { getGameState, playerAction, cpuAction, resetGame } = require('./p5-game');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/state', (req, res) => {
    resetGame();
    res.json(getGameState());
});

app.get('/api/cpu', (req, res) => {
    res.json(cpuAction());
});

app.post('/api/action', (req, res) => {
    const { action } = req.body;
    if (!["atk", "def", "heal"].includes(action)) {
        return res.status(400).json({ error: "Invalid action" });
    }
    res.json(playerAction(action));
});

app.post('/api/reset', (req, res) => {
    resetGame();
    res.json({ message: "Game reset." });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});