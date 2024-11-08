const auth = require("../../modules/authentication.cjs");
const logger = require("../../modules/logger.cjs");

const data = require("./data.cjs");
const c_battle = require("./classes/battle.cjs");

async function tick() {
    for (let i = 0; i < data.game.battleUsers.length; i++) {
        if (data.game.battleUsers[i].socket) {
            data.game.battleUsers[i].reconnectTime = 30/data.config.tickSpeed;
        } else {
            data.game.battleUsers[i].reconnectTime--;
            if (data.game.battleUsers[i].reconnectTime <=0) {
                let game = data.game.battles.find(obj => Object.is(obj.p1.UserName, battleUsers[i].username) || Object.is(obj.p2.UserName, battleUsers[i].username));
                game.PlayerDisconnected(battleUsers[i].username);
            }
        }
    }

    if (data.game.queuedUsers.length > 0) {
        for (let i = 0; i < data.game.queuedUsers.length; i++) {
            let added = false;
            if (data.game.battles.length > 0 && !data.game.battles[data.game.battles.length-1].active) {
                for (let i1 = data.game.battles.length - 1; i1 >= 0; i1--) {
                    if (!data.game.battles[i1].active && !data.game.battles[i1].private) {
                        data.game.battles[i1].SetP2(data.game.queuedUsers[i].username);
                        added = true;
                        break;
                    }
                }
            }
            if (!added) {
                data.game.battles.push(new c_battle.battle());
                let code = auth.encrypt("G_"+data.config.gameID);
                data.game.battles[data.game.battles.length-1].code = code;
                data.config.gameID++;
                logger.info(`New game created: '${code}'`, "socket/game/tick");

                data.game.battles[data.game.battles.length-1].SetP1(data.game.queuedUsers[i].username);
            }
            data.game.battleUsers.push(data.game.queuedUsers[i]);
            data.game.queuedUsers.splice(i,1);
            i--;
        }
    }

    for (let i = 0; i < data.game.battles.length; i++) {
        if (data.game.battles[i].dead) {
            if (data.game.battles[i].p1) {
                let user1 = data.game.battleUsers.find(obj => Object.is(obj.username, data.game.battles[i].p1.UserName));
                if (user1) {
                    if (user1.socket)
                        user1.socket.close(1008,'Game ended');
                    data.game.battleUsers = data.game.battleUsers.filter(obj => !Object.is(obj.username, user1.username));
                }
            }

            if (data.game.battles[i].p2) {
                let user2 = data.game.battleUsers.find(obj => Object.is(obj.username, data.game.battles[i].p2.UserName));
                if (user2) {
                    if (user2.socket)
                        user2.socket.close(1008,'Game ended');
                    data.game.battleUsers = data.game.battleUsers.filter(obj => !Object.is(obj.username, user2.username));
                }
            }

            data.game.battles.splice(i,1);
            i--;
        } else {
            data.game.battles[i].Update();
        }
    }

    for (let i = 0; i < data.game.tournaments.length; i++) {
        if (((!data.game.tournaments[i].manual && Object.is(data.game.tournaments[i].Sockets.length, 0)) || !data.game.tournaments[i].Alive)) {
            logger.info(`'${data.game.tournaments[i].code}' has ended`, "socket/game/tick")
            data.game.tournaments.splice(i,1);
            i--;
        } else {
            data.game.tournaments[i].Update();
        }
    }

    for (let i = 0; i < data.game.tournamentViewers.length; i++) {
        data.game.tournamentViewers[i].tick();
    }

    setTimeout(tick, 1000*data.config.tickSpeed);
}

module.exports = {
    tick,
}
