/**
 * GAMES Tutorials
 * Image loading
 *
 */

'use strict';

var carPic = document.createElement('img');
var otherCarPic = document.createElement('img');
var trackPics = [];
var picsToLoad = 0; //set automatically on based on imageList on loadImages()

function countLoadedImagesAndStartGame() {
  picsToLoad--;
  if (picsToLoad === 0) {
    startGame();
  }
}

function loadImagesForTrackCode(trackCode,fileName){
  trackPics[trackCode] = document.createElement('img');
  beginLoadingImage(trackPics[trackCode],fileName);
}


function beginLoadingImage(imgVar, fileName) {

  imgVar.onload = countLoadedImagesAndStartGame;
  imgVar.src = fileName;
}

function loadImages() {
  var imageList = [{
    varName: carPic,
    fileName: "images/red-car.png"
  },{
    varName: otherCarPic,
    fileName: "images/blue-car.png"
  }, {
    trackType: TRACK_ROAD,
    fileName: "images/track.jpg"
  }, {
    trackType: TRACK_WHITE_WALL,
    fileName: "images/track_wall_white.jpg"
  }, {
    trackType: TRACK_RED_WALL,
    fileName: "images/track_wall_red.jpg"
  },{
    trackType: TRACK_GOAL_LINE,
    fileName: "images/goal_line.jpg"
  }, {
    trackType: TRACK_TREE,
    fileName: "images/trees.jpg"
  },{
    trackType: TRACK_FLAG,
    fileName: "images/flag.jpg"
  }];

  picsToLoad = imageList.length;

  for (var i = imageList.length - 1; i >= 0; i--) {
    if(imageList[i].varName !== undefined){
      beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
    loadImagesForTrackCode(imageList[i].trackType,imageList[i].fileName);
  };

}
