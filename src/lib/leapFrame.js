/**
 * Calculate the angle between 2 vectors in degrees
 * @param {Array} v1 - coordinates of the first vector
 * @param {Array} v2 - coordinates of the second vector
 * @return the angle in degrees
 */
const _vectorAngle = (v1, v2) => {
	const vectorProduct = (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
	const v1Norm = Math.sqrt((v1.x * v1.x) + (v1.y * v1.y) + (v1.z * v1.z));
	const v2Norm = Math.sqrt((v2.x * v2.x) + (v2.y * v2.y) + (v2.z * v2.z));
	const cos = Math.acos(vectorProduct / (v1Norm * v2Norm));
	return (cos * 180) / Math.PI;
};

const _palmPosition = (frame) => ({
	x: frame.hands[0].palmPosition[0],
	y: frame.hands[0].palmPosition[1],
	z: frame.hands[0].palmPosition[2],
});

const _palmDirection = (frame) => ({
	x: frame.hands[0].direction[0],
	y: frame.hands[0].direction[1],
	z: frame.hands[0].direction[2],
});

const _palmNormal = (frame) => ({
	x: frame.hands[0].palmNormal[0],
	y: frame.hands[0].palmNormal[1],
	z: frame.hands[0].palmNormal[2],
});

const _fingerPosition = (frame) => ({
	x: frame.hands[0].indexFinger.tipPosition[0],
	y: frame.hands[0].indexFinger.tipPosition[1],
	z: frame.hands[0].indexFinger.tipPosition[2],
});

const _fingerDirection = (frame) => ({
	x: frame.hands[0].indexFinger.direction[0],
	y: frame.hands[0].indexFinger.direction[1],
	z: frame.hands[0].indexFinger.direction[2],
});

const _fingerAngleY = (frame) => _vectorAngle(_palmNormal(frame), _fingerDirection(frame));

const _fingerAngleX = (frame) => _vectorAngle(_palmDirection(frame), _fingerDirection(frame));

const _deltaHandFinger = (frame) => ({
	x: _palmPosition(frame).x - _fingerPosition(frame).x,
	y: _palmPosition(frame).y - _fingerPosition(frame).y,
	z: _palmPosition(frame).z - _fingerPosition(frame).z,
});

/**
 * Check if there is exploitable data in the current frame to move the servos
 * @return true if so, false else
 */
const _isValid = (frame) => (
	frame.hands
	&& frame.hands.length === 1
	&& frame.hands[0].indexFinger.extended
	&& !frame.hands[0].thumb.extended
	&& !frame.hands[0].middleFinger.extended
	&& !frame.hands[0].ringFinger.extended
	&& !frame.hands[0].pinky.extended
);

class LeapFrame {

	constructor(data) {
		this.frame = data;
		if (_isValid(this.frame)) {
			this.valid = true;
			this.palmPosition = _palmPosition(this.frame);
			this.palmDirection = _palmDirection(this.frame);
			this.palmNormal = _palmNormal(this.frame);
			this.fingerPosition = _fingerPosition(this.frame);
			this.fingerDirection = _fingerDirection(this.frame);
			this.fingerAngleY = _fingerAngleY(this.frame);
			this.fingerAngleX = _fingerAngleX(this.frame);
			this.deltaHandFinger = _deltaHandFinger(this.frame);
		}
		else {
			this.valid = false;
		}
	}

}

module.exports = LeapFrame;
