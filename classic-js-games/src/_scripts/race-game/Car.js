'use strict';
/**
 * CAR JS
 * requires = graphics-commons.js
 */

var GROUNDSPEED_DECAY_MULT = 0.94;
var DRIVE_POWER = 0.5;
var REVERSE_POWER = 0.2;
var TURN_RATE = 0.05;
var MIN_SPEED_TO_TURN = 0.5;

function CarClass() {
  this.name = "Unnamed";
  this.x = 75;
  this.y = 75;
  this.ang = 0;
  this.speed = 0;

  this.keyHeld_Gas = false;
  this.keyHeld_Reverse = false;
  this.keyHeld_TurnLeft = false;
  this.keyHeld_TurnRight = false;

  this.controlKeyUp;
  this.controlKeyDown;
  this.controlKeyLeft;
  this.controlKeyRight;


  this.setUpInput = function(upKey,rightKey,downKey,leftKey){
    this.controlKeyUp = upKey;
    this.controlKeyRight = rightKey;
    this.controlKeyDown = downKey;
    this.controlKeyLeft = leftKey;
  };

  this.myCarPic;

  this.reset = function(whichImage,name) {
    this.name = name;
    this.myCarPic = whichImage;
    this.speed =0;
    var arrayIndex;
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
        arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (trackGrid[arrayIndex] === TRACK_PLAYERSTART) {
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -Math.PI / 2; //makes car point toward the top (-90°);
          this.x = eachCol * TRACK_WIDTH + TRACK_WIDTH / 2;
          this.y = eachRow * TRACK_HEIGHT;
          return;
        } //end of player start if
      } //end of col for
    } //end of row for
  }; //end of carReset function
  this.move = function() {

    this.speed *= GROUNDSPEED_DECAY_MULT; //friction
    if (this.keyHeld_Gas) {
      this.speed += DRIVE_POWER;
    }
    if (this.keyHeld_Reverse) {
      this.speed -= REVERSE_POWER;
    }
    if (this.keyHeld_TurnLeft && Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      this.ang -= TURN_RATE;
    }
    if (this.keyHeld_TurnRight && Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
      this.ang += TURN_RATE;
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

    carTrackHandling(this);
  }; //end of carMove
  this.draw = function() {
    drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
  };

} //end of carClass
