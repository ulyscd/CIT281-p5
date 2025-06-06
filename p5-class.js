class Character {
    constructor(id, name, hp, atk, def, mana, sp, isPlayer) {
        this.id = id;
        this.name = name;
        this.hp = hp;
        this.hpOrigin = hp;
        this.atk = atk;
        this.atkOrigin = atk;
        this.def = def;
        this.defOrigin = def;
        this.mana = mana;
        this.manaOrigin = mana;
        this.sp = sp;
        this.spOrigin = sp;
        this.isPlayer = isPlayer;
    }

    attack(target) {
        const isCrit = Math.random() < 0.2;
        const baseDamage = Math.round(this.atk * (1 + Math.random()));
        const damage = Math.max(0, Math.floor((isCrit ? baseDamage * 1.5 : baseDamage) - target.def));
        target.hp = Math.max(0, target.hp - damage);
        return {
            type: 'attack',
            attacker: this.name,
            target: target.name,
            damage,
            critical: isCrit
        };
    }

    defend() {
        this.def = this.defOrigin * 2;
        return { type: 'defend', defender: this.name };
    }

    heal() {
        if (this.mana < 30) return { type: 'fail', reason: 'Not enough mana' };
        const healAmount = Math.min(30, this.hpOrigin - this.hp);
        this.hp += healAmount;
        this.mana -= 30;
        return { type: 'heal', target: this.name, amount: healAmount };
    }

    resetDef() {
        this.def = this.defOrigin;
    }
}

class CombatSystem {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.turns = 0;
        this.status = 1;
    }

    doTurn(attacker, defender, action) {
        let result;
        if (action === "atk") result = attacker.attack(defender);
        else if (action === "def") result = attacker.defend();
        else if (action === "heal") result = attacker.heal();

        this.p1.resetDef();
        this.p2.resetDef();

        this.turns++;
        if (this.p1.hp <= 0 || this.p2.hp <= 0) {
            this.status = 0;
            result.outcome = `${this.p1.hp <= 0 ? this.p2.name : this.p1.name} wins!`;
        }

        return { turn: this.turns, result, status: this.status };
    }
}

module.exports = { Character, CombatSystem };