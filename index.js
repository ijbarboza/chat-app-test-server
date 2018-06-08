
var socket = require('socket.io'), http = require('http'),
    server = http.createServer(), socket = socket.listen(server);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-000');
// console.log(mongoose);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("we're connected To MongoDB");

});

socket.on('connection', function(connection) {
    console.log('User Connected');
    connection.on('message', function(msg){
        socket.emit('message', msg);

        // Added By Ivan
        let chat = db.collection('chats');
        chat.insert({message: msg}, function(){

        });
    });

    socket.on('add-message', (message) => {
        // io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
        io.emit('message', {text: message.text});

        console.log(chat);
    });

});

server.listen(3000, function(){
    console.log('Server started');
});