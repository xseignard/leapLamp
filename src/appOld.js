var five = require('johnny-five'),
  webSocket = require('ws'),
  ws = new webSocket('ws://127.0.0.1:6437'),
  board = new five.Board({
    pin: 9,
    range: [ 60, 170 ]
  }),
  servo, frame;

board.on('ready', function() {

  servo = new five.Servo(9);

  board.repl.inject({
    servo: servo
  });

//140/30

  ws.on('message', function(data, flags) {
    frame = JSON.parse(data);
    if(frame.hands && frame.hands[0]) {
      var y= frame.hands[0].palmPosition[1];
      var angle = Math.floor((y-50)*180/250);
      console.log(angle);
      if (angle>=60 && angle<=170) {
        servo.move(angle);
      }
      else if (angle<60) {
        servo.move(60);
      }
      else {
        servo.move(170);
      }
    }
  });
});