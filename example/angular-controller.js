angular.module('socket-io-authorization.controller', ['socket-io-authorization'])

.controller('MainController', ['$scope', function($scope, socket) {

    var authScope = function(socket, authorized) {
        
        socket.on('message', function(data) {
            if( !authorized.status ) {
                console.log('Not authorized');
                return;
            }

            console.log('Data retrive', data);
        })
    };

    socket.connect({
        url: 'http://localhost:8000',
        data: {user: 'felipe', pass: 'abc123'}
    }).listen(authScope);

}]);