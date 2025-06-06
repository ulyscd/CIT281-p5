const { Character, CombatSystem } = require('./p5-class');

let ch1 = new Character(0, "Opponent", 30, 5, 3, 100, 10, false);
let ch2 = new Character(1, "Hero", 35, 6, 2, 70, 5, true);
let game = new CombatSystem(ch1, ch2);

function getGameState() {
    return {
        p1: ch1,
        p2: ch2,
        turns: game.turns,
        status: game.status
    };
}

function playerAction(action) {
    const result = game.doTurn(ch2, ch1, action);
    return {
        result,
        turn: game.turns,
        status: game.status,
        p1: ch1,
        p2: ch2
    };
}

function cpuAction() {
    const op = Math.random() > 0.5 && ch1.hp < ch1.hpOrigin / 2 ? 'heal' : 'atk';
    const result = game.doTurn(ch1, ch2, op);
    return {
        result,
        turn: game.turns,
        status: game.status,
        p1: ch1,
        p2: ch2
    };
}

function resetGame() {
    ch1 = new Character(0, "Opponent", 30, 5, 3, 100, 10, false);
    ch2 = new Character(1, "Hero", 35, 6, 2, 70, 5, true);
    game = new CombatSystem(ch1, ch2);
}

module.exports = {
    getGameState,
    playerAction,
    cpuAction,
    resetGame
};