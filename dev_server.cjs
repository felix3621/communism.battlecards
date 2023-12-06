const http = require('http');
const WebSocket = require('ws');

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

// Handle WebSocket connections
webSocketServer.on('connection', (socket, request) => {
    console.log('Client connected');
    const id = socket._socket.remoteAddress + "_" + socket._socket.remotePort
    console.log(`Client connected with id: ${id}`);

    // Event handler for messages received from clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);

        // Broadcast the message to all connected clients
        webSocketServer.clients.forEach((client) => {
            if (client != socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Event handler for when a client disconnects
    socket.on('close', () => {
        console.log('Client disconnected');
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
    console.log('Server listening on http://localhost:3001');
});