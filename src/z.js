var five = require('johnny-five'),
	Joint = require('./lib/joint');

var board = new five.Board();

board.on('ready', function() {

	var servo = new five.Servo({
		pin:9,
		range:[60,175]
	});

	board.repl.inject({
		servo: servo
	});

});