/**
 * Created by kevin on 12/01/16.
 * Watching : Beginner 2d Game Programming [JS] - 6 (Handler KeyManager)
 * url : https://www.youtube.com/watch?v=40aDsPYAeL8&index=6&list=PLX96T4AVTGy5wYIlbZYaFeFG8jnPNakBP
 */


// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

requirejs.config({
  "baseUrl":"scripts/",
   waitSeconds: 5000,
  "paths":{

    //librairies
    "Class":"libs/class",
    "jquery":"../node_modules/jquery/dist/jquery",

    //Classes
    "Assets":"classes/gfx/Assets",
    "Display":"classes/display/Display",
    "Game":"classes/Game",
    "GameState":"classes/States/GameState",
    "ImageLoader":"classes/gfx/ImageLoader",
    "Launcher":"classes/Launcher",
    "SpriteSheet":"classes/gfx/SpriteSheet",
    "State":"classes/States/State"
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);
