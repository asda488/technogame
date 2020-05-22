var walking = true; 
var situation = "walking" //starts walking

//indexes
var lastfunction = ""
var speedcounter = 0
var walkindex = 0; //i need to do something with this

//keybooleans
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

//techno locations
var technowalkfront = [[39, 36, 74, 126], [135, 35, 75, 127], [230, 35, 76, 127]];  //113 162, 210 162, 306 162


//keyhandlers
function keyDownHandler(e) {
        if(e.keyCode == 39 || e.keycode == 68) {
            rightPressed = true;
        }
        else if(e.keyCode == 37 || e.keycode == 65) {
            leftPressed = true;
        }
        else if(e.keyCode == 38 || e.keycode == 87) {
        		upPressed = true;
        }
        else if(e.keyCode == 40 || e.keycode == 83) {
        		downPressed = true;
        }
    }
    function keyUpHandler(e) {
        if(e.keyCode == 39 || e.keycode == 68) {
            rightPressed = false;
        }
        else if(e.keyCode == 37 || e.keycode == 65) {
            leftPressed = false;
        }
        else if(e.keyCode == 38 || e.keycode == 87) {
        		upPressed = false;
        }
        else if(e.keyCode == 40 || e.keycode == 83) {
        		downPressed = false;
        }
    }


function main() {
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear screen
  if (situation == "walking") {
    drawTechno()
    drawLand()
  } //add else if
  speedcounter++; //tick the speed counter, very important
  requestAnimationFrame(main)
}

function loadAssets() {
  window.canvas = document.getElementById('canvas');
  window.ctx = canvas.getContext('2d');
	technospritesone = new Image();
  technospritesone.src = ('technosprites2.png'); //Load his sprites
	main()
}

//landscape functions
function drawLand(){
	//pass
}

function technoWalk(){
  //fix this to multi direction and location
  if (lastfunction == "technoWalkfront") {
    console.log("hi")
  	ctx.drawImage(technospritesone, technowalkfront[walkindex][0], technowalkfront[walkindex][1], technowalkfront[walkindex][2], technowalkfront[walkindex][3], 0, 0, technowalkfront[walkindex][2], technowalkfront[walkindex][3]);
  } else {
  	walkindex = 0;
    ctx.drawImage(technospritesone, technowalkfront[walkindex][0], technowalkfront[walkindex][1], technowalkfront[walkindex][2], technowalkfront[walkindex][3], 0, 0, technowalkfront[walkindex][2], technowalkfront[walkindex][3]);
  }
   console.log(walkindex)
  lastfunction = "technoWalkfront"
  if (speedcounter%8 === 0){
    	walkindex = (walkindex+1)%3;
  }
}

function drawTechno() {
	if (walking === true) {
  	technoWalk();
  } else {
  	//pass
	}
} 


window.addEventListener("load", loadAssets); //main function
