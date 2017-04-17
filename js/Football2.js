let canvas = document.getElementById('footballCanvas1');
let context= canvas.getContext('2d');

let ball = {x: 100, y: 365, dx: 10, dy: 10, radius: 25, color: 'navy'};

let enemy = [{x: 950, y: 150, dx: -10, dy: 5, radius: 25, color: 'lime'},
            {x: 950, y: 250, dx: -10, dy: -10, radius: 25, color: 'lime'},
            {x: 950, y: 350, dx: -10, dy: 5, radius: 25, color: 'lime'},
            {x: 950, y: 450, dx: -10, dy: -10, radius: 25, color: 'lime'},
            {x: 950, y: 550, dx: -10, dy: -6, radius: 25, color: 'lime'},
            {x: 1050, y: 250, dx: -10, dy: 10, radius: 25, color: 'lime'},
            {x: 1050, y: 350, dx: -10, dy: -4, radius: 25, color: 'lime'},
            {x: 1050, y: 450, dx: -10, dy: 9, radius: 25, color: 'lime'},
            {x: 1150, y: 250, dx: -10, dy:- 3, radius: 25, color: 'lime'},
            {x: 1150, y: 250, dx: -10, dy: 8, radius: 25, color: 'lime'},
            {x: 1150, y: 350, dx: -10, dy:- 6, radius: 25, color: 'lime'},
            {x: 1150, y: 450, dx: -10, dy: 5, radius: 25, color: 'lime'}];

let homeScore = 0;
let visitorScore = 0;
let timer_is_on2 = 0;
let t;

function draw()
{
  context.clearRect(0,0,1200,630);
  playingField();
  scoreboard();
  playerMove();
  enemyMove();
  collision();
}

function scoreboard() {

  //scoreboard
  context.fillStyle = "black";
  context.fillRect(0, 0, 1200, 100);

  context.font="60px Georgia";
  context.fillStyle = "yellow";
  context.fillText("Kickoff" ,505,70);

  context.font="40px Georgia";
  context.fillText("Home" ,70,64);

  context.font="70px Georgia";
  context.fillText(homeScore ,240,67);

  //visitors team score
  context.font="70px Georgia";
  context.fillText(visitorScore ,932,67);

  context.font="40px Georgia";
  context.fillText("Guest" ,1032,64);
}
function playerMove() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, true);
  context.closePath();
  context.fillStyle = ball.color;
  context.fill();
}

function collision() {
  enemy.forEach(function(enemyBall) {
    if (enemyBall.radius + ball.radius >= Math.sqrt((enemyBall.x - ball.x)*(enemyBall.x - ball.x)+
      (enemyBall.y - ball.y)*(enemyBall.y - ball.y) )) {
        visitorScore += 1;
        reset();
      }
    if (ball.x >= 1100) {
      homeScore += 2;
      reset();
    }
  });
}

function randomNumber() {
  Math.random() * 11;
}
function reset() {
  ball = {x: 100, y: 365, dx: 10, dy: 10, radius: 25, color: 'navy'};

  enemy = [{x: 950, y: 150, dx: - (Math.random()*11 + 5), dy: - (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 950, y: 200, dx: - (Math.random()*11 + 5), dy: (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 950, y: 300, dx: - (Math.random()*11 + 5), dy: -(Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 950, y: 400, dx: - (Math.random()*11 + 5), dy: (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 950, y: 500, dx: - (Math.random()*11 + 5), dy: -(Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1050, y: 200, dx: - (Math.random()*11 + 5), dy:  (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1050, y: 350, dx: - (Math.random()*11 + 5), dy: -(Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1050, y: 450, dx: - (Math.random()*11 + 5), dy: (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1150, y: 250, dx: - (Math.random()*11 + 5), dy: -(Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1150, y: 250, dx: - (Math.random()*11 + 5), dy: (Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1150, y: 450, dx: - (Math.random()*11 + 5), dy: -(Math.random()*11 + 5), radius: 25, color: 'lime'},
              {x: 1150, y: 550, dx: - (Math.random()*11 + 5), dy: (Math.random()*11 + 5), radius: 25, color: 'lime'}];
}


function playingField() {
  // Patriots endzone color
  context.fillStyle = "#66b3ff";
  context.fillRect(0, 100, 100, 530);
  // Seahawks endzone color
  context.fillStyle = "#145214";
  context.fillRect(1100, 100, 100, 530);
  // left endzone line
  context.fillStyle = "white";
  context.fillRect(98, 100, 4, 530);
  // right endzone line
  context.fillStyle = "white";
  context.fillRect(1098, 100, 4, 530);
  // lines across field every 10 yards
  context.fillStyle = "white";
  context.fillRect(198, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(298, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(398, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(498, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(598, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(698, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(798, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(898, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(998, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(1098, 100, 4, 530);
  // lines across field every 5,15,25 yards etc
  context.fillStyle = "white";
  context.fillRect(148, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(248, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(348, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(448, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(548, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(648, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(748, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(848, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(948, 100, 4, 530);
  context.fillStyle = "white";
  context.fillRect(1048, 100, 4, 530);

  // numbers on field
  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("1" ,170, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,200, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("2" ,260, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,300, 560);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("3" ,360, 553);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,400, 560);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("4" ,460, 553);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,500, 560);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("5" ,560, 553);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,600, 560);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("4" ,660, 553);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,700, 560);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("3" ,760, 553);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,800, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("2" ,860, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,900, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("1" ,960, 560);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,1000, 560);

  // numbers on field (top of field numbers)
  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("1" ,170, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,200, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("2" ,260, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,300, 200);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("3" ,360, 193);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,400, 200);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("4" ,460, 193);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,500, 200);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("5" ,560, 193);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,600, 200);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("4" ,660, 193);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,700, 200);

  context.font="60px Georgia";
  context.fillStyle = "white";
  context.fillText("3" ,760, 193);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,800, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("2" ,860, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,900, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("1" ,960, 200);

  context.font="70px Georgia";
  context.fillStyle = "white";
  context.fillText("0" ,1000, 200);

  // // hash marks top left of field
  context.fillStyle = "white";
  context.fillRect(109, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(119, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(129, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(139, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(149, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(159, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(169, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(179, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(189, 110, 2, 15);
  // hash mar15
  context.fillStyle = "white";
  context.fillRect(209, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(219, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(229, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(239, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(249, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(259, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(269, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(279, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(289, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(309, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(319, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(329, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(339, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(349, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(359, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(369, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(379, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(389, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(409, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(419, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(429, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(439, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(449, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(459, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(469, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(479, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(489, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(509, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(519, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(529, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(539, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(549, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(559, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(569, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(579, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(589, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(609, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(619, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(629, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(639, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(649, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(659, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(669, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(679, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(689, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(709, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(719, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(729, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(739, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(749, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(759, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(769, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(779, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(789, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(809, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(819, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(829, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(839, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(849, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(859, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(869, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(879, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(889, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(909, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(919, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(929, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(939, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(949, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(959, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(969, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(979, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(989, 110, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(1009, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1019, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1029, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1039, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1049, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1059, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1069, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1079, 110, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1089, 110, 2, 15);

  //lines middle center of field
  context.fillStyle = "white";
  context.fillRect(199, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(299, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(399, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(499, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(599, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(699, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(799, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(899, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(999, 100, 2, 530);
  context.fillStyle = "white";
  context.fillRect(1099, 100, 2, 530);
  // hash marks top center of field
  context.fillStyle = "white";
  context.fillRect(109, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(119, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(129, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(139, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(149, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(159, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(169, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(179, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(189, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(209, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(219, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(229, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(239, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(249, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(259, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(269, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(279, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(289, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(309, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(319, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(329, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(339, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(349, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(359, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(369, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(379, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(389, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(409, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(419, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(429, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(439, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(449, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(459, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(469, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(479, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(489, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(509, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(519, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(529, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(539, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(549, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(559, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(569, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(579, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(589, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(609, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(619, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(629, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(639, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(649, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(659, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(669, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(679, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(689, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(709, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(719, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(729, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(739, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(749, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(759, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(769, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(779, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(789, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(809, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(819, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(829, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(839, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(849, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(859, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(869, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(879, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(889, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(909, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(919, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(929, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(939, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(949, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(959, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(969, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(979, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(989, 275, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(1009, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1019, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1029, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1039, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1049, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1059, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1069, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1079, 275, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1089, 275, 2, 15);

  // hash marks top center of field
  context.fillStyle = "white";
  context.fillRect(109, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(119, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(129, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(139, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(149, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(159, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(169, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(179, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(189, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(209, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(219, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(229, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(239, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(249, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(259, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(269, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(279, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(289, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(309, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(319, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(329, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(339, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(349, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(359, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(369, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(379, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(389, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(409, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(419, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(429, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(439, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(404, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(459, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(469, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(479, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(489, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(509, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(519, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(529, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(539, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(549, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(559, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(569, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(579, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(589, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(609, 430, 2, 15);
  context.fillStyle = "w405e";
  context.fillRect(619, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(629, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(639, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(649, 430, 2, 15);
  context.fillStyle = "w405e";
  context.fillRect(659, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(669, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(679, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(689, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(709, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(719, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(729, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(739, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(749, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(759, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(769, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(779, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(789, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(809, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(819, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(829, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(839, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(849, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(859, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(869, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(879, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(889, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(909, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(919, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(929, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(939, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(949, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(959, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(969, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(979, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(989, 430, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(1009, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1019, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1029, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1039, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1049, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1059, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1069, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1079, 430, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1089, 430, 2, 15);

  // hash marks bottom of field
  context.fillStyle = "white";
  context.fillRect(109, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(119, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(129, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(139, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(149, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(159, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(169, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(179, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(189, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(209, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(219, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(229, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(239, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(249, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(259, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(269, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(279, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(289, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(309, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(319, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(329, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(339, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(349, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(359, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(369, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(379, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(389, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(409, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(419, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(429, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(439, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(449, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(459, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(469, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(479, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(489, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(509, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(519, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(529, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(539, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(549, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(559, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(569, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(579, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(589, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(609, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(619, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(629, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(639, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(649, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(659, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(669, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(679, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(689, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(709, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(719, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(729, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(739, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(749, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(759, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(769, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(779, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(789, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(809, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(819, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(829, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(839, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(849, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(859, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(869, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(879, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(889, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(909, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(919, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(929, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(939, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(949, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(959, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(969, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(979, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(989, 605, 2, 15);
  // hash marks
  context.fillStyle = "white";
  context.fillRect(1009, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1019, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1029, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1039, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1049, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1059, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1069, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1079, 605, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1089, 605, 2, 15);


  //goal posts left endzone
  context.fillStyle = "white";
  context.fillRect(10, 300, 10, 2);
  context.fillStyle = "white";
  context.fillRect(10, 415, 10, 2);
  //goal posts right endzone
  context.fillStyle = "white";
  context.fillRect(1190, 300, 10, 2);
  context.fillStyle = "white";
  context.fillRect(1190, 415, 10, 2);

  //small lines middle of field in front of endzones
  context.fillStyle = "white";
  context.fillRect(130, 357, 2, 15);
  context.fillStyle = "white";
  context.fillRect(1070, 357, 2, 15);

}

function enemyMove() {
  enemy.forEach(function(eBall) {
    context.beginPath();
    context.arc(eBall.x, eBall.y, eBall.radius, 0, Math.PI*2, true);
    context.closePath();
    context.fillStyle = eBall.color;
    context.fill()

    if (eBall.x <= 0 ) {
      eBall.x = 0;
    }
    if (eBall.x >= canvas.width) {
      eBall.x = canvas.width;
    }
    if (eBall.y >= canvas.height) {
      eBall.y = canvas.height;
    }
    if (eBall.y <= 100) {
      eBall.y = 100;
    }
    if ((eBall.x > canvas.width - eBall.radius) || (eBall.x < eBall.radius)) {
      eBall.dx = -eBall.dx;
    }
    if((eBall.y >= canvas.height - eBall.radius) || (eBall.y <= 100 + eBall.radius)) {
      eBall.dy = -eBall.dy;
    }

    eBall.x += eBall.dx;
    eBall.y += eBall.dy;
  });

}

document.onkeydown = function(e) {
  if (e.keyCode >= 37 && e.keyCode <= 40) {
  e.preventDefault();
  }
    switch (e.keyCode) {

        case 37:
            ball.x -= 15;
            if (ball.x <= ball.radius) {
              ball.x = ball.radius;
            }
            break;

        case 38:
            ball.y -= 15;
            if (ball.y <= 100 + ball.radius) {
              ball.y = 100 + ball.radius;
            }
            break;

        case 39:
            ball.x += 15;
            if (ball.x >= canvas.width - ball.radius) {
              ball.x = canvas.width - ball.radius;
            }
            break;
        case 40:
            ball.y += 15;
            if (ball.y >= canvas.height - ball.radius) {
              ball.y = canvas.height - ball.radius;
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
      t = setInterval(draw,60);
  }
}

function restart() {
  timer_is_on2 = 1;
  clearInterval(t);

  ball = {x: 100, y: 365, dx: 10, dy: 10, radius: 25, color: 'navy'};

  enemy = [{x: 950, y: 150, dx: -10, dy: 5, radius: 25, color: 'lime'},
              {x: 950, y: 250, dx: -10, dy: -10, radius: 25, color: 'lime'},
              {x: 950, y: 350, dx: -10, dy: 5, radius: 25, color: 'lime'},
              {x: 950, y: 450, dx: -10, dy: -10, radius: 25, color: 'lime'},
              {x: 950, y: 550, dx: -10, dy: -6, radius: 25, color: 'lime'},
              {x: 1050, y: 250, dx: -10, dy: 10, radius: 25, color: 'lime'},
              {x: 1050, y: 350, dx: -10, dy: -4, radius: 25, color: 'lime'},
              {x: 1050, y: 450, dx: -10, dy: 9, radius: 25, color: 'lime'},
              {x: 1150, y: 250, dx: -10, dy:- 3, radius: 25, color: 'lime'},
              {x: 1150, y: 250, dx: -10, dy: 8, radius: 25, color: 'lime'},
              {x: 1150, y: 350, dx: -10, dy:- 6, radius: 25, color: 'lime'},
              {x: 1150, y: 450, dx: -10, dy: 5, radius: 25, color: 'lime'}];

  homeScore = 0;
  visitorScore = 0;

  t = setInterval(draw,60);
}

draw();
