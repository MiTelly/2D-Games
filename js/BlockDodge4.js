let canvas = document.getElementById('blockDodgeCanvas');
let ctx= canvas.getContext('2d');

let player = {x: 20, y: 325, width: 50, height:50, color: 'lime'};

let blocksDown = [{x: 100, y: 100, width: 100, height:100, dx: 0, dy: 3, color: 'blue'},
                  {x: 250, y: 150, width: 100, height:100, dx: 0, dy: 4, color: 'blue'},
                  {x: 400, y: 200, width: 100, height:100, dx: 0, dy: 4, color: 'blue'},
                  {x: 550, y: 300, width: 100, height:100, dx: 0, dy: 1, color: 'blue'},
                  {x: 700, y: 350, width: 100, height:100, dx: 0, dy: 2, color: 'blue'}];
let t;
let homeScore = 0;

let timerConstant = 70;

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  scoreboard();
  playerMove();
  drawBlocksDown();
  collision();
}

function scoreboard() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, 960, 100);

  ctx.font="60px Georgia";
  ctx.fillStyle = "yellow";
  ctx.fillText("Block Dodge" ,505,70);

  ctx.font="40px Georgia";
  ctx.fillText("Score" ,70,64);

  ctx.font="70px Georgia";
  ctx.fillText(homeScore,240,67);
}

function playerMove() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBlocksDown() {

  for (let i=0; i<blocksDown.length; i++) {
      ctx.fillStyle = blocksDown[i].color;
      ctx.fillRect(blocksDown[i].x, blocksDown[i].y, blocksDown[i].width, blocksDown[i].height);
      blocksDown[i].y += blocksDown[i].dy;

      if (blocksDown[i].y + blocksDown[i].height >= canvas.height) {
        blocksDown[i].y = 100;
        blocksDown[i].x = Math.random() * 700 + 100;
      }
  }
}

function collision() {
  for(let i=0; i < blocksDown.length; i++) {
    if (player.x >= blocksDown[i].x && player.x <= blocksDown[i].x + blocksDown[i].width &&
        player.y >= blocksDown[i].y && player.y <= blocksDown[i].y + blocksDown[i].height) {
          console.log("Collision");
          player.x = 20;
          homeScore -= 5;
    } else if (player.x + player.width >= blocksDown[i].x && player.x + player.width <= blocksDown[i].x + blocksDown[i].width &&
        player.y >= blocksDown[i].y && player.y <= blocksDown[i].y + blocksDown[i].height) {
          console.log("Collision top right");
          player.x = 20;
          homeScore -= 5;
    } else if (player.x + player.width >= blocksDown[i].x && player.x + player.width <= blocksDown[i].x + blocksDown[i].width &&
        player.y + player.height >= blocksDown[i].y && player.y + player.height <= blocksDown[i].y + blocksDown[i].height) {
          console.log("Collision bottom right");
          player.x = 20;
          homeScore -= 5;
    }else if (player.x >= blocksDown[i].x && player.x <= blocksDown[i].x + blocksDown[i].width &&
        player.y + player.height >= blocksDown[i].y && player.y + player.height <= blocksDown[i].y + blocksDown[i].height) {
          console.log("Collision bottom left");
          player.x = 20;
          homeScore -= 5;
    }
  }
}

document.onkeydown = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
  e.preventDefault();
  }
    switch (e.keyCode) {

        case 37:
            player.x -= 15;
            if (player.x <= 0) {
              player.x = 0;
            }
            break;

        case 38:
            player.y -= 15;
            if (player.y <= 100) {
              player.y = 100;
            }
            break;

        case 39:
            player.x += 15;

            if (player.x >= canvas.width - player.width) {
              player.x = 20;
              homeScore += 10;
              clearInterval(t);
              timerConstant -= 5;
              t = setInterval(draw, timerConstant);
            }
            break;

        case 40:
            player.y += 15;

            if (player.y >= canvas.height - player.height) {
              player.y = canvas.height - player.height;
            }
            break;
    }
};

t = setInterval(draw,timerConstant);
