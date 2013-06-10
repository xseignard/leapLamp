var webSocket = require('ws'),
    ws = new webSocket('ws://127.0.0.1:6437'),
    LeapFrameV2 = require('./lib/leapFrameV2'),
    frame,
    i=0;


var angle = function(frame) {
  var n = frame.palmNormal;
  var f = frame.fingerDirection;

  var vectorProduct = n.x*f.x + n.y*f.y + n.z*f.z;
  var normN = Math.sqrt(n.x*n.x+n.y*n.y+n.z*n.z);
  var normF = Math.sqrt(f.x*f.x+f.y*f.y+f.z*f.z);
  var cos = Math.acos(vectorProduct/(normN*normF));

  return cos * 180 / Math.PI;
};


ws.on('message', function(data, flags) {
  frame = new LeapFrameV2(data);
  if(frame.valid) {
    i++;
    if (i % 120 === 0) {
      //console.log('palm: ' + frame.palmPosition().x + ' ' + frame.palmPosition().y);
      //console.log('finger: ' + frame.fingerPosition().x + ' ' + frame.fingerPosition().y);

      console.log('main1 : ' + frame.firstPalmPosition.x, frame.firstPalmPosition.y);
      if (frame.secondPalmPosition) {
        console.log('main2 : ' + frame.secondPalmPosition.x, frame.secondPalmPosition.y);
      }
      i = 0;

    }
  }
});