/**
 * GAMES Tutorials
 * - How to Program Games Tile Classics in JS for HTML5 Canvas
 * @TODO : STARTING SECTION 06
 *
 */

'use strict';

var KEY_LEFT_ARROW = 37;
var KEY_UP_ARROW = 38;
var KEY_RIGHT_ARROW = 39;
var KEY_DOWN_ARROW = 40;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

var canvas, canvasContext;

var carPic = document.createElement('img');
var carPicLoaded = false;

var carX = 75;
var carY = 75;
var carAng = 0;
var carRadius = 10;
var carSpeed = 0;
var speedDillutionFactor = 0.35;

var TRACK_WIDTH = 80;
var TRACK_HEIGHT = 20;
var TRACK_GAP = 2;
var TRACK_COLS = 10;
var TRACK_ROWS = 14;
var trackGrid = [];

var mouseX, mouseY;

function setVariablesValue(canvasWidth, canvasHeight) { //800,600
  carX = canvasWidth / 10;
  carY = canvasWidth / 10;
  carRadius = canvasWidth / 80;
  carSpeed = 0;
  speedDillutionFactor = 0.35;

  TRACK_WIDTH = canvasWidth / 20;
  TRACK_HEIGHT = canvasWidth / 20;
  TRACK_GAP = 2;
  TRACK_COLS = 20;
  TRACK_ROWS = 15;
  trackGrid = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];

}

function keyPressed(evt) {
  evt.preventDefault();
  if (evt.keyCode === KEY_LEFT_ARROW) {
    keyHeld_TurnLeft = true;

  }
  if (evt.keyCode === KEY_RIGHT_ARROW) {
    keyHeld_TurnRight = true;
  }
  if (evt.keyCode === KEY_UP_ARROW) {
    keyHeld_Gas = true;
  }
  if (evt.keyCode === KEY_DOWN_ARROW) {
    keyHeld_Reverse = true;
  }
}

function keyReleased(evt) {
  evt.preventDefault();
  if (evt.keyCode === KEY_LEFT_ARROW) {
    keyHeld_TurnLeft = false;

  }
  if (evt.keyCode === KEY_RIGHT_ARROW) {
    keyHeld_TurnRight = false;
  }
  if (evt.keyCode === KEY_UP_ARROW) {
    keyHeld_Gas = false;
  }
  if (evt.keyCode === KEY_DOWN_ARROW) {
    keyHeld_Reverse = false;
  }

}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  setVariablesValue(canvas.width, canvas.height);

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);

  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  carPic.onload = function() {
    carPicLoaded = true;
  };

  carPic.src = "images/batmobile.png";
  carReset(); //DRAWING CAR
};

function updateAll() {
  moveAll();
  drawAll();
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

function carReset() {
  var arrayIndex;
  for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (trackGrid[arrayIndex] === 2) {
        trackGrid[arrayIndex] = 0;
        carAng = -Math.PI / 2; //makes car point toward the top (-90°);
        carX = eachCol * TRACK_WIDTH + TRACK_WIDTH / 2;
        carY = eachRow * TRACK_HEIGHT;
      }
    }
  }
}

function carMove() {
  carSpeed *= 0.98; //friction
  if (keyHeld_Gas) {
    carSpeed += 0.2;
  }
  if (keyHeld_Reverse) {
    carSpeed -= 0.2;
  }
  if (keyHeld_TurnLeft) {
    carAng -= 0.1;
  }
  if (keyHeld_TurnRight) {
    carAng += 0.1;
  }



  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;

}

function isTrackAtColRow(col, row) {
  var trackIndexUnderCoord;
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return (trackGrid[trackIndexUnderCoord] === 1);
  } else {
    return false;
  }

}

function carTrackHandling() {
  var carTrackCol = Math.floor(carX / TRACK_WIDTH);
  var carTrackRow = Math.floor(carY / TRACK_HEIGHT);

  //MAKE SURE s IS IN BOUND
  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

    if (isTrackAtColRow(carTrackCol, carTrackRow)) {
      carX -= Math.cos(carAng) * carSpeed;
      carY -= Math.sin(carAng) * carSpeed;
      carSpeed *= -0.5;
    } //end of track found
  } //end of valid coll and row
} // end of carTrackHandling function

function moveAll() {
  carMove();
  carTrackHandling();

}

function drawAll() {
  //canvas
  colorRect(0, 0, canvas.width, canvas.height, '#666'); //clear Screen
  //colorCircle(carX, carY, carRadius, '#eee'); //draw car
  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }
  //tracks
  drawTracks();

}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(withAng);
  canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
  canvasContext.restore();
}

function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}

function drawTracks() {
  var arrayIndex;
  for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
      arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (trackGrid[arrayIndex] === 1) {
        if (arrayIndex % 2 === 0) {
          colorRect(TRACK_WIDTH * eachCol, TRACK_HEIGHT * eachRow, TRACK_WIDTH - TRACK_GAP, TRACK_HEIGHT - TRACK_GAP, '#efefef');
        } else {
          colorRect(TRACK_WIDTH * eachCol, TRACK_HEIGHT * eachRow, TRACK_WIDTH - TRACK_GAP, TRACK_HEIGHT - TRACK_GAP, '#f11');
        }
        // }else{
        //   colorRect(TRACK_WIDTH * eachCol, TRACK_HEIGHT * eachRow, TRACK_WIDTH - TRACK_GAP, TRACK_HEIGHT - TRACK_GAP, 'F00');
        // }
      } //end of if this track
    } //end of for each col
  } //END OF each Row
} //end of drawTracks function

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(showWords, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(showWords, textX, textY);
}
