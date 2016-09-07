/**
 * Johnny-five stubs
 */
const five = require('johnny-five');
const sinon = require('sinon'); // eslint-disable-line import/no-extraneous-dependencies

const fiveStubs = {
	// stub that mimics the johnny-five Servo class
	// at least what I need from that class, i.e. the to function
	ServoStub() {
		const stub = sinon.stub(five, 'Servo', (opts) => ({
			lastMove: 0,
			range: opts.range,
			to(angle) { this.lastMove = angle; },
		}));
		return stub;
	},
};

module.exports = fiveStubs;
