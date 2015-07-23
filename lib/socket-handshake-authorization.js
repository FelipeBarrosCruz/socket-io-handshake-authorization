var socketHandShakeAuthorization = function() {

	var socket,
		default_method = 'auth',
		authorized = {
			status: false
		},
		handShake = function(method, callback) {
			if(!socket) {
				return;
			}

			socket.on(method, function(data) {
				authorized.status = callback(data) || false;
				socket.emit(method, {status: authorized.status});
			});
		},
		authorization = function(configuration) {
			socket 		= configuration.socket;
			var method 	= configuration.method || default_method;

			handShake(method, configuration.authorize);	
		},
		authScope = function(scope) {
			scope(socket, authorized);
		},
		state = {
			auth: function(configuration) {
				authorization(configuration);
				return state;
			},
			listen: function(scope) {
				authScope(scope);
			}
		}

	return state;
};


module.exports = new socketHandShakeAuthorization();
