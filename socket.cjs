const http = require('http');
const WebSocket = require('ws');
const auth = require('./server/authentication.cjs');
const db = require('./server/database.cjs');

var connections = {}

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

async function authenticate(cookies) {
    const cookie = cookies
                        .split(';')
                        .map(cookie => cookie.trim())
                        .find(cookie => cookie.startsWith('userToken='))
                        .replace(/^userToken=/, '');

    let token = JSON.parse(auth.decrypt(cookie))
    let username = auth.decrypt(token[0])
    let password = auth.decrypt(token[1])

    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
    await client.close()
    if (result) {
        return username
    }
    return null;
    return true;
}

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let cookie = request.headers.cookie
    let username
    if (cookie) {
        username = await authenticate(cookie)
    } 
    if (!username) {
        socket.close(1008, 'Authentication failed');
        return;
    }

    if (username in connections) {
        connections[username].close(1008, 'Another instance logged on')
    }

    connections[username] = socket

    // Event handler for messages received from clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        //TODO: gameHandling

        // Broadcast the message to all connected clients
        webSocketServer.clients.forEach((client) => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Event handler for when a client disconnects
    socket.on('close', (id) => {
        if (id != 1008 && username in connections && connections[username] == socket) {
            delete connections[username]
        }
    });
});

// Upgrade the connection to WebSocket when a WebSocket request is received
httpServer.on('upgrade', (request, socket, head) => {
    webSocketServer.handleUpgrade(request, socket, head, (socket) => {
        webSocketServer.emit('connection', socket, request);
    });
});

// Listen on port 3000
httpServer.listen(3000, () => {
    console.log('Server listening on port 3000');
});