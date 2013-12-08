require('nko')('qQ-TD8SLnp9xar7D');

var isProduction = (process.env.NODE_ENV === 'production');
var http = require('http');
var port = (isProduction ? 80 : 8000);

//Add
var  express = require('express');
var app = express();
app.use(express.static(__dirname));
http.createServer(app).listen(port);

var io = require('socket.io').listen(8888);
io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});