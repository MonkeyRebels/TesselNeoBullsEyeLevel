var Neopixels       = require('neopixels');
var tessel          = require('tessel');
var accel           = require('accel-mma84').use(tessel.port['A']); 

var neopixels       = new Neopixels();

var nrOfLeds        = 16;
var buffersize      = nrOfLeds*3;

var ledBuffer       = new Buffer(buffersize);

var tolerance       = 0.2;

var standardColor   = 'green';

//center positions of the leds. Using wind directions for easy reading instead of left,right.
var south = 0;
var southeast = 2;
var east = 4;
var northeast = 6;
var north = 8;
var northwest = 10;
var west = 12;
var southwest = 14;

//color array syntax: centercolor, 4 color to the right of the center, 4 colors to the left of the center
var level0colorArray = new Array('green','green','green','green','green','green','green','green','green')
var level1colorArray = new Array('red','orange','green','green','green','orange','green','green','green')
var level2colorArray = new Array('red','orange','orange','green','green','orange','orange','green','green')
var level3colorArray = new Array('red','red','orange','orange','green','red','orange','orange','green')
var level4colorArray = new Array('red','red','red','orange','orange','red','red','orange','orange')
var level5colorArray = new Array('red','red','red','red','red','red','red','red','red')
  
//initialize
level(ledBuffer,level0colorArray); //special level call.. all green!
neopixels.animate(nrOfLeds, ledBuffer);

neopixels.on('end', function() {
  neopixels.animate(nrOfLeds, ledBuffer);
});

//TODO: When the config button is pressed, calibrate xyz.

accel.on('ready', function(){
  accel.on('data', function(xyz){
    // Refresh variables;
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];

    //base, all level
    setColorArray(x,y,0,level0colorArray,0,0);
    
    setColorArray(x,y,south,level1colorArray,-0.2,0);
    setColorArray(x,y,south,level2colorArray,-0.4,0);
    setColorArray(x,y,south,level3colorArray,-0.6,0);
    setColorArray(x,y,south,level4colorArray,-0.8,0);
    setColorArray(x,y,south,level5colorArray,-1.0,0);

    setColorArray(x,y,southeast,level1colorArray,-0.1,-0.1);
    setColorArray(x,y,southeast,level2colorArray,-0.2,-0.2);
    setColorArray(x,y,southeast,level3colorArray,-0.3,-0.3);
    setColorArray(x,y,southeast,level4colorArray,-0.4,-0.4);
    setColorArray(x,y,southeast,level5colorArray,-0.5,-0.5);

    setColorArray(x,y,east,level1colorArray,0,-0.2);
    setColorArray(x,y,east,level2colorArray,0,-0.4);
    setColorArray(x,y,east,level3colorArray,0,-0.6);
    setColorArray(x,y,east,level4colorArray,0,-0.8);
    setColorArray(x,y,east,level5colorArray,0,-1.0);
   
    setColorArray(x,y,northeast,level1colorArray,0.1,-0.1);
    setColorArray(x,y,northeast,level2colorArray,0.2,-0.2);
    setColorArray(x,y,northeast,level3colorArray,0.3,-0.3);
    setColorArray(x,y,northeast,level4colorArray,0.4,-0.4);
    setColorArray(x,y,northeast,level5colorArray,0.5,-0.5);

    setColorArray(x,y,north,level1colorArray,0.2,0);
    setColorArray(x,y,north,level2colorArray,0.4,0);
    setColorArray(x,y,north,level3colorArray,0.6,0);
    setColorArray(x,y,north,level4colorArray,0.8,0);
    setColorArray(x,y,north,level5colorArray,1.0,0);

    setColorArray(x,y,northwest,level1colorArray,0.1,0.1);
    setColorArray(x,y,northwest,level2colorArray,0.2,0.2);
    setColorArray(x,y,northwest,level3colorArray,0.3,0.3);
    setColorArray(x,y,northwest,level4colorArray,0.4,0.4);
    setColorArray(x,y,northwest,level5colorArray,0.5,0.5);

    setColorArray(x,y,west,level1colorArray,0,0.2);
    setColorArray(x,y,west,level2colorArray,0,0.4);
    setColorArray(x,y,west,level3colorArray,0,0.6);
    setColorArray(x,y,west,level4colorArray,0,0.8);
    setColorArray(x,y,west,level5colorArray,0,1.0);

    setColorArray(x,y,southwest,level1colorArray,-0.1,0.1);
    setColorArray(x,y,southwest,level2colorArray,-0.2,0.2);
    setColorArray(x,y,southwest,level3colorArray,-0.3,0.3);
    setColorArray(x,y,southwest,level4colorArray,-0.4,0.4);
    setColorArray(x,y,southwest,level5colorArray,-0.5,0.5);

    //test output
    console.log('X:',x,"  Y:",y,"  total:",x+y);
  
  });
});


function level(buf,centerpos,colorArray) {
   
  if (colorArray == null) colorArray = level5colorArray;

  for (var i = centerpos-4; i < centerpos-4+nrOfLeds;i++){

    if (i == centerpos){
      makeColor(buf,i,colorArray[0]);
    }

    else if (i == centerpos-1) {
      makeColor(buf,i,colorArray[1]);
    }

    else if (i == centerpos-2) {
      makeColor(buf,i,colorArray[2]);
    }

    else if (i == centerpos-3) {
      makeColor(buf,i,colorArray[3]);
    }

    else if (i == centerpos-4) {
      makeColor(buf,i,colorArray[4]);
    }

    else if (i == centerpos+1) {
      makeColor(buf,i,colorArray[5]);
    }

    else if (i == centerpos+2) {
      makeColor(buf,i,colorArray[6]);
    }

    else if (i == centerpos+3) {
      makeColor(buf,i,colorArray[7]);
    }

    else if (i == centerpos+4) {
      makeColor(buf,i,colorArray[8]);
    }
    else {
      //standard color
      makeColor(buf,i,standardColor);
    }

  }
  
}

//pos = green
//pos + 1 = red
//pos + 2 = blue
function makeColor(buf,pos,color) {

  if (pos >= nrOfLeds) { //if pos 17 .pos 16-16
    pos = pos - nrOfLeds;
  }

  if (pos < 0) { //if pos is -1 pos -1 + 16 = 15
    pos = pos + nrOfLeds;
  }

 switch (color) {

  case 'red':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;

  case 'orange':
    buf[(pos*3)] = 128;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;


  case 'yellow':
    buf[(pos*3)] = 255;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;

  case 'green':
    buf[(pos*3)] = 255;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 0;
    break;

  case 'blue':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 255;
    break;

  case 'violet':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 255;
    break;

  default: //green
    buf[(pos*3)] = 255;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 0;

 }
}


function setColorArray(x,y,centerpos,intended_colorArray,limit_x,limit_y) {
  
   var currentcolorlevel = null;
   
   if  ( 
          (x >= (limit_x-tolerance) && x <= (limit_x+tolerance)) &&
          (y >= (limit_y-tolerance) && y <= (limit_y+tolerance))
        ) {
        
        currentcolorlevel = intended_colorArray;
    }
    
    if (currentcolorlevel != null) { //only set the level if we measured something
        level(ledBuffer,centerpos, currentcolorlevel);
     }
    
}