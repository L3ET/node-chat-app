var socket = io();

socket.on('connect', function() {
    console.log("Connected to server");

    socket.emit('createMessage',{
        from: 'LEET',
        text: 'Test is Best'
    });
});
socket.on('disconnect', function() {
    console.log("Disconnacted from server")
});

socket.on('newMessage', function (message){
    console.log('New Message', message);
});