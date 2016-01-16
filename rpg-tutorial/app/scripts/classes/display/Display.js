define(['jquery', 'Class'], function($, Class) {
  var canvas, title, width, height, graphics;


  var Display = Class.extend({
    init: function(_title, _width, _height) {
      title = _title;
      width = _width;
      height = _height;


      createDisplay();
    }
  });

  //Private Method
  function createDisplay() {
    document.title = title;
    var body = document.body;
    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style.width = width;
    canvas.style.height = height;
    body.appendChild(canvas);
    graphics = document.getElementById('canvas').getContext("2d");
  }


  //Getters
  Display.prototype.getWidth = function() {
    return width;
  };

  Display.prototype.getHeight = function() {
    return height;
  };

  Display.prototype.getTitle = function() {
    return title;
  };

  Display.prototype.getGraphics = function() {
    return graphics;
  };

  CanvasRenderingContext2D.prototype.myDrawImage = function(asset, _x, _y, _width, _height) {
    this.drawImage(asset.sheet, asset.x, asset.y, asset.width, asset.height,_x,_y,_width,_height);
  };



  return Display;

});
