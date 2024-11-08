const WebSocket = require('ws');

const socketAuth = require("../auth.cjs");
const data = require('./data.cjs');

const game_data = require('../game/data.cjs');

const handler = {
    emoji: require("./handler/emoji.cjs"),
    message: require("./handler/message.cjs"),
    command: require("./handler/command.cjs")
}



const webSocketServer = new WebSocket.Server({ noServer: true });
handler.emoji.setWss(webSocketServer);
handler.message.setWss(webSocketServer);
handler.command.setWss(webSocketServer);

function ping() {
    let publicTournaments = game_data.game.tournaments.filter(tournament => tournament.public && !tournament.active).map(tournament => ({code: tournament.code, playerCount: tournament.Sockets.length}));

    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ping: "keep alive", publicTournaments}));
        }
    });
    setTimeout(ping, 1000)
}

function handleSocketEvents(socket, user) {
    handleSocketMessage(socket, user);
    handleSocketClose(socket, user);
}
function handleSocketMessage(socket, user) {
    socket.on('message', (msg) => {
        msg = JSON.parse(msg);
        if (msg.Text) {
            if(msg.Text.startsWith("/"))
                handler.command.sendCommand(user, msg);
            else
                handler.message.sendMessage(user, msg);
        } else if (msg.EmojiIndex != null) {
            handler.emoji.sendEmoji(msg.EmojiIndex, user);
        }
    });
}
function handleSocketClose(socket, user) {
    socket.on('close', (id) => {
        if (!Object.is(id, 1008)) {
            const userIndex = data.users.findIndex(elem => Object.is(elem.user.username, user.username));
            if (userIndex !== -1) {
                data.users.splice(userIndex, 1);
            }
        }
    });
}

webSocketServer.on('connection', async(socket, request) => {
    socketAuth.handleSocketAuthentication(socket, request, data).then(UD => {
        if (UD) {
            let sysUser = data.users.find(user => Object.is(user.user.username, UD.username));
            if (sysUser) {
                sysUser.socket.close(1008, "another instance connected");
                const sysUserIndex = data.users.indexOf(sysUser);
                if (sysUserIndex !== -1) {
                    data.users.splice(sysUserIndex, 1);
                }
            }
            data.users.push({user: UD, socket: socket});

            handleSocketEvents(socket, UD)
        }
    })
});

setTimeout(ping, 1000)



module.exports = {
    wss: webSocketServer
};