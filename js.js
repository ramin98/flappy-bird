var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var bird = new Image();

bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
bird.src = "img/bird.png";

var gap = 90;

var posX = 10;
var posY = 150; 
var grav = 1;
  
var score = 0;

document.addEventListener("keydown", up)

function up(){
	posY -= 20;
}

var pipe = [];

pipe[0] = {
	x: canvas.width,
	y: 0
}



function showGame() {
	context.drawImage(bg,0,0)
    for (var i = 0; i < pipe.length; i++) {
    	context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipeBottom,pipe[i].x,pipe[i].y + pipeUp.height + gap)

        pipe[i].x --;

        if(pipe[i].x == 125){
        	pipe.push({
        		x:canvas.width,
        		y:Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        	});
        };

        if(posX + bird.width >= pipe[i].x
           && posX <= pipe[i].x + pipeUp.width
           && (posY <= pipe[i].y + pipeUp.height
           || posY + bird.height >= pipe[i].y + pipeUp.height + gap) 
           || posY + bird.height >= canvas.height - fg.height) {
           location.reload(); 
           }


        if(pipe[i].x == 5){
    	score++;
    }
    };
    
   
    
    context.drawImage(fg, 0, canvas.height - fg.height)
    context.drawImage(bird, posX, posY)
    
    context.fillStyle = "black";
    context.font= "50px Verdana";
    context.fillText(score,10, canvas.height - 20);

    posY += grav;
    requestAnimationFrame(showGame)

};

bird.onload = showGame;

