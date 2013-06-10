var LeapFrame = function(data) {

	this.frame = JSON.parse(data);

	/**
	 * Check if there is exploitable data in the current frame to move the servos
	 * @return true if so, false else
	 */
	var _isValid = function(frame) {
		if (frame.pointables && frame.pointables.length === 1) {
			var pointableId = frame.pointables[0].handId;
			if (frame.hands && frame.hands[0]) {
				var handId = frame.hands[0].id;
				if (handId === pointableId) {
					return true;
				}
			}
		}
		return false;
	};

	/**
	 * Calculate the angle between 2 vectors in degrees
	 * @param {Array} v1 - coordinates of the first vector
	 * @param {Array} v2 - coordinates of the second vector
	 * @return the angle in degrees
	 */
	var _vectorAngle = function(v1,v2) {
		var vectorProduct = v1.x*v2.x + v1.y*v2.y + v1.z*v2.z;
		var v1Norm = Math.sqrt(v1.x*v1.x+v1.y*v1.y+v1.z*v1.z);
		var v2Norm = Math.sqrt(v2.x*v2.x+v2.y*v2.y+v2.z*v2.z);
		var cos = Math.acos(vectorProduct/ (v1Norm*v2Norm));
		return cos * 180 / Math.PI;
	};

	var _palmPosition = function(frame) {
		return {
			x : frame.hands[0].palmPosition[0],
			y : frame.hands[0].palmPosition[1],
			z : frame.hands[0].palmPosition[2]
		};
	};

	var _palmDirection = function(frame) {
		return {
			x : frame.hands[0].direction[0],
			y : frame.hands[0].direction[1],
			z : frame.hands[0].direction[2]
		};
	};

	var _palmNormal = function(frame) {
		return {
			x : frame.hands[0].palmNormal[0],
			y : frame.hands[0].palmNormal[1],
			z : frame.hands[0].palmNormal[2]
		};
	};

	var _fingerPosition = function(frame) {
		return {
			x : frame.pointables[0].tipPosition[0],
			y : frame.pointables[0].tipPosition[1],
			z : frame.pointables[0].tipPosition[2]
		};
	};

	var _fingerDirection = function(frame) {
		return {
			x : frame.pointables[0].direction[0],
			y : frame.pointables[0].direction[1],
			z : frame.pointables[0].direction[2]
		};
	};

	var _fingerAngleY = function(frame) {
		return _vectorAngle(_palmNormal(frame), _fingerDirection(frame));
	};

	var _fingerAngleX = function(frame) {
		return _vectorAngle(_palmDirection(frame), _fingerDirection(frame));
	};

	var _deltaHandFinger = function(frame) {
		return {
			x : _palmPosition(frame).x - _fingerPosition(frame).x,
			y : _palmPosition(frame).y - _fingerPosition(frame).y,
			z : _palmPosition(frame).z - _fingerPosition(frame).z
		};
	};

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
};

module.exports = LeapFrame;