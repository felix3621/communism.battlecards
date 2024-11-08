const WebSocket = require('ws');
const auth = require("../../modules/authentication.cjs");
const logger = require("../../modules/logger.cjs");

const socketAuth = require("../auth.cjs");
const data = require('./data.cjs');
const tick = require("./tick.cjs");

const c_tournament = require("./classes/tournament.cjs");
const c_battle = require("./classes/battle.cjs");
const c_tournamentViewer = require("./classes/tournamentViewers.cjs");



const webSocketServer = new WebSocket.Server({ noServer: true });

async function handleSocketConnection(username, ud, socket, request) {
    await data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: username},{$unset:{previousGame:'',previousTournament:''}});
    const search = (new URL(request.url, 'http://localhost')).searchParams;

    if (search.get("tournamentPanel") && Object.is(decodeURIComponent(search.get("tournamentPanel")), "true")) {
        if (!(ud.admin || ud.root)) {
            socket.close(1008, 'Invalid privileges');
            return false;
        }
        let user = data.game.tournamentViewers.find(obj => Object.is(obj.username, username));
        if (user) {
            if (user.socket)
                user.socket.close(1008, 'another instance logged on');
            user.socket = socket;
        } else {
            data.game.tournamentViewers.push(new c_tournamentViewer.tournamentViewer(username, socket));
        }

        return true;
    }

    if (Object.is(ud.deck.length, 0)) {
        socket.close(1008, 'Deck required');
        return false;
    }

    if (search.get("tournament")) {
        if (Object.is(decodeURIComponent(search.get("tournament")), "new")) {
            for (let i = 0; i < data.game.tournaments.length; i++) {
                let user = data.game.tournaments[i].Sockets.find(obj => Object.is(obj.username, username));
                if (user) {
                    if (user.socket)
                        user.socket.close(1008, 'Another instance logged on');
                    let index = data.game.tournaments[i].Sockets.indexOf(user);
                    data.game.tournaments[i].Sockets.splice(index, 1);
                    break;
                }
            }

            data.game.tournaments.push(new c_tournament.tournament());
            let code = auth.encrypt("T_"+data.config.tournamentID);
            data.game.tournaments[data.game.tournaments.length-1].code = code;
            data.config.tournamentID++;
            logger.info(`'${username}' created new tournament: '${code}'`, "socket/game/socket/handleSocketConnection");

            data.game.tournaments[data.game.tournaments.length-1].addSocket(username,socket);

        } else {
            let tournamentSearch = data.game.tournaments.find(obj => Object.is(obj.code, decodeURIComponent(search.get("tournament"))));
            if (tournamentSearch) {
                let user = tournamentSearch.Sockets.find(obj => Object.is(obj.username, username));
                if (user) {
                    if (user.socket)
                        user.socket.close(1008, 'Another instance logged on');
                    user.socket = socket
                } else if (!tournamentSearch.active) {
                    tournamentSearch.addSocket(username, socket);
                }
            } else {
                socket.close(1008, 'Game not found');
                return false;
            }
        }
    } else {
        let queueUser = data.game.queuedUsers.find(obj => Object.is(obj.username, username));
        if (queueUser) {
            if (queueUser.socket) {
                queueUser.socket.close(1008, 'Another instance logged on');
            }
            queueUser.socket = socket;
        } else {
            let battleUser = data.game.battleUsers.find(obj => Object.is(obj.username, username));
            if (battleUser) {
                if (battleUser.socket) {
                    battleUser.socket.close(1008, 'Another instance logged on');
                }
                if (!search.get("private") && !search.get("code"))
                    battleUser.socket = socket;
                else {
                    let game = data.game.battles.find(obj => (obj.p1 && Object.is(obj.p1.UserName, username)) || (obj.p2 && Object.is(obj.p2.UserName, username)));
                    if (game)
                        game.PlayerDisconnected(username);
                }
            } else if (!search.get("private") && !search.get("code")) {
                data.game.queuedUsers.push({username: username, socket: socket, reconnectTime: 30});
            }

            if (search.get("private")) {
                data.game.battles.push(new c_battle.battle());
                let code = auth.encrypt("G_"+data.config.gameID);
                data.game.battles[data.game.battles.length-1].code = code;
                data.game.battleUsers.push({username: username, socket: socket, reconnectTime: 30});
                data.game.battles[data.game.battles.length-1].private = true;
                data.config.gameID++;
                logger.info(`'${username}' created new private game: '${code}'`, "socket/game/socket/handleSocketConnection");

                data.game.battles[data.game.battles.length-1].SetP1(username);
            } else if (search.get("code")) {
                let battle = data.game.battles.find(obj => Object.is(obj.code, decodeURIComponent(search.get("code"))) && !obj.Tournament);
                if (battle) {
                    if (!battle.p2 || Object.is(battle.p2.UserName, username)) {
                        data.game.battleUsers.push({username: username, socket: socket, reconnectTime: 30});
                        battle.SetP2(username);
                    }
                } else {
                    socket.close(1008, 'game not found');
                    return false;
                }
            }
        }
    }
    return true;
}

function handleSocketEvents(username, socket) {
    handleSocketMessage(socket, username);
    handleSocketClose(socket, username);
}
function handleSocketMessage(socket, username) {
    socket.on('message', (message) => {
        let tournamentViewer = data.game.tournamentViewers.find(obj => Object.is(obj.username, username));
        if (tournamentViewer)
            tournamentViewer.message(JSON.parse(message));
        else {
            let command = JSON.parse(message);
            let game = data.game.battles.find(obj => (obj.p1 && Object.is(obj.p1.UserName, username)) || (obj.p2 && Object.is(obj.p2.UserName, username)));
            if (game) {
                let p1 = (Object.is(game.p1.UserName, username));
                if (game[p1 ? "p1" : "p2"][command.function])
                    game[p1 ? "p1" : "p2"][command.function](command);
            }
            for (let i = 0; i < data.game.tournaments.length; i++) {
                let socketSearch = data.game.tournaments[i].Sockets.find(obj => Object.is(obj.username, username));
                if (socketSearch) {
                    let game = data.game.tournaments[i].Battles.find(obj => Object.is(obj.p1.UserName, username) || Object.is(obj.p2.UserName, username));
                    if (game) {
                        let p1 = (Object.is(game.p1.UserName, username));
                        if (game[p1 ? "p1" : "p2"][command.function])
                            game[p1 ? "p1" : "p2"][command.function](command);
                    }
                    if (command.tournamentReady && data.game.tournaments[i].Sockets.length>1) {
                        socketSearch.ready = !socketSearch.ready;
                    }

                    break;
                }
            }
        }
    });
}
function handleSocketClose(socket, username) {
    socket.on('close', (id) => {
        if (!Object.is(id, 1008)) {
            let queueUserIndex = data.game.queuedUsers.findIndex(obj => Object.is(obj.username, username));
            if (!Object.is(queueUserIndex, -1)) {
                data.game.queuedUsers.splice(queueUserIndex,1);
            }

            let battleUser = data.game.battleUsers.find(obj => Object.is(obj.username, username));
            if (battleUser) {
                battleUser.socket = null;
            }

            let tournamentUser;
            for (let i = 0; i < data.game.tournaments.length; i++) {
                tournamentUser = data.game.tournaments[i].Sockets.find(obj => Object.is(obj.username, username));
                if (tournamentUser) {
                    tournamentUser.socket = null;
                    break;
                }
            }

            let tournamentViewerUser = data.game.tournamentViewers.find(obj => Object.is(obj.username, username));
            if (tournamentViewerUser)
                tournamentViewerUser.socket = null;
        }
    });
}

webSocketServer.on('connection', async(socket, request) => {
    socketAuth.handleSocketAuthentication(socket, request, data).then(UD => {
        if (UD) {
            handleSocketConnection(UD.username, UD, socket, request).then(didFinish => {
                if (didFinish)
                    handleSocketEvents(UD.username, socket);
            });
        }
    });
});

setTimeout(tick.tick, 1000);



module.exports = {
    wss: webSocketServer
};
