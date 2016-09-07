const assert = require('assert');
const fiveStubs = require('./five.stubs');
const Joint = require('../joint');

let servoStub;
let joint;

describe('Joint', () => {
	beforeEach(() => {
		// get the stubbed servo
		servoStub = fiveStubs.ServoStub();
		// the constructor will now rely on the stubbed servo
		joint = new Joint({
			minPos: 50,
			maxPos: 100,
			pin: 9,
			range: [60, 120],
		});
	});

	afterEach(() => {
		servoStub.restore();
	});

	describe('#move()', () => {
		it('should move to 90 degrees', () => {
			joint.move(75);
			assert.equal(joint.servo.lastMove, 90);
		});
		it('should move to 60 degrees', () => {
			joint.move(25);
			assert.equal(joint.servo.lastMove, 60);
		});
		it('should move to 120 degrees, according to the constraint', () => {
			joint.move(25, (pos) => pos + 100);
			assert.equal(joint.servo.lastMove, 120);
		});
	});

	describe('#scale()', () => {
		it('should scale the position to the range of the joint', () => {
			assert.equal(joint.scale(0), 60);
			assert.equal(joint.scale(50), 60);
			assert.equal(joint.scale(75), 90);
			assert.equal(joint.scale(100), 120);
			assert.equal(joint.scale(150), 120);
		});
	});
});
