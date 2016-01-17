'use strict';
/**
 * TRACK JS
 * requires = graphics-commons.js
 */




var TRACK_WIDTH = 40;
var TRACK_HEIGHT = 40;
var TRACK_GAP = 2;
var TRACK_COLS = 20;
var TRACK_ROWS = 15;
var levelOne = [
  5, 5, 5, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 5,
  5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5,
  5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5,
  2, 0, 0, 6, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 1, 5,
  1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 5,
  2, 0, 6, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 5,
  1, 0, 1, 5, 1, 0, 0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 0, 1, 5, 5,
  2, 0, 1, 1, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1,
  1, 0, 6, 2, 0, 0, 0, 0, 0, 0, 6, 1, 0, 0, 0, 0, 0, 0, 2, 2,
  2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1,
  1, 0, 0, 2, 0, 2, 1, 2, 1, 2, 0, 0, 1, 1, 5, 1, 1, 0, 0, 2,
  2, 0, 0, 1, 1, 5, 5, 5, 5, 5, 1, 1, 5, 5, 5, 5, 6, 0, 0, 1,
  1, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 1, 6, 0, 0, 0, 2,
  2, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
  1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2
];
var trackGrid = [];
var TRACK_ROAD = 0;
var TRACK_WHITE_WALL = 1;
var TRACK_RED_WALL = 2;
var TRACK_PLAYERSTART = 3;
var TRACK_GOAL_LINE = 4;
var TRACK_TREE = 5;
var TRACK_FLAG = 6;

function drawTracks() {
  var arrayIndex = 0;
  var drawTileX = 0;
  var drawTileY = 0;
  var tileKind, useImg;
  for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
    for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

      tileKind = trackGrid[arrayIndex];

      useImg = trackPics[tileKind];

      canvasContext.drawImage(useImg, drawTileX, drawTileY);

      drawTileX += TRACK_WIDTH;

      arrayIndex++;
    } //end of for each col

    drawTileY += TRACK_HEIGHT;
    drawTileX = 0;
  } //END OF each Row
} //end of drawTracks function

function returnTileTypeAtColRow(col, row) {

  var trackIndexUnderCoord;
  if (col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS) {
    trackIndexUnderCoord = rowColToArrayIndex(col, row);
    return trackGrid[trackIndexUnderCoord];
  } else {
    return TRACK_WHITE_WALL;
  }

}

function carTrackHandling(whichCar) {
  var carTrackCol = Math.floor(whichCar.x / TRACK_WIDTH);
  var carTrackRow = Math.floor(whichCar.y / TRACK_HEIGHT);

  //MAKE SURE s IS IN BOUND
  if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
    carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
    var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow);
    if (tileHere === TRACK_GOAL_LINE) {
      console.log(whichCar.name + " WINS !!!");
      loadLevel(levelOne);

    } else if (tileHere != TRACK_ROAD) {
      whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
      whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;
      whichCar.speed *= -0.5;

    } //end of track found
  } //end of valid coll and row
} // end of carTrackHandling function


function rowColToArrayIndex(col, row) {
  return col + TRACK_COLS * row;
}
