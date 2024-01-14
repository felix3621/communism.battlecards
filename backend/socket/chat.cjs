const WebSocket = require('ws');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

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

setTimeout(() => {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send("Keep Alive");
        }
    });
}, 1000);

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

    if (JSON.parse(fr.read('../settings.json')).lockdown) {
        let ud = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
        if (!ud.admin && !ud.root) {
            socket.close(1008, "LOCKDOWN")
        }
    }


    let user = await client.db("communism_battlecards").collection("accounts").findOne({username: username});

    

    socket.on('message', (message) => {
        var message = JSON.parse(message);
        let PlayerMessage = ""
        if (user.root) {
            PlayerMessage+="<p style='color:red;'>&#60;[Owner]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
        } else if (user.admin) {
            PlayerMessage+="<p style='color:rgb(0,255,255);'>&#60;[Admin]&nbsp;"+user.display_name+"&#62;</p>&nbsp;";
        } else {
            PlayerMessage+="<p style='color:rgb(255,170,0);'>&#60;"+user.display_name+"&#62;</p>&nbsp;";
        }
        PlayerMessage += message.Text;

        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({PlayerMessage:PlayerMessage}));
            }
        });
    });

    //handle disconnects
    socket.on('close', (id) => {
    });
});

module.exports = webSocketServer;