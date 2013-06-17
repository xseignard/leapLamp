'use strict';
var assert = require('assert'),
	LeapFrame = require('../../src/lib/leapFrame'),
	invalidFrame = new LeapFrame('{}');

describe('LeapFrame', function() {

	describe('#isValid()', function() {
		it('should be invalid', function() {
			assert.equal(invalidFrame.valid, false);
		});
	});
});
