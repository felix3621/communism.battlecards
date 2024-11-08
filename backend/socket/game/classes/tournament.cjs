const logger = require("../../../modules/logger.cjs");

const data = require('../data.cjs');
const c_battle = require("./battle.cjs");
const utilFunc = require("../utilFunc.cjs");

class tournament {
    constructor(manual = false) {
        this.Sockets = [];
        this.Battles = [];
        this.code = null;
        this.active = false;
        this.CountDown = "";
        this.Alive = true;
        this.public = false;
        this.manual = manual;
    }
    addSocket(username, socket) {
        this.Sockets.push({username: username, socket: socket, reconnectTime: data.config.reconnectTime/data.config.tickSpeed, out: false, inGame:false, ready: false, wins:0});
        utilFunc.getDisplayName(username, this.Sockets[this.Sockets.length-1]);

        logger.info(`'${username}' joined tournament '${this.code}'`, "socket/game/classes/tournament");
    }
    Update() {
        if (this.CountDown>0) {
            this.CountDown--;
        }
        let playersAlive = false;
        for (let i = 0; i < this.Sockets.length; i++) {
            if (this.Sockets[i].socket) {
                this.Sockets[i].reconnectTime = data.config.reconnectTime/data.config.tickSpeed;
                playersAlive = true;
            } else {
                this.Sockets[i].reconnectTime--;
                if (this.Sockets[i].reconnectTime <= 0) {
                    for (let j = 0; j < this.Battles.length; j++) {
                        if ((this.Battles[j].p1 && Object.is(this.Battles[j].p1.UserName, this.Sockets[i].username)) || (this.Battles[j].p2 && Object.is(this.Battles[j].p2.UserName, this.Sockets[i].username))) {
                            this.Battles[j].EndGame(this.Sockets[i].username);
                        }
                    }
                    logger.info(`'${this.Sockets[i].username}' left tournament '${this.code}'`);
                    this.Sockets.splice(i,1);
                    i--;
                }
            }
        }
        if (!this.manual && !playersAlive)
            this.Alive = false;

        let readyPlayers = this.Sockets.filter(obj => !obj.out && !obj.inGame && obj.ready);
        let totalPlayers = this.Sockets.filter(obj => !obj.out);

        if (!this.manual && Object.is(readyPlayers.length, totalPlayers.length) && this.CountDown<=0)
            this.StartBattles();
        this.SendTournamentInfoTo();

        for (let i = 0; i < this.Battles.length; i++) {
            if (this.Battles[i].dead) {
                if (this.Battles[i].p1) {
                    let p1 = this.Sockets.find(obj => Object.is(obj.username, this.Battles[i].p1.UserName));
                    p1.inGame = false;
                    if (this.Battles[i].looser && Object.is(this.Battles[i].looser, p1.username)) {
                        p1.out = true;
                    } else {
                        this.Sockets.find(obj => Object.is(obj.username, this.Battles[i].p2.UserName)).wins++;
                    }
                    if (!p1) {
                        this.Battles[i].EndGame(this.Battles[i].p1.UserName);
                    }
                }
                if (this.Battles[i].p2) {
                    let p2 = this.Sockets.find(obj => Object.is(obj.username, this.Battles[i].p2.UserName));
                    p2.inGame = false;
                    if (this.Battles[i].looser && Object.is(this.Battles[i].looser, p2.username)) {
                        p2.out = true;
                    } else {
                        this.Sockets.find(obj => Object.is(obj.username, this.Battles[i].p1.UserName)).wins++;
                    }
                    if (!p2) {
                        this.Battles[i].EndGame(this.Battles[i].p2.UserName);
                    }
                }
                this.Battles.splice(i,1);
                i--;
                if (Object.is(this.Battles.length, 0)) {
                    let Players = this.Sockets.filter(obj => !obj.out);
                    if (Players.length<=1) {
                        if (Players.length) {
                            utilFunc.giveCard(Players[0].username);
                            utilFunc.giveXP(Players[0].username, data.config.tournamentWinPoints);

                            //TODO: show #wins / place
                            data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: Players[0].username},{$inc: {"previousTournament.rewardXp": data.config.tournamentWinPoints}});
                            data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: Players[0].username},{$set: {"previousTournament.win": true}});
                        }

                        while (this.Sockets.length > 0) {
                            this.Sockets[0].socket.close(1008, 'Tournament Ended');
                            this.Sockets.splice(0,1);
                        }
                        this.Alive = false;
                    }
                }
            } else if (this.CountDown<=0) {
                this.Battles[i].Update();
            }
        }
    }
    StartBattles() {
        if (this.Sockets.filter(obj => obj.inGame).length > 0)
            return;
        logger.info(`'${this.code}': Starting battles`, "socket/game/classes/tournament");
        this.active = true;
        let PlayerCount = this.Sockets.filter(obj => !obj.out).length;
        let Count=0;
        this.CountDown = 10/data.config.tickSpeed;

        for (let i = this.Sockets.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.Sockets[i], this.Sockets[j]] = [this.Sockets[j], this.Sockets[i]];
        }

        for (let i = 0; i < this.Sockets.length; i++) {
            if (!this.Sockets[i].out) {
                Count++;
            }
            if (this.Battles[this.Battles.length-1] && !this.Battles[this.Battles.length-1].active && !this.Battles[this.Battles.length-1].p2 && !this.Sockets[i].out) {
                this.Battles[this.Battles.length-1].SetP2(this.Sockets[i].username);
                this.Sockets[i].inGame = true;
                this.Sockets[i].ready = false;
            } else if (!Object.is(i, this.Sockets.length) && !Object.is(Count, PlayerCount) && !this.Sockets[i].out) {
                this.Battles.push(new c_battle.battle(this));
                this.Battles[this.Battles.length-1].code = this.code + "-" + (this.Battles.length - 1);
                this.Battles[this.Battles.length-1].SetP1(this.Sockets[i].username);
                this.Sockets[i].inGame = true;
                this.Sockets[i].ready = false;
            }
        }
        logger.info(`'${this.code}': Battles started`, "socket/game/classes/tournament");
    }
    SendTournamentInfoTo() { // Send Info
        let rtn = {
            TournamentPlayers: [],
            TournamentGames: [],
            TournamentScreen: true,
            TournamentCountDown: this.CountDown>0 ? Math.floor(this.CountDown*data.config.tickSpeed) : ""
        };
        if (!this.active) {
            rtn.code = this.code;
        }
        for (let i = 0; i < this.Sockets.length; i++) {
            rtn.TournamentPlayers.push({
                displayName:this.Sockets[i].displayName,
                username:this.Sockets[i].username,
                ready:this.Sockets[i].ready,
                out:this.Sockets[i].out
            });
        }
        for (let i = 0; i < this.Battles.length; i++) {
            if (Object.is(this.Battles[i].DataLoaded, 2))
                rtn.TournamentGames.push({
                    p1:this.Battles[i].p1.Avatar,
                    p1Name:this.Battles[i].p1.DisplayName,
                    p1CardsAmount: this.Battles[i].p1.Hand.length,
                    p1FieldCards: this.Battles[i].p1.Field.map(stone=>{
                        return {
                            cooldown: stone.attackCooldown,
                            ...stone.Card
                        }
                    }),
                    p1Energy: this.Battles[i].p1.Energy,
                    p2:this.Battles[i].p2.Avatar,
                    p2Name:this.Battles[i].p2.DisplayName,
                    p2CardsAmount: this.Battles[i].p2.Hand.length,
                    p2FieldCards: this.Battles[i].p2.Field.map(stone=>{
                        return {
                            cooldown: stone.attackCooldown,
                            ...stone.Card
                        }
                    }),
                    p2Energy: this.Battles[i].p2.Energy,
                    gameTime: Math.round(this.Battles[i].turnTime/10),
                    currentPlayer: this.Battles[i].currentPlayer,
                    onCountDown: this.CountDown>0,
                    maxEnergy: this.Battles[i].maxEnergy
                });
        }
        for (let i = 0; i < this.Sockets.length; i++) {
            if ((!this.Sockets[i].inGame|| this.CountDown>0) && this.Sockets[i].socket) {
                this.Sockets[i].socket.send(JSON.stringify({
                    ...rtn,
                    myUsername: this.Sockets[i].username
                }));
            }
        }
    }
}

module.exports = {
    tournament
}