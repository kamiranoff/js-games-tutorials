/**
 * Created by kevin on 12/01/16.
 * Watching : Beginner 2d Game Programming [JS] - 2 (Canvas) - 00:00
 * url : https://www.youtube.com/watch?v=R1cvZE_8y_Q&index=2&list=PLX96T4AVTGy5wYIlbZYaFeFG8jnPNakBP
 */


// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.

requirejs.config({
  "baseUrl":"scripts/",
  "paths":{

    //librairies
    "Class":"libs/class",
    "jquery":"../node_modules/jquery/dist/jquery",

    //Classes
    "Assets":"classes/gfx/Assets",
    "Display":"classes/display/Display",
    "Game":"classes/Game",
    "ImageLoader":"classes/gfx/ImageLoader",
    "Launcher":"classes/Launcher",
    "SpriteSheet":"classes/gfx/SpriteSheet"
  }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['main']);
