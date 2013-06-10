var five = require('johnny-five'),
    webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    board = new five.Board(),
    LeapFrame = require('./lib/leapFrame'),
    Joint = require('./lib/joint'),
    frame, min, max,
    i=0;

board.on('ready', function() {

  var headBulb = new Joint({
    // frame.deltaHandFinger.x tracked range
    minPos: -60,
    maxPos: 30,
    pin: 9,
    range: [60,175]
  });

  var headNod = new Joint({
    // frame.deltaHandFinger.y tracked range
    minPos: 0,
    maxPos: 50,
    pin: 10,
    range: [70,170]
  });

  var middle = new Joint({
    // frame.palmPosition.y tracked range
    minPos: 50,
    maxPos: 200,
    pin: 11,
    range: [10,170]
  });

  // var basis = new Joint({
  //   // frame.palmPosition.x tracked range
  //   minPos: 50,
  //   maxPos: 200,
  //   pin: 6,
  //   range: [10,170]
  // });


  ws.on('message', function(data, flags) {
    i++;
    // track only 40frame/s
    if (i%3 === 0) {
      frame = new LeapFrame(data);
      if(frame.valid) {
        headNod.move(frame.deltaHandFinger.y);
        headBulb.move(frame.deltaHandFinger.x);
        middle.move(frame.palmPosition.y);
        // basis.move(frame.palmPosition.x);
      }
      i=0;
    }
  });
});