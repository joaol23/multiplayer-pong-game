let readyPlayerCount = 0;

function listen(io) {
    const pongNameSpace = io.of('/pong')
    pongNameSpace.on('connection', socket => {
        let room;
        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            readyPlayerCount++;
            if (readyPlayerCount % 2 == 0) {
                pongNameSpace.in(room).emit('startGame', socket.id);
            }
        })

        socket.on('paddleMove', paddleData => {
            socket.to(room).emit('paddleMove', paddleData);
        })

        socket.on('ballMove', ballData => {
            socket.to(room).emit('ballMove', ballData);
        })

        socket.on('disconnect', (reason) => {
            socket.leave(room);
            readyPlayerCount = (readyPlayerCount > 0 ? readyPlayerCount - 1 : 0);
            socket.to(room).emit('otherPlayerDisconnected');
        })
    });
}

module.exports = {
    listen
};