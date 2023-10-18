const apiServerExpress = require('./api');

const httpServer = require('http').createServer(apiServerExpress);
const socketServer = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const sockets = require('./sockets');

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, console.log(`Port ${PORT}`))

sockets.listen(socketServer);