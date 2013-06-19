/**
 * Johnny-five stubs
 */
var five = require('johnny-five'),
	sinon = require('sinon');

var fiveMocks = {
	// stub that mimics the johnny-five Servo class
	// at least what I need from that class, i.e. the move function
	ServoStub : function() {
		var stub = sinon.stub(five, 'Servo', function(opts) {
			return {
				lastMove: 0,
				move: function(angle) {
					this.lastMove = angle;
				},
				range: opts.range
			};
		});
		return stub;
	}
};

module.exports = fiveMocks;
	