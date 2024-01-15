const WebSocket = require('ws');
const he = require('he');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');

const emojies = require('../../shared/emoji.json')

var dbConnected = false;

var users = new Array();

const commands = {
    help: {
        description: "Get information about commands<br>'help [command]' get information about that command"
    },
    users: {
        description: "Get all users, and their username, in chat"
    },
    friends: {
        description: "Get all friends, and their username, in chat"
    },
    msg: {
        description: "Send message to specific person<br>'msg &#60;username&#62; &#60;messages&#62;' to send private message"
    },
    raw: {
        description: "Send raw html code in chat",
        admin: true
    },
    mute: {
        description: "Mute a user in the chat<br>'mute &#60;username&#62; &#60;minutes&#62;' to mute a user",
        admin: true
    }
}

db.on('open', _=> {dbConnected = true})
db.on('topologyClosed', _=> {dbConnected = false})

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

async function command(user, command) {
    command = command.slice(1)
    command = command.split(" ")
    
    var returnMessage = ""
    if (user.root) {
        returnMessage+="<p style='color:red;'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
    } else if (user.admin) {
        returnMessage+="<p style='color:orange;'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
    } else {
        returnMessage+="<p style='color:aqua;'>&#60;"+user.display_name+"&#62;</p>&nbsp;";
    }
    returnMessage += "/"+he.encode(command.join(" "))+"<br><p>&#62;&nbsp;&nbsp</p>";

    switch (command[0]) {
        case "help":
            if (command[1]) {
                if (commands[command[1]]) {
                    returnMessage+="<p style='color:rgb(200,200,200)'>"+commands[command[1]].description+"</p>"
                } else {
                    returnMessage += "<p style='color:rgb(230,0,0)'>Command Not Found</p>"
                }
            } else {
                let cmds = new Array();
                Object.entries(commands).forEach(([key, value]) => {
                    if (value.admin) {
                        if (user.admin || user.root) {
                            cmds.push(key)
                        } 
                    } else {
                        cmds.push(key)
                    }
                })
                returnMessage += "<p style='color:rgb(200,200,200);'>"+cmds.join(", ")+"</p>"

            }
            break;
        case "users":
            var usrs = new Array();
            for (let i = 0; i < users.length; i++) {
                let element = ""
                if (users[i].user.root) {
                    element += "<p style='color:red;'>&#60;[Owner]&nbsp;"
                } else if (users[i].user.admin) {
                    element += "<p style='color:orange;'>&#60;[Admin]&nbsp;"
                } else {
                    element += "<p style='color:aqua;'>&#60;"
                }
                element += users[i].user.display_name + " (" + users[i].user.username + ")&#62;</p>"
                if (!usrs.includes(element))
                    usrs.push(element)
            }
            returnMessage += usrs.join("<p>,&nbsp;</p>")
            break;
        case "friends":
            var friendList = new Array();
            let friends = await client.db("communism_battlecards").collection("friends").find({users: {$elemMatch: {$eq: user.username}}}).toArray();

            for (let i = 0; i < friends.length; i++) {
                let friend;
                if (friends[i].users[0] == user.username)
                    friend = friends[i].users[1]
                else
                    friends[i].users[1]

                if (users.some(obj => obj.user.username == friend)) {
                    let friend_user = users.find(obj => obj.user.username == friend).user

                    let element = ""
                    if (friend_user.root) {
                        element += "<p style='color:red;'>&#60;[Owner]&nbsp;"
                    } else if (friend_user.admin) {
                        element += "<p style='color:orange;'>&#60;[Admin]&nbsp;"
                    } else {
                        element += "<p style='color:aqua;'>&#60;"
                    }
                    element +=  users[i].user.display_name + " (" +  users[i].user.username + ")&#62;</p>"
                    if (!friendList.includes(element))
                        friendList.push(element)
                }
            }

            returnMessage += friendList.join("<p>,&nbsp;</p>")
            break;
        case "msg":
            //TODO: not muted check
            if (command[1] && command[2]) {
                let recipient = users.find(usr => usr.user.username == command[1])
                if (recipient) {
                    let msgList = new Array();
                    for (let i = 2; i < command.length; i++) {
                        msgList.push(command[i])
                    }

                    returnMessage += "<p>To&nbsp;</p>"

                    if (recipient.user.root) {
                        returnMessage+="<p style='color:red;'>&#60;[Owner]&nbsp;"+recipient.user.display_name+"&#62;</p>&nbsp;";
                    } else if (recipient.user.admin) {
                        returnMessage+="<p style='color:orange;'>&#60;[Admin]&nbsp;"+recipient.user.display_name+"&#62;</p>&nbsp;";
                    } else {
                        returnMessage+="<p style='color:aqua;'>&#60;"+recipient.user.display_name+"&#62;</p>&nbsp;";
                    }

                    returnMessage +="<p>: "+msgList.join(" ")+"</p>"

                    var recipientMessage = "<p style='color:rgb(200,200,200)'>From&nbsp;</p>"
                    if (user.root) {
                        recipientMessage+="<p style='color:rgb(204,0,0);'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>";
                    } else if (user.admin) {
                        recipientMessage+="<p style='color:rgb(204,133,0);'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>";
                    } else {
                        recipientMessage+="<p style='color:rgb(0,204,204);'>&#60;"+user.display_name+"&#62;</p>";
                    }
                    recipientMessage+="<p style='color:rgb(200,200,200)'>: "+msgList.join(" ")+"</p>"

                    recipient.socket.send(JSON.stringify({PlayerMessage: recipientMessage}))
                } else {
                    returnMessage += "<p style='color:rgb(230,0,0)'>Could not find '"+command[1]+"' in the chat</p>"
                }
            } else {
                returnMessage += "<p style='color:rgb(230,0,0)'>Syntax error, use '/help msg' to see syntax</p>"
            }
            break;
        case "raw":
            if (user.root || user.admin) {
                var raw = new Array()
                for (let i = 1; i < command.length; i++) {
                    raw.push(command[i])
                }
                returnMessage += raw.join(" ")

                webSocketServer.clients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({PlayerMessage:raw.join(" ")}));
                    }
                });
            } else {
                returnMessage += "<p style='color: rgb(230,0,0)'>Invalid permission for this command</p>"
            }
            break;
        case "mute":
            if (user.root || user.admin) {
                if (command[1] && Number(command[2])) {
                    let usr = users.find(usr => usr.user.username == command[1])

                    if (usr) {
                        if (usr.user.admin || usr.user.root) {
                            returnMessage += "<p style='color:rgb(230,0,0)'>Cannot mute a admin/root account</p>"
                        } else {
                            let date = new Date()
                            date.setMinutes(date.getMinutes()+Number(command[2]))

                            await client.db("communism_battlecards").collection("accounts").updateOne({username: command[1]}, {$set: {mutedUntil: date}})


                            returnMessage += "<p style='color:rgb(0,230,0)'>Muted '"+command[1]+"' for "+command[2]+" minutes</p>"
                            msg = "<p>You were muted by '</p>"

                            if (user.root) {
                                msg+="<p style='color:red;'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
                            } else if (user.admin) {
                                msg+="<p style='color:orange;'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
                            } else {
                                msg+="<p style='color:aqua;'>&#60;"+user.display_name+"&#62;</p>&nbsp;";
                            }

                            msg += "<p>' for "+command[2]+" minutes</p>"
                            usr.socket.send(JSON.stringify({PlayerMessage:msg}))
                        }
                    } else {
                        returnMessage += "<p style='color:rgb(230,0,0)'>Could not find '"+command[1]+"' in the chat</p>"
                    }
                } else {
                    returnMessage += "<p style='color:rgb(230,0,0)'>Syntax error, use '/help mute' to see syntax</p>"
                }
            } else {
                returnMessage += "<p style='color: rgb(230,0,0)'>Invalid permission for this command</p>"
            }
            break;
        default:
            returnMessage += "<p style='color: rgb(230,0,0)'>Command Not Found.<br>Get a list of available commands with the command '/help'</p>"
    }

    users.find(usr => usr.user == user).socket.send(JSON.stringify({PlayerMessage: returnMessage}))
}
function message(user, message) {
    let PlayerMessage = ""
    if (user.root) {
        PlayerMessage+="<p style='color:red;'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
    } else if (user.admin) {
        PlayerMessage+="<p style='color:orange;'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
    } else {
        PlayerMessage+="<p style='color:aqua;'>&#60;"+user.display_name+"&#62;</p>&nbsp;";
    }

    let msg = message.split(" ")

    for (let i = 0; i < msg.length; i++) {
        if (msg[i].startsWith("http") || msg[i].startsWith("www.")) {
            PlayerMessage += "<a href='"+he.encode(msg[i])+"' target='_blank'>"+he.encode(msg[i])+"</a> "
        } else {
            PlayerMessage += he.encode(msg[i]) + " ";
        }
    }

    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({PlayerMessage:PlayerMessage}));
        }
    });
}

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

//authenticate cookies
async function authenticate(cookies) {
    var cookie = cookies
                        .split(';')
                        .map(cookie => cookie.trim())
                        .find(cookie => cookie.startsWith('userToken=')
                )
    if (cookie) {
        cookie = cookie.replace(/^userToken=/, '');
    } else {
        return null
    }


    let token = JSON.parse(auth.decrypt(decodeURIComponent(cookie)))
    let username = auth.decrypt(token[0])
    let password = auth.decrypt(token[1])

    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
    if (result) {
        return username
    }
    return null;
}

async function authorizeSocket(socket, request) {
    let cookie = request.headers.cookie
    let username
    if (cookie) {
        username = await authenticate(cookie)
    } 
    if (!username) {
        socket.close(1008, 'Authentication failed');
        return false;
    }
    return username
}

function ping() {
    setTimeout(() => {
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ping: "keep alive"}));
            }
        });
        ping()
    }, 500);
}
ping()

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    if (!dbConnected)
        socket.close(1000, "server starting")
    else {
        let username = await authorizeSocket(socket, request);
        if (!username) return;

        if (JSON.parse(fr.read('../settings.json')).lockdown) {
            let ud = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
            if (!ud.admin && !ud.root) {
                socket.close(1008, "LOCKDOWN")
            }
        }
    
    
        let user = await client.db("communism_battlecards").collection("accounts").findOne({username: username});
    
        users.push({user: user, socket: socket})
    
        socket.on('message', (msg) => {
            var msg = JSON.parse(msg);
            if (msg.Text) {
                if(msg.Text.startsWith("/"))
                    command(user, msg.Text)
                else if (msg.EmojiIndex != null) {
                    //TODO: not muted check
                    webSocketServer.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            PlayerMessage = "";
                            if (user.root) {
                                PlayerMessage+="<p style='color:red;'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
                            } else if (user.admin) {
                                PlayerMessage+="<p style='color:orange;'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
                            } else {
                                PlayerMessage+="<p style='color:aqua;'>&#60;"+user.display_name+"&#62;</p>&nbsp;";
                            }
                            PlayerMessage += "<img src='/images/emoji/"+emojies[msg.EmojiIndex].texture+".png'>";
                            client.send(JSON.stringify({PlayerMessage:PlayerMessage}));
                        }
                    });
                } else
                    message(user, msg.Text) //TODO: not muted check
            }
            if (msg.EmojiIndex != null) {
            }
        });
    
        //handle disconnects
        socket.on('close', (id) => {
            users.splice(users.indexOf(elem => elem.user.username == username),1)
        });
    }
    
});

module.exports = {
    wss: webSocketServer
};