"use strict";

define(['State', 'Assets'], function(State, Assets) {

  var GameState = State.extend({
    init: function() {
      this._super(); // Runs the constructor from the parent class -- From the libs/class.js util
    }
  });

  State.prototype.tick = function(_deltaTime) {

  };
  State.prototype.render = function(_g) {
    _g.myDrawImage(Assets.getAssets("mario").idle, 20, 20, Assets.getAssets("mario").width, Assets.getAssets("mario").height);
  };

  return GameState;
});
