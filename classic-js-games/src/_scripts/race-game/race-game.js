'use strict';

/**
 * RACE GAME JS
 * Requires =
 * ../graphics-commons.js
 * Car.js
 * Track.js
 * Input.js
 */

var canvas, canvasContext;

var redCar = new CarClass();
var blueCar = new CarClass();


window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  colorRect(0, 0, canvas.width, canvas.height, "black");
  colorText("Loading game", canvas.width / 2, canvas.height / 2, "white");

  loadImages();
};


function startGame() {
  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  setupInput();
  loadLevel(levelOne);

}

function loadLevel(whichLevel) {
  trackGrid = whichLevel.slice();
  blueCar.reset(otherCarPic, "Super blue Car");
  redCar.reset(carPic, "Rusty old Red car"); //DRAWING CAR
}

function updateAll() {
  moveAll();
  drawAll();
}

function moveAll() {
  blueCar.move();
  redCar.move();

}

function clearScreen() {
  colorRect(0, 0, canvas.width, canvas.height, '#666');
}

function drawAll() {
  //canvas
  //clearScreen(); //Not needed cause drawTracks redraw tracks everytime
  //tracks
  drawTracks();
  blueCar.draw();
  redCar.draw();


}
