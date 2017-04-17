
var canvas = document.getElementById('soccerCanvas');
var context= canvas.getContext('2d');

var paddle1 = {x:10, y:337, width:20, height:25, color:'blue'};
var paddle2 = {x:1270, y:337, width:20, height:25, color:'red'};

var ball = {x: 650, y: 350, dx: 7, dy:3, radius: 10, color: 'white'};

var homeScore = 0;
var visitorScore = 0;
var t;
var timer_is_on2 = 0;

var enemy = [{x:1000, y:190, width:20, height:25, color:'#aaff00'},
             {x:1000, y:290, width:20, height:25, color:'#aaff00'},
             {x:1000, y:390, width:20, height:25, color:'#aaff00'},
             {x:1000, y:490, width:20, height:25, color:'#aaff00'},
             {x:850, y:190, width:20, height:25, color:'#aaff00'},
            {x:850, y:290, width:20, height:25, color:'#aaff00'},
            {x:850, y:390, width:20, height:25, color:'#aaff00'},
            {x:850, y:490, width:20, height:25, color:'#aaff00'},
            {x:700, y:290, width:20, height:25, color:'#aaff00'},
            {x:700, y:390, width:20, height:25, color:'#aaff00'}];

function draw()
{
  context.clearRect(0,0,1300,600);

  //scoreboard
  context.fillStyle = "black";
  context.fillRect(0, 0, 1300, 100);

  //scoreboard
  context.fillStyle = "green";
  // context.fillStyle = "#29a329";
  context.fillRect(0, 100, 1300, 500);

  //home team score
  context.font="60px Georgia";
  context.fillStyle = "yellow";
  context.fillText("Soccer Defender" ,430,70);

  context.font="40px Georgia";
  context.fillText("Home" ,20,60);

  context.font="70px Georgia";
  context.fillText(homeScore ,170,68);

  //visitors team score

  context.font="70px Georgia";
  context.fillText(visitorScore ,1050,68);

  context.font="40px Georgia";
  context.fillText("Visitors" ,1140,60);

  //centre faceoff circle
  context.beginPath();
  context.arc(650, 350, 80, 0, Math.PI*2, true);
  context.closePath();
  context.lineWidth = 5;
  context.strokeStyle = "white";
  context.stroke();

  // small white faceoff dot at midfield
  context.beginPath();
  context.arc(650, 350, 7, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = "white";
  context.fill();

  // white line through middle of the field
  context.fillStyle = "white";
  context.fillRect(647, 100, 6, 500);

  // outer goal left goal crease
  context.beginPath();
  context.moveTo(0, 180);
  context.lineTo(220, 180);
  context.lineTo(220, 520);
  context.lineTo(0, 520);
  context.stroke();

  // outer goal right goal crease
  context.beginPath();
  context.moveTo(1300, 180);
  context.lineTo(1080, 180);
  context.lineTo(1080, 520);
  context.lineTo(1300, 520);
  context.stroke();

  // inner goal left goal crease
  context.beginPath();
  context.moveTo(0, 260);
  context.lineTo(110, 260);
  context.lineTo(110, 440);
  context.lineTo(0, 440);

  context.fillStyle = '#00e673';
  context.fill();

  context.stroke();

  // inner goal right goal crease
  context.beginPath();
  context.moveTo(1300, 260);
  context.lineTo(1190, 260);
  context.lineTo(1190, 440);
  context.lineTo(1300, 440);

  context.fillStyle = '#00e673';
  context.fill();
  context.stroke();

  // small white left penalty spot
  context.beginPath();
  context.arc(165, 350, 5, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = "white";
  context.fill();

  // small white right penalty spot
  context.beginPath();
  context.arc(1135, 350, 5, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = "white";
  context.fill();

  // upper left corner arc
  context.beginPath();
  context.arc(0, 100, 30, 0, Math.PI/2, false);
  context.strokeStyle = "white";
  context.stroke();

  // bottom left corner arc
  context.beginPath();
  context.arc(0, 600, 30, 0, Math.PI*3/2, true);
  context.strokeStyle = "white";
  context.stroke();

  // upper right corner arc
  context.beginPath();
  context.arc(1300, 100, 30, Math.PI/2, Math.PI, false);
  context.strokeStyle = "white";
  context.stroke();

  // bottom left corner arc
  context.beginPath();
  context.arc(1300, 600, 30, Math.PI, Math.PI*3/2, false);
  context.strokeStyle = "white";
  context.stroke();

  // outer left goal crease half arc
  context.beginPath();
  context.arc(220, 350, 90, Math.PI*3/2, Math.PI*1/2, false);
  context.strokeStyle = "white";
  context.stroke();

  // outer right goal crease half arc
  context.beginPath();
  context.arc(1080, 350, 90, Math.PI*3/2, Math.PI*1/2, true);
  context.strokeStyle = "white";
  context.stroke();


  //paddles
  context.fillStyle = paddle1.color;
  context.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  context.fillStyle = paddle2.color;
  context.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = ball.color;
  context.fill()

  var plusOrNeg1 = Math.random() < 0.5 ? -1: 1;

  if (ball.x<=10)  {
      if (ball.y > 260 && ball.y < 440 ) {
      ball.dx = Math.random() * 10 + 3;
      ball.dy = (Math.random() * 7 + 4) * plusOrNeg1;

      visitorScore += 1;
      ball.dx = -ball.dx;
      ball.x = 650;
      ball.y = 350;
      }
      else {
      ball.dx = -ball.dx;
      ball.x = 10;
      }
  }

  if (ball.x>=1290) {

    if (ball.y > 260 && ball.y < 440 ) {
      ball.dx = Math.random() * 10 + 3;
      ball.dx = -ball.dx;
      ball.dy = (Math.random() * 7 + 4) * plusOrNeg1;

      homeScore += 1;

      ball.x = 650;
      bally.y = 350;
    }
    else {
      ball.dx = -ball.dx;
      ball.x = 1290;
    }

  }
  if (ball.y<=110 || ball.y >= 590) {
    ball.dy = -ball.dy;
  }
  paddleCollision();
  drawEnemy();
  enemyCollision();
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function drawEnemy() {
  for (var i = 0; i < enemy.length; i++) {
    context.fillStyle = enemy[i].color;
    context.fillRect(enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height);
  }
}

function enemyCollision() {
  for (var i = 0; i < enemy.length; i++) {
    if ( (ball.dx >= 0) && (ball.x >= enemy[i].x - ball.radius) && (ball.x <= enemy[i].x + enemy[i].width/2)
    && (ball.y >= enemy[i].y - ball.radius) && (ball.y <= enemy[i].y + enemy[i].height + ball.radius) ) {
      var plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
      ball.dx = Math.random() * 20 + 3;
      ball.dx = -ball.dx;

      ball.dy = (Math.random() * 7 + 3) * plusOrNeg1;

    } else if ( (ball.dx < 0) && (ball.x > enemy[i].x + enemy[i].width - ball.radius) && (ball.x <= enemy[i].x + enemy[i].width + ball.radius)
    && (ball.y >= enemy[i].y - ball.radius) && (ball.y <= enemy[i].y + enemy[i].height + ball.radius)  ) {
      ball.dx = -ball.dx;

      ball.dy = (Math.random() * 7 + 3);
    }

  }
}

function paddleCollision() {
  if ( (ball.dx > 0) && (ball.x >= (paddle2.x - ball.radius)) && (ball.x <= (paddle2.x + paddle2.width)) &&
      (ball.y >= (paddle2.y - ball.radius)) && (ball.y <= (paddle2.y + paddle2.height + ball.radius)) ){
    ball.dx = -ball.dx;
  }

  else if ( (ball.dx < 0) && (ball.x <= (paddle1.x + paddle1.width + ball.radius)) && (ball.x >= (paddle1.x)) &&
      (ball.y >= (paddle1.y - ball.radius)) && (ball.y <= (paddle1.y + paddle1.height + ball.radius)) ){
    ball.dx = -ball.dx;
  }
}

document.onkeydown = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
  e.preventDefault();
}
    switch (e.keyCode) {
        case 40:
            paddle1.y += 15;
            if (paddle1.y >= 575) {
              paddle1.y = 575;
          }
            break;
        case 38:
            paddle1.y -= 15;
            if (paddle1.y <= 100) {
              paddle1.y = 100;
            }
            break;
    }
};

function stop() {
    clearInterval(t);
    timer_is_on2 = 0;
}

function start() {
  if (!timer_is_on2) {
      timer_is_on2 = 1;
      t = setInterval(draw,20);
  }
}

function restart() {
  timer_is_on2 = 1;
  clearInterval(t);

  paddle1 = {x:10, y:337, width:20, height:25, color:'blue'};
  paddle2 = {x:1270, y:337, width:20, height:25, color:'red'};

  ball = {x: 650, y: 350, dx: 7, dy:3, radius: 10, color: 'white'};

  homeScore = 0;
  visitorScore = 0;

  t = setInterval(draw,20);
}

draw();
