const http = require('http');
const WebSocket = require('ws');
const auth = require('./server/authentication.cjs');
const db = require('./server/database.cjs');
const fr = require('./server/fileReader.cjs');


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

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

async function isAdmin(username) {
    var data = await client.db("communism_battlecards").collection("accounts").findOne({username: username})
    if (data.admin == true || data.root == true)
        return true
    return false
}

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

    if (JSON.parse(fr('./settings.json')).lockdown) {
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
            PlayerMessage+="<p style='color:red;'>"+user.display_name+"</p> ";
        } else if (user.admin) {
            PlayerMessage+="<p style='color:blue;'>"+user.display_name+"</p> ";
        } else {
            PlayerMessage+="<p style='color:yellow;'>"+user.display_name+"</p> ";
        }
        PlayerMessage += message.Text;

        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(PlayerMessage));
            }
        });
    });

    //handle disconnects
    socket.on('close', (id) => {
    });
});

// Upgrade the connection to WebSocket when a WebSocket request is received
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, (socket) => {
        webSocketServer.emit('connection', socket, request);
    });
});

// Listen on port 3001
httpServer.listen(3001, () => {
    console.log('chat-socket running on port 3001');
});