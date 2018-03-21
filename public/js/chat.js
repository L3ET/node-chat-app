var socket = io();

function scrollToBottom(){
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function() {
    console.log("Connected to server");
});
socket.on('disconnect', function() {
    console.log("Disconnacted from server")
 });

socket.on('newMessage', function (message){
    var template = jQuery('#message-template').html();
    var formatedTime = moment(message.creatredAt).format('h:mm a');
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message){
    var template = jQuery('#location-template').html();
    var formatedTime = moment(message.creatredAt).format('h:mm a');
    var html = Mustache.render(template,{
        text: message.url,
        from: message.from,
        createdAt: formatedTime,
        url: message.url
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
});

var locationbutton = jQuery('#send-location');

locationbutton.on('click', function (){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }

    locationbutton.attr('disabled', 'disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationbutton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationbutton.removeAttr('disabled').text('Send location');        
        alert ('Unable to fetch location.');
    });
});