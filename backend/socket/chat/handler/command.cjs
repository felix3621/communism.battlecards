const he = require("he");
const logger = require("../../../modules/logger.cjs");
const WebSocket = require("ws");

const data = require("../data.cjs");
const utilFunc = require("../utilFunc.cjs");

let wss;

const commands = {
    help: {
        description: "Get information about commands<br>'help &#60;command&#60;' get information about that command",
        execute: (user, parameters) => {
            if (parameters[0]) {
                if (commands[parameters[0]]) {
                    if (commands[parameters[0]].admin)
                        if (user.admin || user.root)
                            return `<p style='color:rgb(200,200,200)'>${commands[parameters[0]].description}</p>`;
                        else
                            return `<p style='color:rgb(230,0,0)'>Missing permissions</p>`;
                    else
                        return `<p style='color:rgb(200,200,200)'>${commands[parameters[0]].description}</p>`;
                } else {
                    return `<p style='color:rgb(230,0,0)'>Command Not Found</p>`;
                }
            } else {
                let rtn = "";
                for (const [key, value] of Object.entries(commands)) {
                    if (rtn)
                        rtn += ", ";
                    if (value.admin) {
                        if (user.admin || user.root)
                            rtn += key;
                    } else {
                        rtn += key;
                    }
                }
                return `<p style='color:rgb(200,200,200);'>${rtn}</p>`;
            }
        }
    },
    users: {
        description: "Get all users, and their username, in chat",
        execute: (user, parameters) => {
            return data.users.map((user) => {
                return utilFunc.getUserColorString(user.user, true);
            }).join("<br>");
        }
    },
    /*friends: {
        description: "Get all friends, and their username, in chat",
        execute: async(user, parameters) => {
            return (await data.db.getClient().db("communism_battlecards").collection("friends").find({users: {$elemMatch: {$eq: user.username}}}).toArray()).map((friendElement) => {
                let friend;
                if (Object.is(friendElement.users[0], user.username))
                    friend = friendElement.users[1];
                else
                    friend = friendElement.users[0];

                if (data.users.some(obj => Object.is(obj.user.username, friend))) {
                    let friend_user = data.users.find(obj => Object.is(obj.user.username, friend)).user;

                    return utilFunc.getUserColorString(friend_user, true);
                }

                return null;
            }).filter(e => e && !e.isEmpty).join("<br>");
        }
    },*/
    msg: {
        description: "Send message to specific person<br>'msg &#60;username&#62; &#60;messages&#60;' to send private message",
        execute: (user, parameters) => {
            return utilFunc.notMuted(user, (time) => {
                return `<p style='color:rgb(230,0,0)'>Unable to message user: You are muted until ${time}</p>`;
            }, () => {
                if (parameters[0] && parameters[1]) {
                    let recipient = data.users.find(usr => Object.is(usr.user.username, parameters[0]));
                    if (recipient) {
                        parameters.shift();
                        let recipientMessage = `<p style='color:rgb(255,255,255); opacity: 0.75'>From&nbsp;${utilFunc.getUserColorString(user,false,0.75)}: ${parameters.join(" ")}</p>`;

                        setTimeout(() =>
                            recipient.socket.send(JSON.stringify({PlayerMessage: recipientMessage})), 100);

                        logger.info(`'${user.username}' sent private message to '${recipient.user.username}'`, "socket/chat/command/msg");
                        return `<p style='color:rgb(255,255,255); opacity: 0.75'>To&nbsp;${utilFunc.getUserColorString(recipient.user,false,0.75)}: ${parameters.join(" ")}</p>`;
                    } else
                        return `<p style='color:rgb(230,0,0)'>Could not find '${parameters[0]}' in the chat</p>`;
                } else {
                    return "<p style='color:rgb(230,0,0)'>Syntax error, use '/help msg' to see syntax</p>";
                }
            });
        }
    },
    raw: {
        description: "Send raw html code in chat",
        admin: true,
        execute: (user, parameters) => {
            let msg = parameters.join(" ");

            setTimeout(() =>
                wss.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({PlayerMessage:msg}));
                    }
                }), 100);

            logger.info(`'${user.username}' sent raw message: ${msg}`, "socket/chat/command/raw");
            return msg.replaceAll("&", "&#38;").replaceAll("<","&#60;").replaceAll(">","&#62;").replaceAll('"', "&#34;");
        }
    },
    mute: {
        description: "Mute a user in the chat<br>'mute &#60;username&#62; &#60;minutes&#62; &#60;reason&#62;' to mute a user",
        admin: true,
        execute: async(user, parameters) => {
            if (parameters[0]) {
                let usr = data.users.find(usr => Object.is(usr.user.username, parameters[0]));
                if (usr) {
                    if (parameters[1]) {
                        if (Number(parameters[1]) >= 0 && parameters[2]) {
                            if (usr.user.root)
                                return "<p style='color:rgb(230,0,0)'>Cannot mute a root user</p>";
                            if (usr.user.admin && !user.root)
                                return "<p style='color:rgb(230,0,0)'>Missing privileges to mute a admin</p>";

                            let date = new Date();
                            date.setMinutes(date.getMinutes()+Number(parameters[1]));

                            let muteTime = parameters[1];

                            parameters.shift();
                            parameters.shift();

                            let recipientMsg = `<p style='color:rgb(230,0,0)'>You were muted by ${utilFunc.getUserColorString(user)} for ${muteTime} minutes, reason: ${parameters.join(" ")} </p>`;
                            let rtn = `<p style='color:(0,230,0)'>You muted ${utilFunc.getUserColorString(usr.user)} for ${muteTime} minutes, reason: ${parameters.join(" ")} </p>`;

                            await data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: usr.user.username}, {$set: {mutedUntil: date, mutedReason: parameters.join(" ")}});

                            usr.socket.send(JSON.stringify({PlayerMessage: recipientMsg}));

                            const time = date.toLocaleTimeString([], {timeZoneName: 'short'});
                            const day = date.toLocaleDateString().replaceAll(".","/");

                            logger.info(`'${user.username}' muted '${usr.user.username}' for ${muteTime} minutes (until ${day} ${time})`, "socket/chat/command/mute");

                            return rtn;
                        }
                        return "<p style='color:rgb(230,0,0)'>Syntax error, use '/help mute' to see syntax</p>";
                    }
                    let dbEntity = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: user.username});
                    if (dbEntity.mutedUntil > 0) {
                        let rtn = `<p style='color:rgb(0,230,0)'>User '${utilFunc.getUserColorString(user, true, 0.75)}' is muted:<br>`
                        console.log(dbEntity.mutedUntil)
                        return rtn;
                    }
                    return `<p style='color:rgb(230,0,0)'>User '${parameters[0]}' is not muted</p>`;
                }
                return `<p style='color:rgb(230,0,0)'>Could not find '${parameters[0]}' in the chat</p>`;
            }
            return (await data.db.getClient().db("communism_battlecards").collection("accounts").find({mutedUntil: {$gt: 1}}).toArray()).map((user) => {
                if (data.users.some(obj => Object.is(obj.user.username, user.username)))
                    return utilFunc.getUserColorString(user, true);

                return null;
            }).filter(e => e && !e.isEmpty).join("<br>");
        }
    }
}

async function sendCommand(user, message) {
    let command = message.Text.slice(1).split(" ");

    let rtnMsg = utilFunc.getUserColorString(user);
    rtnMsg += `&nbsp;/${he.encode(command.join(" "))}<br><p>&#62;&nbsp;</p>`;

    if (Object.keys(commands).includes(command[0])) {
        let cmd = command.shift();
        if (commands[cmd].admin && !(user.root || user.admin))
            rtnMsg += `<p style='color: rgb(230,0,0)'>Invalid permission for this command</p>`;
        else
            rtnMsg += await commands[cmd].execute(user, command);
    } else {
        rtnMsg += "<p style='color: rgb(230,0,0)'>Command Not Found.<br>Get a list of available commands with the command '/help'</p>";
    }
    let usr = data.users.find(usr => Object.is(usr.user.username, user.username));

    if (usr)
        usr.socket.send(JSON.stringify({PlayerMessage: rtnMsg}));
}

module.exports = {
    sendCommand,
    setWss: (new_wss) => {wss = new_wss;}
}