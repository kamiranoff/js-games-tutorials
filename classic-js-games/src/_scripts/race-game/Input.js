'use strict';
/**
 * INPUT JS
 */

var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;

var KEY_Z = 90;
var KEY_D = 68;
var KEY_S = 83;
var KEY_Q = 81;

var mouseX, mouseY;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setUpInput(KEY_UP_ARROW, KEY_RIGHT_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW);
  redCar.setUpInput(KEY_Z, KEY_D, KEY_S, KEY_Q);
}

function keySet(keyEvent, whichCar, setTo) {
  if (keyEvent.keyCode === whichCar.controlKeyLeft) {
    whichCar.keyHeld_TurnLeft = setTo;

  }
  if (keyEvent.keyCode === whichCar.controlKeyRight) {
    whichCar.keyHeld_TurnRight = setTo;
  }
  if (keyEvent.keyCode === whichCar.controlKeyUp) {
    whichCar.keyHeld_Gas = setTo;
  }
  if (keyEvent.keyCode === whichCar.controlKeyDown) {
    whichCar.keyHeld_Reverse = setTo;

  }

}

function keyPressed(evt) {
  evt.preventDefault();
  keySet(evt, blueCar, true);
  keySet(evt, redCar, true);
}


function keyReleased(evt) {
  evt.preventDefault();
  keySet(evt, blueCar, false);
  keySet(evt, redCar, false);
}

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = evt.clientX - rect.left - root.scrollLeft; //fix for handling scroll X
  mouseY = evt.clientY - rect.top - root.scrollTop; //fix for handling scroll Y


  //CHEAT / HACK to test car in any position
  // carX = mouseX;
  // carY = mouseY;
  // carSpeedX = 2;
}
