const he = require('he');
const WebSocket = require("ws");
const logger = require("../../../modules/logger.cjs");

const data = require("../data.cjs");
const utilFunc = require("../utilFunc.cjs");

let wss;

function sendMessage(user, message) {
    utilFunc.notMuted(user,
        (time) => handleMuted(time, user),
        () => handleUnmuted(message.Text, user));
}
function handleMuted(time, user) {
    let usr = data.users.find(usr => Object.is(usr.user.username, user.username));
    if (!usr)
        return;

    let msg = `<p style='color:red;'>Cannot send message: You are muted until ${time}</p>`;
    usr.socket.send(JSON.stringify({
        PlayerMessage: msg
    }));
}
function handleUnmuted(message, user) {
    let msg = utilFunc.getUserColorString(user);
    msg += `&nbsp;${he.encode(message)}`;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify({PlayerMessage:msg}));
    });
    logger.info(`'${user.username}' sent message: ${message}`, "socket/chat/message");
}

module.exports = {
    sendMessage,
    setWss: (new_wss) => {wss = new_wss;}
}