const http = require('http');
const url = require('url');
const logger = require('./modules/logger.cjs');
const processHandler = require('./modules/processErrorHandler.cjs');

const port = 5001;

const chat = require("./socket/chat/socket.cjs");
const game = require("./socket/game/socket.cjs");

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

httpServer.on('upgrade', (request, socket, head) => {
    const path = url.parse(request.url).pathname;

    if (path === '/socket/chat') {
        chat.wss.handleUpgrade(request, socket, head, (ws) => {
            chat.wss.emit('connection', ws, request);
        });
    } else if (path === '/socket/game') {
        game.wss.handleUpgrade(request, socket, head, (ws) => {
            game.wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

// Listen on specified port
httpServer.listen(port, () => {
    logger.info(`Server started on port ${port}`,"server/socket");
});

processHandler(process, "socket");