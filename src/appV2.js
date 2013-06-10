var five = require('johnny-five'),
    webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    board = new five.Board(),
    LeapFrameV2 = require('./lib/leapFrameV2'),
    Joint = require('./lib/joint'),
    frame;

board.on('ready', function() {

  var headBulb = new Joint({
    // finger X pos
    //minPos: -25,
    //maxPos: 25,
    // fingerAngleX
    minPos: 130,
    maxPos: 170,
    // deltaHandFingerX
    pin: 9,
    range: [60,175]
  });

  var headNod = new Joint({
    // finger Y pos    
    //minPos: 80,
    //maxPos: 200,
    // fingerAngleY
    minPos: 65,
    maxPos: 90,
    // deltaHandFingerY
    pin: 10,
    range: [60,175]
  });

  var middle = new Joint({
    minPos: 50,
    maxPos: 200,
    pin: 11,
    range: [10,170]
  });

  var basis = new Joint({
    minPos: 50,
    maxPos: 200,
    pin: 6,
    range: [10,170]
  });


  ws.on('message', function(data, flags) {
    frame = new LeapFrameV2(data);
    if(frame.valid) {
      headNod.move(frame.fingerAngleY);
      headBulb.move(frame.fingerAngleX);
      middle.move(frame.palmPosition.y);
      basis.move(frame.palmPosition.y);
    }
  });
});