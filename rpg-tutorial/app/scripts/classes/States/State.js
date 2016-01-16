"use strict";
/**
 * Abstract Class
 */
define(['Class'], function(Class) {
  var currentState = null;

  var State = Class.extend({
    init: function() {

    }
  });

  State.prototype.tick = function(_deltaTime) {

  };
  State.prototype.render = function(g) {

  };


  State.getState = function() {
    return currentState;
  };

  State.setState = function(_state) {
    currentState = _state;
  };

  return State;
});
