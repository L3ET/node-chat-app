const path = require('path');
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 1337;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("new user connected");
    
    socket.emit('newMessage', {
        from: 'Server',
        text: "Hello client from server",
        createdAt: "1231331"
    });

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message)
    })

    socket.on('disconnect',()=>{
        console.log("User was disconnected");
    });
});

server.listen(port, ()=>{
    console.log(`Serever is up on port ${port}`);
});