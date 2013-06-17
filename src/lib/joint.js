/**
 * Joint of the arm 
 */
var Joint = function(opts) {

	var five = require('johnny-five'),
		//lowest hand postion tracked
		minPos = opts.minPos,
		// highest position tracked
		maxPos = opts.maxPos,
		_servo;

	// quick and dirty mocking
	if (opts.pin === 'fake') {
		_servo = {
			lastMove: 0,
			move: function(angle) {
				this.lastMove = angle;
			},
			range: opts.range
		};
	}	
	else {
		_servo = new five.Servo({
			pin: opts.pin,
			range: opts.range
		});
	}

	/**
	 * Move the joint of the calculated angle
	 * @param {Number} pos - tracked hand/finger position
	 * @param {function()} constraint - if present, a constraint to apply to the current position
	 */
	var _move = function(pos, constraint) {
		var angle;
		if (constraint) {
			pos = constraint(pos);
		}
		angle = _scale(pos);
		_servo.move(angle);
	};

	/**
	 * Map a given position to the corresponding angle
	 * @param {Number} pos - positon to map from its range to the range of angle
	 * @return {Number} the corresponding angle
	 */
	var _scale = function(pos) {
		// if current hand/finger position is outside the tracked range
		// get the nearest tracked limit
		if (pos<minPos) {
			pos = minPos;
		}
		else if (pos>maxPos) {
			pos = maxPos;
		}
		return Math.floor(five.Fn.map(pos, minPos, maxPos, _servo.range[0], _servo.range[1]));
	};

	return {
		servo: _servo,
		move: _move,
		scale: _scale
	};
};

module.exports = Joint;
