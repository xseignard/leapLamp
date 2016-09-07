const five = require('johnny-five');

/**
 * Joint of the arm
 */
class Joint {

	constructor(opts) {
		// lowest hand postion tracked
		this.minPos = opts.minPos;
		// highest position tracked
		this.maxPos = opts.maxPos;
		// servo instance that handle this joint
		this.servo = new five.Servo({
			pin: opts.pin,
			range: opts.range,
		});
	}

	/**
	 * Move the joint of the calculated angle
	 * @param {Number} pos - tracked hand/finger position
	 * @param {function()} constraint - if present, a constraint to apply to the current position
	 */
	move(pos, constraint) {
		let constrainedPos;
		if (constraint) constrainedPos = constraint(pos);
		else constrainedPos = pos;
		const angle = this.scale(constrainedPos);
		this.servo.move(angle);
	}

	/**
	 * Map a given position to the corresponding angle
	 * @param {Number} pos - positon to map from its range to the range of angle
	 * @return {Number} the corresponding angle
	 */
	scale(pos) {
		// if current hand/finger position is outside the tracked range
		// get the nearest tracked limit
		let constrainedPos;
		if (pos < this.minPos) constrainedPos = this.minPos;
		else if (pos > this.maxPos) constrainedPos = this.maxPos;
		else constrainedPos = pos;
		return Math.floor(
			five.Fn.map(
				constrainedPos,
				this.minPos,
				this.maxPos,
				this.servo.range[0],
				this.servo.range[1]
			)
		);
	}
}

module.exports = Joint;
