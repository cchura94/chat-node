const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// SOCKETIO
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('Usuario Conectado!');

    socket.broadcast.emit('hi');

     socket.on('disconnect', () => {
        console.log('USUARIO DESCONECTADO!');
    });

    socket.on('mi-mensaje', (msg) => {
        console.log('mensaje: ' + msg);
        io.emit('mi-mensaje', msg);
    });

});


server.listen(3000, () => {
  console.log('listening on *:3000');
});

