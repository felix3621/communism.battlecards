const db = require("../database.cjs")

class game {
    constructor(p1, p2, turnTime, startEnergy) {
        this.p1 = p1;
        this.p2 = p2;
        this.turnTime = turnTime;
        this.maxEnergy = startEnergy;
    }
}
class card {
    constructor(name, description, cost, attackDMG, health, texture) {
        this.name = name;
        this.description = description;
        this.cost = cost;
        this.attackDMG = attackDMG;
        this.health = health;
        this.texture = texture;
    }
}
class stone {
    constructor(attackDMG, health, texture) {
        this.attackDMG = attackDMG;
        this.health = health;
        this.texture = texture;
    }
}
class avatar {
    constructor(attackDMG, health, texture, atkCost) {
        this.attackDMG = attackDMG;
        this.health = health;
        this.texture = texture;
        this.atkCost = atkCost;
    }
}
class player {
    constructor(username, energy, playerInfo, avatar) {
        this.username = username;
        
        this.energy = energy;
        this.hand = new Array();
        this.field = new Array();

        //Get from database: displayName, deck
        this.displayName = playerInfo.displayName;
        this.deck = playerInfo.deck;
        this.avatar = avatar;
    }
    drawCards(amount, maxEnergy) {
        var DrawableCards = new Array();
        for (let i = 0; i < this.deck.length; i++) { // Get all cards from deck that has the same or les cost as MaxEnergy this turn
            if (this.deck[i].cost <= maxEnergy) {
                DrawableCards.push(this.deck[i]);  
            }
        }
        for (let i = 0; i < amount; i++) {
            this.hand.push(DrawableCards[Math.floor(Math.random() * DrawableCards.length)]); //Get a random Card in Drawable Cards
        }
    }
}