leapLamp
========

# Description

The idea behind this work was to explore how to interface Arduino with Leapmotion, and to see what would be the precision we could get with some basic servos.

Everything is surprisingly smooth. Except for the servo when the lamp goes up, because it's a cheap and weak one.

Since there is no lib to directly connect the Leapmotion to the Arduino, I used node.js to connect to the websocket server that streams the Leapmotion data and the johnny-five node.js lib to control the Arduino and the servos.

# How to run it
- Build the lamp!
- Upload the StandardFirmata to the Arduino (preferably version 2.2)
- Connect the Leapmotion and the Arduino
- Run the Leap websocket server
- Run `make run`


You can see a video here: https://vimeo.com/68530396
