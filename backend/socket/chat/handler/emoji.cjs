const WebSocket = require("ws");
const logger = require("../../../modules/logger.cjs");

const data = require("../data.cjs");
const utilFunc = require("../utilFunc.cjs");

let wss;

function sendEmoji(emojiIndex, user) {
    utilFunc.notMuted(user,
        (time) => handleMuted(time, user),
        () => handleUnmuted(emojiIndex, user));
}
function handleMuted(time, user) {
    let usr = data.users.find(usr => Object.is(usr.user.username, user.username));
    if (!usr)
        return;

    let msg = `<p style='color:red;'>Cannot send emoji: You are muted until ${time}</p>`;
    usr.socket.send(JSON.stringify({
        PlayerMessage: msg
    }));
}
function handleUnmuted(emojiIndex, user) {
    let msg = "";
    if (user.root) {
        msg += "<p style='color:red;'>&#60;[Owner]&nbsp;";
    } else if (user.admin) {
        msg += "<p style='color:orange;'>&#60;[Admin]&nbsp;";
    } else {
        msg += "<p style='color:aqua;'>&#60;";
    }
    msg += user.display_name+"&#62;</p>&nbsp;";
    let texture = data.emojis[emojiIndex].texture;
    msg += `<img src='/images/emoji/${texture}.png'>`;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify({PlayerMessage:msg}));
    });
    logger.info(`'${user.username}' sent emoji '${texture}'`, "socket/chat/emoji");
}

module.exports = {
    sendEmoji,
    setWss: (new_wss) => {wss = new_wss;}
}