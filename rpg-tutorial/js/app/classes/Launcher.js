/**
 * Created by kevin on 12/01/16.
 */
define(['Class','jquery'], function (Class) {
  var Launcher = Class.extend({
    init:function(_title){//constructor method
      document.title =_title;
    }
  });

  return Launcher;
});
