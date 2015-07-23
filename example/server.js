var app = require('http').createServer(handler),
    io = require('socket.io')(app),
    socketAuth = require('../lib/socket-handshake-authorization'),
    APP_PORT = 8000;

function handler(req, res) {
    res.end('Hello World');
};

io.on('connection', function(socket) {

    console.log('A new Socket Connected');
    console.log('SocketID [%s]', socket.id);

    var AuthorizeOne = function(data) {
        return (data.user == 'felipe' && data.pass == 'abc123') ? true : false;
    };

    socketAuth.auth({
        socket: socket,
        authorize: auth,
        method: 'auth'
    }).listen(AuthScope);

    socket.on('disconnect', function() {
        console.log('SockedID [%s] is disconnected', socket.id);
    });

});

function AuthScope(socket, authorized) {

    socket.on('message', function(value) {
        if (!authorized.status) {
            console.log('Unauthorized!');
            return;
        }

        console.log('receveid', value);
    });

    var interval = setInterval(function() {
      
      if( !authorized.status ) {
        clearInterval(interval);
        return;
      }

      socket.emit('message', 'Ola mundo');
    }, 5000);
};


app.listen(APP_PORT);
console.log('APP run in [%s] port', APP_PORT);
