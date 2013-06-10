var LeapFrameV2 = function(data) {

	this.frame = JSON.parse(data);

	var _isValid = function(frame) {
		if (frame.hands && frame.hands.length >= 1) {
			return true;
		}
		return false;
	};

	var _palmPosition = function(frame, index) {
		return {
			x : frame.hands[index].palmPosition[0],
			y : frame.hands[index].palmPosition[1],
			z : frame.hands[index].palmPosition[2]
		};
	};

	if (_isValid(this.frame)) {
		this.valid = true;
		console.log(this.frame.hands.length);
		this.firstPalmPosition = _palmPosition(this.frame, 0);
		if (this.frame.hands[1]) {
			this.secondPalmPosition = _palmPosition(this.frame, 1);
		}
	}
	else {
		this.valid = false;
	}
};

module.exports = LeapFrameV2;