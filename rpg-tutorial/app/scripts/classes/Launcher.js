"use strict";

/**
 * Created by kevin on 12/01/16.
 */
define(['Class','Game'], function (Class,Game) {
  var Launcher = Class.extend({
    init:function(_title,_width,_height){//constructor method

      var game = new Game(_title,_width,_height);
      game.start();
    }
  });

  return Launcher;
});
