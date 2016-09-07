const assert = require('assert');
const LeapFrame = require('../leapFrame');

const invalidFrame = new LeapFrame({});

describe('LeapFrame', () => {
	describe('#isValid()', () => {
		it('should be invalid', () => {
			assert.equal(invalidFrame.valid, false);
		});
	});
});
