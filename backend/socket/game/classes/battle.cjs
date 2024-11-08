const logger = require("../../../modules/logger.cjs");

const data = require('../data.cjs');
const c_player = require("./player.cjs");
const utilFunc = require("../utilFunc.cjs");

class battle {
    constructor(Tournament = null) {
        this.Tournament = Tournament;
        this.active = false;
        this.gameData = {};
        this.p1 = null;
        this.p2 = null;
        this.turnTime = data.config.roundTime;
        this.maxEnergy = 4;
        this.currentPlayer = "";
        this.round = 0;
        this.DataLoaded = 0;
        this.private = false;
        this.code = null;
        this.dead = false;
        this.Projectiles = [];
    }
    SetP1(userName) {
        this.p1 = new c_player.player(userName,this,"p1");
        if (this.p1 && this.p2) {
            this.active = true;
            this.StartGame();
        }

        logger.info(`'${userName}' joined '${this.code}' as player 1`, "socket/game/classes/battle");
    }
    SetP2(userName) {
        this.p2 = new c_player.player(userName,this,"p2");
        if (this.p1 && this.p2) {
            this.active = true;
            this.StartGame();
        }

        logger.info(`'${userName}' joined '${this.code}' as player 2`, "socket/game/classes/battle");
    }
    waitForPlayerData() {
        return new Promise(resolve => {
            if (Object.is(this.DataLoaded, 2)) {
                resolve(true);
            } else {
                const checkInterval = setInterval(() => {
                    if (Object.is(this.DataLoaded, 2)) {
                        clearInterval(checkInterval);
                        return resolve(true);
                    }
                }, 100);
            }
        })
    }
    StartGame() {
        this.waitForPlayerData().then(() => {
            this.active = true;
            this.currentPlayer = "p1";
            this.DrawCardsToPlayer(this.p1,2);
            this.round = 1;

            this.p1.Energy = this.maxEnergy;
            this.p2.Energy = this.maxEnergy;

            logger.info(`'${this.code}' started; round: ${this.round}, player: '${this.p1.UserName}'`, "socket/game/classes/battle");
        });
    }
    SendInfo() {
        if (this.p1 && this.p1.Avatar) {
            let p1;
            if (this.Tournament) {
                p1 = this.Tournament.Sockets.find(obj => Object.is(obj.username, this.p1.UserName));
            } else {
                p1 = data.game.battleUsers.find(obj => Object.is(obj.username, this.p1.UserName));
            }

            if (p1 && p1.socket) {
                let rtn = {
                    PlayerInfo: {
                        DisplayName: this.p1.DisplayName,
                        Avatar: this.p1.Avatar,
                        Field: this.p1.Field,
                        Hand: this.p1.Hand,
                        Energy: this.p1.Energy,
                        Title: this.p1.title
                    },
                    TurnTime: Math.round(this.turnTime*data.config.tickSpeed),
                    MaxEnergy: this.maxEnergy,
                    round: this.round,
                    yourTurn: Object.is(this.currentPlayer, "p1")
                };
                if (this.p2) {
                    rtn.EnemyInfo = {
                        DisplayName: this.p2.DisplayName,
                        Avatar: this.p2.Avatar,
                        Field: this.p2.Field,
                        Hand: this.p2.Hand.length
                    };
                }
                if (!this.active) {
                    rtn.code = this.code;
                }
                rtn.Projectiles = [];
                for (let i = 0; i < this.Projectiles.length; i++) {
                    rtn.Projectiles.push(this.Projectiles[i]);
                }
                p1.socket.send(JSON.stringify(rtn));
            }
        }
        if (this.p2 && this.p2.Avatar){
            let p2;
            if (this.Tournament) {
                p2 = this.Tournament.Sockets.find(obj => Object.is(obj.username, this.p2.UserName));
            } else {
                p2 = data.game.battleUsers.find(obj => Object.is(obj.username, this.p2.UserName));
            }
            if (p2 && p2.socket) {
                let rtn = {
                    PlayerInfo: {
                        DisplayName: this.p2.DisplayName,
                        Avatar: this.p2.Avatar,
                        Field: this.p2.Field,
                        Hand: this.p2.Hand,
                        Energy: this.p2.Energy,
                        Title: this.p2.title
                    },
                    EnemyInfo: {
                        DisplayName: this.p1.DisplayName,
                        Avatar: this.p1.Avatar,
                        Field: this.p1.Field,
                        Hand: this.p1.Hand.length
                    },
                    TurnTime: Math.round(this.turnTime/10),
                    MaxEnergy: this.maxEnergy,
                    round: this.round,
                    yourTurn: Object.is(this.currentPlayer, "p2")
                };
                rtn.Projectiles = [];
                for (let i = 0; i < this.Projectiles.length; i++) {
                    rtn.Projectiles.push(this.Projectiles[i]);
                }
                p2.socket.send(JSON.stringify(rtn));
            }
        }
        for (let i = 0; i < this.Projectiles.length; i++) {
            this.Projectiles = [];
        }
    }
    EndTurn() {
        this.turnTime = data.config.roundTime;
        if (Object.is(this.currentPlayer, "p1")) {
            if (this.maxEnergy < 20)
                this.maxEnergy++;
            this.currentPlayer = "p2";
            this.p2.Energy = this.maxEnergy;
            this.p1.Energy = 0;
            this.DrawCardsToPlayer(this.p2,2);
            if (this.round > 1) {
                for (let i = 0; i < this.p2.Field.length; i++) {
                    if (this.p2.Field[i].attackCooldown>0) {
                        this.p2.Field[i].attackCooldown--;
                    }
                }
                this.p2.Avatar.attackCooldown = 0;
            }
        } else {
            this.currentPlayer = "p1";
            this.p1.Energy = this.maxEnergy;
            this.p2.Energy = 0;
            this.round++;
            this.DrawCardsToPlayer(this.p1,2);
            for (let i = 0; i < this.p1.Field.length; i++) {
                if (this.p1.Field[i].attackCooldown>0) {
                    this.p1.Field[i].attackCooldown--;
                }
            }
            this.p1.Avatar.attackCooldown = 0;
        }

        logger.debug(`'${this.code}': round: ${this.round}, player: ${this.p1.UserName}`, "socket/game/classes/battle");
    }
    PlayerDisconnected(userName) {
        if ((this.p1 && Object.is(this.p1.UserName, userName)) || (this.p2 && Object.is(this.p2.UserName, userName))) {
            logger.info(`'${this.code}': '${userName}' left`, "socket/game/classes/battle")
            this.EndGame(userName);
        }
    }
    Update() {
        if (this.active) {
            if (Object.is(this.currentPlayer, "p1")) {
                this.p1.title = "Your turn";
                this.p2.title = "Other player's turn";
            } else if (Object.is(this.currentPlayer, "p2")) {
                this.p1.title = "Other player's turn";
                this.p2.title = "Your turn";
            } else {
                this.p1.title = "ERROR";
                this.p2.title = "ERROR";
            }
            this.turnTime--;
            if (this.turnTime <= 0) {
                this.EndTurn();
            }
        } else {
            this.p1.title = "Waiting for Players...";
        }
        let p1;
        let p2;
        if (this.p1)
            p1 = data.game.battleUsers.find(obj => Object.is(obj.username, this.p1.UserName));
        if (this.p2)
            p2 = data.game.battleUsers.find(obj => Object.is(obj.username, this.p2.UserName));
        if (p1 && !p1.socket && p2 && !p2.socket)
            this.EndGame();
        else if (p1 && !p1.socket && !p2)
            this.EndGame();
        this.SendInfo();
        if (this.p1) {
            this.p1.UpdateStones();
        }
        if (this.p2) {
            this.p2.UpdateStones();
        }
    }
    DrawCardsToPlayer(player, amount) {
        let availableCards = [];
        for (let i = 0; i < player.Deck.length; i++) {
            if (player.Deck[i].Cost<=this.maxEnergy) {
                availableCards.push(player.Deck[i]);
            }
        }
        if (Object.is(availableCards.length, 0)) {
            availableCards = player.Deck;
        }
        for (let i = 0; i < amount; i++) {
            player.Hand.push(availableCards[Math.floor(Math.random() * availableCards.length)]);
        }

        logger.debug(`'${this.code}': '${player.UserName}' drew ${amount} cards`, "socket/game/classes/battle");
    }
    EndGame(looser) {
        if (!this.dead && !this.Tournament) {
            if (this.p1 && Object.is(this.p1.UserName, looser && this.p2)) {
                utilFunc.giveCard(this.p2.UserName);

                utilFunc.giveXP(this.p1.UserName, data.config.lossPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p1.UserName},{$set:{previousGame: {won: false, rewardXp: data.config.lossPoints}}});

                utilFunc.giveXP(this.p2.UserName, winPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p2.UserName},{$set:{previousGame: {won: true, rewardXp: data.config.winPoints}}});

                logger.info(`'${this.code}' ended, winner: '${this.p2.UserName}', looser: ${this.p1.UserName}`, "socket/game/classes/battle");
            } else if (this.p2 && Object.is(this.p2.UserName, looser) && this.p1) {
                utilFunc.giveCard(this.p1.UserName);

                utilFunc.giveXP(this.p2.UserName, data.config.lossPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p2.UserName},{$set:{previousGame: {won: false, rewardXp: data.config.lossPoints}}});

                utilFunc.giveXP(this.p1.UserName, data.config.winPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p1.UserName},{$set:{previousGame: {won: true, rewardXp: data.config.winPoints}}});

                logger.info(`'${this.code}' ended, winner: '${this.p1.UserName}', looser: ${this.p2.UserName}`, "socket/game/classes/battle");
            } else {
                logger.info(`'${this.code}' died`, "socket/game/battle");
            }
        } else if (this.Tournament) {
            this.looser = looser;
            if (this.p1 && Object.is(this.p1.UserName, looser) && this.p2) {
                utilFunc.giveCard(this.p2.UserName);

                utilFunc.giveXP(this.p1.UserName, data.config.lossPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p1.UserName},{$inc: {"previousTournament.rewardXp": data.config.lossPoints, "previousTournament.lossCount": 1}});
                utilFunc.giveXP(this.p2.UserName, data.config.winPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p2.UserName},{$inc: {"previousTournament.rewardXp": data.config.winPoints, "previousTournament.winCount": 1}});

                logger.info(`'${this.code}' ended, winner: '${this.p2.UserName}', looser: ${this.p1.UserName}`, "socket/game/classes/battle");
            } else if (this.p2 && Object.is(this.p2.UserName, looser) && this.p1) {
                utilFunc.giveCard(this.p1.UserName);

                utilFunc.giveXP(this.p2.UserName, data.config.lossPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p2.UserName},{$inc: {"previousTournament.rewardXp": data.config.lossPoints, "previousTournament.lossCount": 1}});
                utilFunc.giveXP(this.p1.UserName, data.config.winPoints);
                data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: this.p1.UserName},{$inc: {"previousTournament.rewardXp": data.config.winPoints, "previousTournament.winCount": 1}});

                logger.info(`'${this.code}' ended, winner: '${this.p1.UserName}', looser: ${this.p2.UserName}`, "socket/game/classes/battle");
            } else {
                logger.info(`'${this.code}' died`, "socket/game/battle");
            }
        }
        this.dead = true;
    }
}

module.exports = {
    battle
}