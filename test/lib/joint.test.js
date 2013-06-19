'use strict';
var assert = require('assert'),
	fiveMocks = require('./five.mocks'),
	Joint = require('../../src/lib/joint'),
	servoStub, joint;

describe('Joint', function() {

	beforeEach(function(){
		// get the stubbed servo
		servoStub = fiveMocks.ServoStub();
		// the constructor will now rely on the stubbed servo
		joint = new Joint({
			minPos: 50,
			maxPos: 100,
			pin: 9,
			range: [60,120]
		});
	});

	afterEach(function(){
		servoStub.restore();
	});

	describe('#move()', function() {
		it('should move to 90 degrees', function() {
			joint.move(75);
			assert.equal(joint.servo.lastMove, 90);
		});
		it('should move to 60 degrees', function() {
			joint.move(25);
			assert.equal(joint.servo.lastMove, 60);
		});
		it('should move to 120 degrees, according to the constraint', function() {
			joint.move(25, function(pos) {
				return pos + 100;
			});
			assert.equal(joint.servo.lastMove, 120);
		});
	});

	describe('#scale()', function() {
		it('should scale the position to the range of the joint', function() {
			assert.equal(joint.scale(0), 60);
			assert.equal(joint.scale(50), 60);
			assert.equal(joint.scale(75), 90);
			assert.equal(joint.scale(100), 120);
			assert.equal(joint.scale(150), 120);
		});
	});

});
