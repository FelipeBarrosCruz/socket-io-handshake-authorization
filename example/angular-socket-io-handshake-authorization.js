angular.module('socket-io-authorization', [])

.factory('socket', function($rootScope) {
    socket = {},
        connected = false,
        authorized = {
            status: false
        };

    var on = function(eventName, callback) {
        if (!connected || !socket) {
            console.log('Must be connect first!');
            return;
        }

        socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                callback.apply(socket, args);
            });
        });
    };

    var emit = function(eventName, data, callback) {
        if (!connected || !socket) {
            console.log('Must be connect first!');
            return;
        }

        socket.emit(eventName, data, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        })
    };

    var handshake = function(_auth_data) {

        emit('auth', _auth_data);

        on('auth', function(response) {
            console.log('response', response);
            authorized.status = response.status || false;
        });
    };

    var connect = function(configuration) {
        socket = io.connect(configuration.url);
        connected = true;
        handshake(configuration.data);

        return state;
    };

    var socketInterface = {
        on: on,
        emit: emit
    };

    var listen = function(scope) {
        scope(socketInterface, authorized);
    };

    var state = {
        connect: connect,
        listen: listen
    };

    return state;
});
