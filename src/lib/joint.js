/**
 * Joint of the arm 
 */
var Joint = function(opts) {

	var five = require('johnny-five'),
		//lowest hand postion tracked
		minPos = opts.minPos,
		// highest position tracked
		maxPos = opts.maxPos,
		servo = new five.Servo({
			pin: opts.pin,
			range: opts.range
		});

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
		servo.move(angle);
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
		return Math.floor(five.Fn.map(pos, minPos, maxPos, servo.range[0], servo.range[1]));
	};

	return {
		move: _move,
		scale: _scale
	};
};

module.exports = Joint;
