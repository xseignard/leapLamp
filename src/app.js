const five = require('johnny-five');
const Leap = require('leapjs');
const LeapFrame = require('./lib/leapFrame');
const Joint = require('./lib/joint');

const controller = new Leap.Controller();
const board = new five.Board();

let frame;
let i = 0;

const headBulb = new Joint({
	minPos: -60,
	maxPos: 30,
	pin: 9,
	range: [60, 175],
});

const headNod = new Joint({
	minPos: 0,
	maxPos: 50,
	pin: 10,
	range: [70, 170],
});

const middle = new Joint({
	minPos: 70,
	maxPos: 220,
	pin: 6,
	range: [60, 150],
});

// const basis = new Joint({
// 	minPos: 50,
// 	maxPos: 200,
// 	pin: 6,
// 	range: [10, 170],
// });

board.on('ready', () => {
	controller.on('frame', (data) => {
		i++;
		// track only 40frame/s
		if (i % 3 === 0) {
			frame = new LeapFrame(data);
			if (frame.valid) {
				headNod.move(frame.deltaHandFinger.y);
				headBulb.move(frame.deltaHandFinger.x);
				middle.move(frame.palmPosition.y);
				// basis.move(frame.palmPosition.x);
			}
			i = 0;
		}
	});
	controller.connect();
});
