// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

//var $ = require('jquery');
//var Link = require('../_modules/link/link');

//$(function() {
// new Link(); // Activate Link modules logic

//});
var canvas, canvasContext;
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;
var speedDillutionFactor = 0.35;


var PADDLE_WIDTH = 100;
var PADDLE_THICKNESS = 10;
var PADDLE_DIST_FROM_EDGE = 60;

var paddleX = 400;

function updateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  var mouseX = evt.clientX - rect.left - root.scrollLeft; //fix for handling scroll X
  //var mouseY = evt.clientY - rect.top - root.scrollTop;//fix for handling scroll Y
  //Center the paddle cursor
  paddleX = mouseX - PADDLE_WIDTH / 2;

}

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  var framesPerSecond = 30;
  setInterval(updateAll, 1000 / framesPerSecond);

  canvas.addEventListener('mousemove', updateMousePos);
};

function updateAll() {
  moveAll();
  drawAll();
}

function ballReset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = 5;
  ballSpeedY = 7;
}

function moveAll() {
  var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
  var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
  var paddleLeftEdgeX = paddleX;
  var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
  var centerOfPaddleX,
    ballDistFromPaddleCenterX;


  ballX += ballSpeedX; // Same as ballX = ballX + ballSpeedX;
  ballY += ballSpeedY; // Same as ballY = ballY + ballSpeedY;

  if (ballX < 0) {
    ballSpeedX *= -1; //same as ballSpeedX = ballSpeedX * -1;
  }

  if (ballX > canvas.width) {
    ballSpeedX *= -1; //same as ballSpeedX = ballSpeedX * -1;
  }

  if (ballY < 0) {
    ballSpeedY *= -1; //same as ballSpeedY = ballSpeedY * -1;
  }

  if (ballY > canvas.height) {
    // ballSpeedY *= -1;
    ballReset();
  }

  //PADDLE AND BALL INTERCEPTION
  if (ballY > paddleTopEdgeY && //below the top of paddle
    ballY < paddleBottomEdgeY && //above bottom of paddle
    ballX > paddleLeftEdgeX && //right of the left side of paddel
    ballX < paddleRightEdgeX //left of the right side of paddel
  ) {
    ballSpeedY *= -1;
    centerOfPaddleX = paddleX + PADDLE_WIDTH / 2;
    ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
    ballSpeedX = ballDistFromPaddleCenterX * speedDillutionFactor;

  }
}

function drawAll() {
  //canvas
  colorRect(0, 0, canvas.width, canvas.height, 'black'); //clear Screen
  colorCircle(ballX, ballY, 10, 'red'); //draw ball

  //paddle
  colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');
}

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
