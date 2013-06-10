var five = require('johnny-five'),
  async = require('async'),
  board = new five.Board({
  debug: true
}),
  lastAngle = 0,
  servo, potentiometer;




board.on('ready', function() {

  lastChange = new Date();


  console.log(lastChange);
  // The servo signal line is connected to 
  // Digital PWM Pin 10
  // servo = new five.Servo({
  //   pin: 11,
  //   range: [ 0, 180 ], // Default: 0-180
  //   type: 'standard', // Default: "standard". Use "continuous" for continuous rotation servos
  //   startAt: 90, // if you would like the servo to immediately move to a degree
  //   center: false // overrides startAt if true and moves the servo to the center of the range
  // });


  potentiometer = new five.Sensor({
      pin: 'A2',
      freq: 250
  });


  // You can add any objects to the board's REPL, 
  // Let's add the servo here, so we can control 
  // it directly from the REPL!
  // board.repl.inject({
  //   servo: servo
  // });

  potentiometer.on('change', function( err, value ) {
    var angle = Math.floor(value*180/1023);
    console.log(angle);
    if (Math.abs(angle - lastAngle) > 20) {
      //servo.move(angle);
      lastAngle = angle;
    }
  });

});