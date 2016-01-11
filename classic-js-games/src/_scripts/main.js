  /**
   * GAMES Tutorials
   * - How to Program Games Tile Classics in JS for HTML5 Canvas
   * @TODO : WATCHING : 05 Finish Brick Gameplay - 001 Section Introduction -- 00min
   *
   */

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

  var BRICK_WIDTH = 80;
  var BRICK_HEIGHT = 40;
  var BRICK_GAP = 2;
  var BRICK_COLS = 10;
  var BRICK_ROWS = 7;
  var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);

  var PADDLE_WIDTH = 100;
  var PADDLE_THICKNESS = 10;
  var PADDLE_DIST_FROM_EDGE = 60;
  var paddleX = 400;

  var mouseX, mouseY;

  window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    brickReset(); //DRAWING BRICKS
    //ballReset(); //DRAWING BALL
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
    //Center the paddle cursor
    paddleX = mouseX - PADDLE_WIDTH / 2;


    //CHEAT / HACK to test ball in any position
    ballX = mouseX;
    ballY = mouseY;
    ballSpeedX = 3;
    ballSpeedY = -4;
  }

  function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5;
    ballSpeedY = 7;
  }

  function ballMove() {
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
  }


  function ballBrickHandling() {
    var ballBrickCol = Math.floor(ballX / BRICK_WIDTH);
    var ballBrickRow = Math.floor(ballY / BRICK_HEIGHT);
    var brickIndexUnderBall = rowColToArrayIndex(ballBrickCol, ballBrickRow);
    var prevBallX, prevBallY, prevBrickCol, prevBrickRow;
    var adjacentBrickSide,adjacentTopBottom;
    var bothTestsFailed = true;

    //MAKE SURE BALL IS IN BOUND
    if (ballBrickCol >= 0 && ballBrickCol < BRICK_COLS &&
      ballBrickRow >= 0 && ballBrickRow < BRICK_ROWS) {

      if (brickGrid[brickIndexUnderBall] === true) {

        brickGrid[brickIndexUnderBall] = false;

        prevBallX = ballX - ballSpeedX;
        prevBallY = ballY - ballSpeedY;
        prevBrickCol = Math.floor(prevBallX / BRICK_WIDTH);
        prevBrickRow = Math.floor(prevBallY / BRICK_HEIGHT);

        if (prevBrickCol != ballBrickCol) {
          adjacentBrickSide = rowColToArrayIndex(prevBrickCol,ballBrickRow);
          if(brickGrid[adjacentBrickSide] === false){
            ballSpeedX *= -1;
            bothTestsFailed = false;
          }//end of if has an adjacent brick
        }//end of bricks changes Col

        if (prevBrickRow != ballBrickRow) {
          adjacentTopBottom = rowColToArrayIndex(ballBrickCol,prevBrickRow);
          if(brickGrid[adjacentTopBottom] === false){
            ballSpeedY *= -1;
            bothTestsFailed = false;
          }//end of if has an adjacent brick
        }//end of bricks changes Row

        if(bothTestsFailed === true){//prevent ball to go right through if two previous test failed
          ballSpeedX *= -1;
          ballSpeedY *= -1;

        }//end of both test failed
      } //end of brick found
    } //end of valid coll and row
  } // end of ballBrickHandling function

  function ballPaddleHandling() {
    var paddleTopEdgeY = canvas.height - PADDLE_DIST_FROM_EDGE;
    var paddleBottomEdgeY = paddleTopEdgeY + PADDLE_THICKNESS;
    var paddleLeftEdgeX = paddleX;
    var paddleRightEdgeX = paddleLeftEdgeX + PADDLE_WIDTH;
    var centerOfPaddleX, ballDistFromPaddleCenterX;

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

    } // ball is in paddle
  } // end of ballPaddleHandling function

  function moveAll() {
    ballMove();
    ballBrickHandling();
    ballPaddleHandling();
  }



  function drawAll() {
    //canvas
    colorRect(0, 0, canvas.width, canvas.height, 'black'); //clear Screen
    colorCircle(ballX, ballY, 10, 'red'); //draw ball

    //paddle
    colorRect(paddleX, canvas.height - PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS, 'white');

    //bricks
    drawBricks();



  }




  function brickReset() {
    for (var i = 0; i < BRICK_COLS * BRICK_ROWS; i++) {
      // if (Math.random() < 0.5) { //COIN FLIP
      //   brickGrid[i] = true;
      // } else {
      //   brickGrid[i] = false;
      //} //end of else (random check)
      brickGrid[i] = true;

    } //end of each brick

  } //end of brickReset function


  function rowColToArrayIndex(col, row) {
    return col + BRICK_COLS * row;
  }

  function drawBricks() {
    var arrayIndex;
    for (var eachRow = 0; eachRow < BRICK_ROWS; eachRow++) {
      for (var eachCol = 0; eachCol < BRICK_COLS; eachCol++) {
        arrayIndex = rowColToArrayIndex(eachCol, eachRow);
        if (brickGrid[arrayIndex] === true) {
          colorRect(BRICK_WIDTH * eachCol, BRICK_HEIGHT * eachRow, BRICK_WIDTH - BRICK_GAP, BRICK_HEIGHT - BRICK_GAP, 'blue');
        } //end of if this brick
      } //end of for each col
    } //END OF each Row
  } //end of drawBricks function

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