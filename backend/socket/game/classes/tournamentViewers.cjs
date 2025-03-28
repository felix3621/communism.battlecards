const data = require('../data.cjs')
const c_tournament = require("./tournament.cjs");
const auth = require("../../../modules/authentication.cjs");
const logger = require("../../../modules/logger.cjs");

class tournamentViewer {
    SelectedTournament = null;
    RtnData = {Errors:[]};
    constructor(username, socket) {
        this.socket = socket;
        this.username = username;
    }
    // gets called each tick
    tick() {
        this.socketSend();
    }
    // on Message from client
    message(msg) {
        if (msg.SelectedTournament) {
            if (getTournamentByCode(msg.SelectedTournament)) {
                this.SelectedTournament = msg.SelectedTournament;
            } else {
                this.RtnData.errors.push("Unknown Tournament Game");
            }
        } else if (msg.createTournament) {
            data.game.tournaments.push(new c_tournament.tournament(true));
            let code = auth.encrypt("P_"+data.config.tournamentID);
            data.game.tournaments[data.game.tournaments.length-1].code = code;
            this.SelectedTournament = code;
            if (msg.createTournament) //is true: public
                data.game.tournaments[data.game.tournaments.length-1].public = true;
            data.config.tournamentID++;
            logger.info(`'${this.username}' created new ${msg.createTournament ? "public" : ""} tournament: '${code}'`, "socket/game/classes/tournamentViewers");
        } else if (msg.startBattles) {
            const SelectedTournament = getTournamentByCode(this.SelectedTournament);
            if (SelectedTournament) {
                if (!SelectedTournament.battles || Object.is(SelectedTournament.battles.length,0)) {
                    if (SelectedTournament.Sockets.length>=2) {
                        SelectedTournament.StartBattles();
                        logger.info(`'${this.SelectedTournament}': Started by '${this.username}'`, "socket/game/classes/tournamentViewers")
                    } else {
                        this.RtnData.Errors.push(`there are less than 2 players in this tournament`);
                    }
                } else {
                    this.RtnData.Errors.push(`tournament already started`);
                }
            } else {
                this.RtnData.Errors.push(`you have not selected a tournament`);
            }
        } else if (msg.killTournament) {
            const SelectedTournament = getTournamentByCode(msg.killTournament);
            if (SelectedTournament) {
                SelectedTournament.Kill();
                logger.warn(`'${msg.killTournament}': Killed by '${this.username}'`, "socket/game/classes/tournamentViewers")
            } else {
                this.RtnData.Errors.push(`unable to find the tournament by code ${msg.killTournament}`);
            }
        }
    }
    // Send data to client
    socketSend() {
        let rtn = {ping:true};
        rtn.tournaments = data.game.tournaments.map(tournament=>{
            return {
                Code: tournament.code,
                Players: tournament.Sockets.length
            }
        });
        const selectedTournament = getTournamentByCode(this.SelectedTournament)
        if (selectedTournament) {
            rtn.selectedTournament = {
                Code: selectedTournament.code,
                Players: selectedTournament.Sockets.map(player=>{
                    return {
                        displayName: player.displayName,
                        ready: player.ready,
                        out: player.out,
                        inGame : player.inGame,
                        wins: player.wins
                    }
                }),
                battles: selectedTournament.Battles.map(battle=>{
                    return {
                        p1: battle.p1.Avatar,
                        p1Name: battle.p1.DisplayName,
                        p1CardsAmount: battle.p1.Hand.length,
                        p1FieldCards: battle.p1.Field.map(stone=>{
                            return {
                                cooldown: stone.attackCooldown,
                                ...stone.Card
                            }
                        }),
                        p1Energy: battle.p1.Energy,
                        p2: battle.p2.Avatar,
                        p2Name: battle.p2.DisplayName,
                        p2CardsAmount: battle.p2.Hand.length,
                        p2FieldCards: battle.p2.Field.map(stone=>{
                            return {
                                cooldown: stone.attackCooldown,
                                ...stone.Card
                            }
                        }),
                        p2Energy: battle.p2.Energy,
                        gameTime: Math.round(battle.turnTime/10),
                        currentPlayer: battle.currentPlayer,
                        onCountDown: selectedTournament.CountDown>0,
                        maxEnergy: battle.maxEnergy
                    }
                })
            }
        } else if (this.SelectedTournament) {
            rtn.selectedTournament = false;
            this.SelectedTournament = null;
            this.RtnData.Errors.push("Selected Tournament Game Does Not Exist Any More");
        }
        rtn = {...rtn, ...this.RtnData}
        if (this.socket) {
            this.socket.send(JSON.stringify(rtn));
        }
        this.RtnData = {Errors:[]};
    }
}
function getTournamentByCode(Code) {
    return data.game.tournaments.find(tournament=>{
        return Object.is(tournament.code, Code);
    })
}

module.exports = {
    tournamentViewer
}