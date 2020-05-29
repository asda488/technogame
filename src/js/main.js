var situation = "walking"; //starts walking

//coords 
var coords = [0, 0, 0, 0]; //x, y, dx, dy

//levelinfo
var currentlevel = levela;

//indexes
var lastfunction = "";
var speedcounter = 0;
var walkindex = 0; //i need to do something with this

//keybooleans
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

//techno sprite locations
var technowalkfront = [[39, 36, 74, 126], [135, 35, 75, 127], [230, 35, 76, 127]];  //113 162, 210 162, 306 162
var technowalkback = [[38, 179, 76, 127], [134, 179, 76, 127], [230, 179, 76, 127]]; //114 306, 210 306, 306 306
var technowalkleft = [[26, 323, 76, 127], [110, 323, 76, 127], [191, 323, 76, 127]]; //93 450, 177 450, 258 450
var technowalkright = [[35, 467, 76, 127], [116, 467, 76, 127], [200, 467, 76, 127]]; //102 594, 183 594, 267 594
var technoidlefront = [[368, 26, 76, 133], [464, 26, 76, 133], [368, 170, 76, 133], [464, 170, 76, 133],[368, 314, 76, 133],[464, 314, 76, 133]]; //444 159, 540 159, 444 303, 540 303, 444 447, 540 447
var technoidleback = [[368, 458, 76, 133], [464, 458, 76, 133]]; //444 591, 540 591

//subfunctions 
//function drawpicture(image, array, x, y) { //pass an image, an array format x, y, x2, y2 and then two numbers x postion and y postition
//  ctx.drawImage(image, array[0], array[1], array[2]-array[0], array[3]-array[1], x, y, array[2]-array[0], array[3]-array[1])
//}

//keyhandlers and listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("contextmenu", clearKeys, false);
document.addEventListener("visibilityChange", clearKeys, false);

function clearKeys(){
  rightPressed = false;
  leftPressed = false;
  downPressed = false;
  upPressed = false;
}

function keyDownHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = true;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = true;
    }
    else if(e.keyCode == 38 || e.keyCode == 87) {
    		upPressed = true;
    }
    else if(e.keyCode == 40 || e.keyCode == 83) {
    		downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39 || e.keyCode == 68) {
        rightPressed = false;
    }
    else if(e.keyCode == 37 || e.keyCode == 65) {
        leftPressed = false;
    }
    else if(e.keyCode == 38 || e.keyCode == 87) {
	upPressed = false;
    }
    else if(e.keyCode == 40 || e.keyCode == 83) {
	downPressed = false;
    }
}

function moveTechno() {
  if (rightPressed) {
    coords[2] = 5;
  } if (leftPressed){
    coords[2] = -5;
  } if (downPressed){
    coords[3] = 5;
  } if (upPressed) {
    coords[3] = -5;
  }
  //update post
  coords[0] += coords[2];
  coords[1] += coords[3];
}

//the main function
function main() {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear screen
  if (situation == "walking") { //to walk, do...
    moveTechno(); //detect keys
    drawLand(); //draw behind land
    detectCollisions(); //detect collisions
    drawTechno(); //draw techno
    drawTerrain(); //draw in front
    handleSpecial(); //handle special
    coords[2] = coords[3] = 0; //reset dx, dy
  } //add else if
  speedcounter = (speedcounter+1)%60;//tick the speed counter, very important
  requestAnimationFrame(main); //loop
}

//loading
function loadAssets() {
  window.canvas = document.getElementById('canvas');
  window.ctx = canvas.getContext('2d');
	technospritesone = new Image();
  technospritesone.src = ('img/technosprites2.png'); //Load his sprites
  var index;
  var picturekeys = Object.keys(mainlevelpictures);//update for all scripts, loads all other pictures
  for (index = 0; index<picturekeys.length; index++) {
    window[picturekeys[index]] = new Image();
    window[picturekeys[index]].src = ("levels/img/" + mainlevelpictures[picturekeys[index]]); //delete levels/img/ as necessary;
  }
  //schlattsprites = new Image();
  //schlattsprites.src = ('img/schlattsprites.png');
  //landelementsone = new Image();
  //landelementsone.src = ('img/technoresources1.png'); //load the scenery
  main(); //call main function
}

//landscape functions
function drawLand(){
	//pass
}

function handleSpecial(){
 //pass 
}

function drawTerrain(){ //draws in front of techno - things that can block him.
  var index;
  for (index = 0; index<currentlevel.terrain.length; index++){
    var terrainprocess = currentlevel.terrain[index];
    //console.log(window[terrainprocess.type[0]]);
    ctx.drawImage(window[terrainprocess.type[0]], terrainprocess.type[1], terrainprocess.type[2], terrainprocess.type[3], terrainprocess.type[4], terrainprocess.x, terrainprocess.y, terrainprocess.type[3], terrainprocess.type[4]);
  }
}

//techno walk functions
function drawTechno() {
	
  //fix this to multi direction and location and modular
  if (downPressed) {
    if (lastfunction != "technoWalkfront") {
  	  walkindex = 0;	
    }
	ctx.drawImage(technospritesone, technowalkfront[walkindex][0], technowalkfront[walkindex][1], technowalkfront[walkindex][2], technowalkfront[walkindex][3], coords[0], coords[1], technowalkfront[walkindex][2], technowalkfront[walkindex][3]);
  lastfunction = "technoWalkfront";
  if (speedcounter%12 === 0){
    walkindex = (walkindex+1)%3;
  }
  } else if (upPressed) {
      if (lastfunction != "technoWalkback") {
  	    walkindex = 0;	
    }
	ctx.drawImage(technospritesone, technowalkback[walkindex][0], technowalkback[walkindex][1], technowalkback[walkindex][2], technowalkback[walkindex][3], coords[0], coords[1], technowalkback[walkindex][2], technowalkback[walkindex][3]);
  lastfunction = "technoWalkback";
  if (speedcounter%12 === 0){
    walkindex = (walkindex+1)%3;
  }
  } else if (leftPressed) {
      if (lastfunction != "technoWalkleft") {
  	    walkindex = 0;	
    }
	ctx.drawImage(technospritesone, technowalkleft[walkindex][0], technowalkleft[walkindex][1], technowalkleft[walkindex][2], technowalkleft[walkindex][3], coords[0], coords[1], technowalkleft[walkindex][2], technowalkleft[walkindex][3]);
  lastfunction = "technoWalkleft";
  if (speedcounter%12 === 0){
    walkindex = (walkindex+1)%3;
  }
  } else if (rightPressed) {
      if (lastfunction != "technoWalkright") {
    	  walkindex = 0;	
    }
	ctx.drawImage(technospritesone, technowalkright[walkindex][0], technowalkright[walkindex][1], technowalkright[walkindex][2], technowalkright[walkindex][3], coords[0], coords[1], technowalkright[walkindex][2], technowalkright[walkindex][3]);
  lastfunction = "technoWalkright";
  if (speedcounter%12 === 0){
    walkindex = (walkindex+1)%3;
  }
  } else {
    if (lastfunction != "technoIdlefront" && lastfunction != "technoIdleback"){
      walkindex = 0;
    }
    if (lastfunction == "technoWalkback" || lastfunction == "technoIdleback") { //were you facing back or front?
      ctx.drawImage(technospritesone, technoidleback[walkindex][0], technoidleback[walkindex][1], technoidleback[walkindex][2], technoidleback[walkindex][3], coords[0], coords[1], technoidleback[walkindex][2], technoidleback[walkindex][3]);
      lastfunction = "technoIdleback";
      if (speedcounter%12 === 0){
        walkindex = (walkindex+1)%2;
      }
    } else {
      ctx.drawImage(technospritesone, technoidlefront[walkindex][0], technoidlefront[walkindex][1], technoidlefront[walkindex][2], technoidlefront[walkindex][3], coords[0], coords[1], technoidlefront[walkindex][2], technoidlefront[walkindex][3]);
      lastfunction = "technoIdlefront";
      if (speedcounter%12 === 0){
        walkindex = (walkindex+1)%6;
      }
    }
  }
}

function detectCollisions() { //detects collisions
  if (coords[0] > 500){ //firstly, off page?
    coords[0] = 500;
    coords[2] = 0;
  }
  if (coords[0] < 0) {
    coords[0] = 0;
    coords[2] = 0;
  }
  if (coords[1] > 449) {
    coords[1] = 449;
    coords[3] = 0;
  }
  if (coords[1] < 0) {
    coords[1] = 0;
    coords[3] = 0;
  }
}

window.addEventListener("load", loadAssets); //main function caller
