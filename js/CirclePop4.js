let timer_is_on99 = 0;

function startGame() {
  let score = 0;
  let time = 0;
  let t;

  timedCount();

    function timedCount() {

      let canvas = document.getElementById('scoreboard');
      let ctx= canvas.getContext('2d');

      ctx.font="900 50px Arial";
      ctx.fillStyle= "#194d19";
      ctx.fillText("TIME:" ,600,68);

      ctx.font="900 50px Arial";
      ctx.fillText(time,770,68);

      time = time + 1;
      t = setTimeout(function(){ctx.clearRect(canvas.width/2,0,canvas.width,canvas.height);
                                timedCount();
                                }, 1000);

      if (time === 9999) {
        time = 0;
      }
    }

    function scoreboard() {
      let canvas = document.getElementById('scoreboard');
      let ctx= canvas.getContext('2d');

      ctx.clearRect(0,0,canvas.width/2,canvas.height);

      ctx.font="900 50px Arial";
      ctx.fillStyle= "#194d19";
      ctx.fillText("SCORE:" ,50,68);

      ctx.font="900 50px Arial";
      ctx.fillText(score,280,68);
    }

    function initiate1() {

    let canvas = document.getElementById('canvas1');
    let ctx= canvas.getContext('2d');
    let t;
    let constant = 1;
    let mass = 1;
    let randomBalls = [];

    function generateBalls() {

      for (let i =0; i<4; i++) {
          let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
          let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

          let randomDX = ((Math.random() * 8 + 2) * plusOrNeg1) * constant;
          let randomDY = ((Math.random() * 8 + 2) * plusOrNeg2) * constant;
          let rad = 80 * mass;
          let coloR= "blue";

          let coorXShifted = 111 + i*231;

            for(let j=0; j<2; j++) {
              let coorYShifted = 101 + j*225;

              randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
              radius:rad,color:coloR});
            }
      }
    }

    function start() {
      generateBalls();
      t=setInterval(draw,110)
    }

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      updateCircle();
      ballsCollisionDeflect();
      // scoreboard();
    }

    function updateCircle() {

      for (n=0; n < randomBalls.length; n++) {
        randomBalls[n].x += randomBalls[n].dx;
        randomBalls[n].y += randomBalls[n].dy;

        ctx.beginPath();
        ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = randomBalls[n].color;
        ctx.fill();

    // to avoid the ball getting stuck/off the canvas wall
        if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
          randomBalls[n].x = canvas.width - randomBalls[n].radius;
          randomBalls[n].dx =- randomBalls[n].dx;
        } else if (randomBalls[n].x < randomBalls[n].radius) {
          randomBalls[n].x = randomBalls[n].radius;
          randomBalls[n].dx =- randomBalls[n].dx;
        } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
          randomBalls[n].y = canvas.height - randomBalls[n].radius;
          randomBalls[n].dy =- randomBalls[n].dy;
        } else if (randomBalls[n].y < randomBalls[n].radius) {
          randomBalls[n].y = randomBalls[n].radius;
          randomBalls[n].dy =- randomBalls[n].dy;
        }
      }
    }

    function ballsCollisionDeflect() {

      for (let j=0; j<randomBalls.length; j++) {
        let Ball1 = randomBalls[j];

        for (let n=j+1; n<randomBalls.length; n++) {
          let Ball2 = randomBalls[n];
          let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
          let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

          if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
    //elastic collision
            let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                (Ball1.radius + Ball2.radius);
            let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                (Ball1.radius + Ball2.radius);

            let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                (Ball1.radius + Ball2.radius);
            let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                (Ball1.radius + Ball2.radius);

            Ball1.radius *= 0.95;
            Ball2.radius *= 0.95;

    // so as to reposition (x,y) coordinates after collision to escape the overlap
            Ball1.x = Ball1.x + newVelBall1X;
            Ball1.y = Ball1.y + newVelBall1Y;

            Ball2.x = Ball2.x + newVelBall2X;
            Ball2.y = Ball2.y + newVelBall2Y;

    // new Ball velocities
            Ball1.dx = newVelBall1X;
            Ball2.dx = newVelBall2X;

            Ball1.dy = newVelBall1Y;
            Ball2.dy = newVelBall2Y;
          }
        }
      }
    }

    function mouseClick7(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
    };

    function deleteBall7(event) {
      pos1 = mouseClick7(canvas1, event);
      posx1 = pos1.x;
      posy1 = pos1.y;

      for (i=0; i<randomBalls.length; i+=1) {
        bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
        cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

        hypotenuse = Math.sqrt(bSquared + cSquared);

        if (hypotenuse <= randomBalls[i].radius) {
          randomBalls.splice([i],1);
          // ctx.font="70px Georgia";
          // ctx.fillText(score,210,68);
          score += 50;
          scoreboard();
        }
        if (randomBalls.length === 0) {
          clearInterval(t);
          ctx.clearRect(0,0,canvas.width,canvas.height);
          initiate2();
        }
      }
    }
    canvas1.addEventListener('mousedown', deleteBall7);

    start();
    }

    function initiate2() {
    let canvas = document.getElementById('canvas1');
    let ctx= canvas.getContext('2d');
    let t;
    let constant = 1;
    let mass = 1;
    let randomBalls = [];

    function generateBalls() {

      for (let i =0; i<6; i++) {
          let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
          let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

          let randomDX = ((Math.random() * 8 + 2) * plusOrNeg1) * constant;
          let randomDY = ((Math.random() * 8 + 2) * plusOrNeg2) * constant;
          let rad = 70 * mass;
          let coloR= "blue";

          let coorXShifted = 71 + i*141;

            for(let j=0; j<3; j++) {
              let coorYShifted = 71 + j*141;

              randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
              radius:rad,color:coloR});
            }
      }
    }

    function start() {
      generateBalls();
      t=setInterval(draw,110)
    }

    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      updateCircle();
      ballsCollisionDeflect();
    }

    function updateCircle() {

      for (n=0; n < randomBalls.length; n++) {
        randomBalls[n].x += randomBalls[n].dx;
        randomBalls[n].y += randomBalls[n].dy;

        ctx.beginPath();
        ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = randomBalls[n].color;
        ctx.fill();

    // to avoid the ball getting stuck/off the canvas wall
        if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
          randomBalls[n].x = canvas.width - randomBalls[n].radius;
          randomBalls[n].dx =- randomBalls[n].dx;
        } else if (randomBalls[n].x < randomBalls[n].radius) {
          randomBalls[n].x = randomBalls[n].radius;
          randomBalls[n].dx =- randomBalls[n].dx;
        } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
          randomBalls[n].y = canvas.height - randomBalls[n].radius;
          randomBalls[n].dy =- randomBalls[n].dy;
        } else if (randomBalls[n].y < randomBalls[n].radius) {
          randomBalls[n].y = randomBalls[n].radius;
          randomBalls[n].dy =- randomBalls[n].dy;
        }
      }
    }

    function ballsCollisionDeflect() {

      for (let j=0; j<randomBalls.length; j++) {
        let Ball1 = randomBalls[j];

        for (let n=j+1; n<randomBalls.length; n++) {
          let Ball2 = randomBalls[n];
          let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
          let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

          if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
    //elastic collision
            let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                (Ball1.radius + Ball2.radius);
            let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                (Ball1.radius + Ball2.radius);

            let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                (Ball1.radius + Ball2.radius);
            let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                (Ball1.radius + Ball2.radius);

            Ball1.radius *= 0.95;
            Ball2.radius *= 0.95;

    // so as to reposition (x,y) coordinates after collision to escape the overlap
            Ball1.x = Ball1.x + newVelBall1X;
            Ball1.y = Ball1.y + newVelBall1Y;

            Ball2.x = Ball2.x + newVelBall2X;
            Ball2.y = Ball2.y + newVelBall2Y;

    // new Ball velocities
            Ball1.dx = newVelBall1X;
            Ball2.dx = newVelBall2X;

            Ball1.dy = newVelBall1Y;
            Ball2.dy = newVelBall2Y;
          }
        }
      }
    }
    function mouseClick7(canvas, event) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
    };

    function deleteBall7(event) {
      pos1 = mouseClick7(canvas1, event);
      posx1 = pos1.x;
      posy1 = pos1.y;

      for (i=0; i<randomBalls.length; i+=1) {
        bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
        cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

        hypotenuse = Math.sqrt(bSquared + cSquared);

        if (hypotenuse <= randomBalls[i].radius) {
          randomBalls.splice([i],1);
          score += 100;
          scoreboard();
        }
        if (randomBalls.length === 0) {
          clearInterval(t);
          ctx.clearRect(0,0,canvas.width,canvas.height);
          initiate3();

        }
      }
    }
    canvas1.addEventListener('mousedown', deleteBall7);

    start();
    }

    function initiate3() {
      let canvas = document.getElementById('canvas1');
      let ctx= canvas.getContext('2d');
      let t;
      let constant = 1;
      let mass = 1;
      let randomBalls = [];

      function generateBalls() {

        for (let i =0; i<8; i++) {
            let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
            let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

            let randomDX = ((Math.random() * 6 + 2) * plusOrNeg1) * constant;
            let randomDY = ((Math.random() * 6 + 2) * plusOrNeg2) * constant;
            let rad = 55 * mass;
            let coloR= "blue";

            let coorXShifted = 56 + i*120;

              for(let j=0; j<4; j++) {
                let coorYShifted = 56 + j*120;

                randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
                radius:rad,color:coloR});
              }
        }
      }

      function start() {
        generateBalls();
        t=setInterval(draw,90)
      }

      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        updateCircle();
        ballsCollisionDeflect();
      }

      function updateCircle() {

        for (n=0; n < randomBalls.length; n++) {
          randomBalls[n].x += randomBalls[n].dx;
          randomBalls[n].y += randomBalls[n].dy;

          ctx.beginPath();
          ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fillStyle = randomBalls[n].color;
          ctx.fill();

      // to avoid the ball getting stuck/off the canvas wall
          if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
            randomBalls[n].x = canvas.width - randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].x < randomBalls[n].radius) {
            randomBalls[n].x = randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
            randomBalls[n].y = canvas.height - randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          } else if (randomBalls[n].y < randomBalls[n].radius) {
            randomBalls[n].y = randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          }
        }
      }

      function ballsCollisionDeflect() {

        for (let j=0; j<randomBalls.length; j++) {
          let Ball1 = randomBalls[j];

          for (let n=j+1; n<randomBalls.length; n++) {
            let Ball2 = randomBalls[n];
            let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
            let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

            if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
      //elastic collision
              let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                  (Ball1.radius + Ball2.radius);

              let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                  (Ball1.radius + Ball2.radius);

              Ball1.radius *= 0.95;
              Ball2.radius *= 0.95;

      // so as to reposition (x,y) coordinates after collision to escape the overlap
              Ball1.x = Ball1.x + newVelBall1X;
              Ball1.y = Ball1.y + newVelBall1Y;

              Ball2.x = Ball2.x + newVelBall2X;
              Ball2.y = Ball2.y + newVelBall2Y;

      // new Ball velocities
              Ball1.dx = newVelBall1X;
              Ball2.dx = newVelBall2X;

              Ball1.dy = newVelBall1Y;
              Ball2.dy = newVelBall2Y;
            }
          }
        }
      }
      function mouseClick7(canvas, event) {
          let rect = canvas.getBoundingClientRect();
          return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };
      };

      function deleteBall7(event) {
        pos1 = mouseClick7(canvas1, event);
        posx1 = pos1.x;
        posy1 = pos1.y;

        for (i=0; i<randomBalls.length; i+=1) {
          bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
          cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

          hypotenuse = Math.sqrt(bSquared + cSquared);

          if (hypotenuse <= randomBalls[i].radius) {
            randomBalls.splice([i],1);
            score += 150;
            scoreboard();
          }
          if (randomBalls.length === 0) {
            clearInterval(t);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            initiate4();
          }
        }
      }
      canvas1.addEventListener('mousedown', deleteBall7);
      start();
    }

    function initiate4() {
      let canvas = document.getElementById('canvas1');
      let ctx= canvas.getContext('2d');
      let t;
      let constant = 1;
      let mass = 1;
      let randomBalls = [];

      function generateBalls() {

        for (let i =0; i<12; i++) {
            let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
            let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

            let randomDX = ((Math.random() * 3 + 2) * plusOrNeg1) * constant;
            let randomDY = ((Math.random() * 3 + 2) * plusOrNeg2) * constant;
            let rad = 40 * mass;
            let coloR= "blue";

            let coorXShifted = 41 + i*81;

              for(let j=0; j<6; j++) {
                let coorYShifted = 41 + j*81;

                randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
                radius:rad,color:coloR});
              }
        }
      }

      function start() {
        generateBalls();
        t=setInterval(draw,90)
      }

      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        updateCircle();
        ballsCollisionDeflect();
      }

      function updateCircle() {

        for (n=0; n < randomBalls.length; n++) {
          randomBalls[n].x += randomBalls[n].dx;
          randomBalls[n].y += randomBalls[n].dy;

          ctx.beginPath();
          ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fillStyle = randomBalls[n].color;
          ctx.fill();

      // to avoid the ball getting stuck/off the canvas wall
          if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
            randomBalls[n].x = canvas.width - randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].x < randomBalls[n].radius) {
            randomBalls[n].x = randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
            randomBalls[n].y = canvas.height - randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          } else if (randomBalls[n].y < randomBalls[n].radius) {
            randomBalls[n].y = randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          }

        }
      }

      function ballsCollisionDeflect() {

        for (let j=0; j<randomBalls.length; j++) {
          let Ball1 = randomBalls[j];

          for (let n=j+1; n<randomBalls.length; n++) {
            let Ball2 = randomBalls[n];
            let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
            let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

            if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
      //elastic collision
              let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                  (Ball1.radius + Ball2.radius);

              let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                  (Ball1.radius + Ball2.radius);

              Ball1.radius *= 0.97;
              Ball2.radius *= 0.97;

      // so as to reposition (x,y) coordinates after collision to escape the overlap
              Ball1.x = Ball1.x + newVelBall1X;
              Ball1.y = Ball1.y + newVelBall1Y;

              Ball2.x = Ball2.x + newVelBall2X;
              Ball2.y = Ball2.y + newVelBall2Y;

      // new Ball velocities
              Ball1.dx = newVelBall1X;
              Ball2.dx = newVelBall2X;

              Ball1.dy = newVelBall1Y;
              Ball2.dy = newVelBall2Y;
            }
          }
        }
      }

      function mouseClick7(canvas, event) {
          let rect = canvas.getBoundingClientRect();
          return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };
      };

      function deleteBall7(event) {
        pos1 = mouseClick7(canvas1, event);
        posx1 = pos1.x;
        posy1 = pos1.y;

        for (i=0; i<randomBalls.length; i+=1) {
          bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
          cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

          hypotenuse = Math.sqrt(bSquared + cSquared);

          if (hypotenuse <= randomBalls[i].radius) {
            randomBalls.splice([i],1);
            score += 200;
            scoreboard();
          }
          if (randomBalls.length === 0) {
            clearInterval(t);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            initiate5();

          }
        }
      }
      canvas1.addEventListener('mousedown', deleteBall7);
      start();

  }

    function initiate5() {
      let canvas = document.getElementById('canvas1');
      let ctx= canvas.getContext('2d');
      let t;
      let constant = 1;
      let mass = 1;
      let randomBalls = [];

      function generateBalls() {

        for (let i =0; i<12; i++) {
            let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
            let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

            let randomDX = ((Math.random() * 3 + 2) * plusOrNeg1) * constant;
            let randomDY = ((Math.random() * 3 + 2) * plusOrNeg2) * constant;
            let rad = 25 * mass;
            let coloR= "blue";

            let coorXShifted = 41 + i*81;

              for(let j=0; j<6; j++) {
                let coorYShifted = 41 + j*81;

                randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
                radius:rad,color:coloR});
              }
        }
      }

      function start() {
        generateBalls();
        t=setInterval(draw,90)
      }

      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        updateCircle();
        ballsCollisionDeflect();
      }

      function updateCircle() {

        for (n=0; n < randomBalls.length; n++) {
          randomBalls[n].x += randomBalls[n].dx;
          randomBalls[n].y += randomBalls[n].dy;

          ctx.beginPath();
          ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fillStyle = randomBalls[n].color;
          ctx.fill();

      // to avoid the ball getting stuck/off the canvas wall
          if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
            randomBalls[n].x = canvas.width - randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].x < randomBalls[n].radius) {
            randomBalls[n].x = randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
            randomBalls[n].y = canvas.height - randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          } else if (randomBalls[n].y < randomBalls[n].radius) {
            randomBalls[n].y = randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          }
        }
      }

      function ballsCollisionDeflect() {

        for (let j=0; j<randomBalls.length; j++) {
          let Ball1 = randomBalls[j];

          for (let n=j+1; n<randomBalls.length; n++) {
            let Ball2 = randomBalls[n];
            let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
            let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

            if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
      //elastic collision
              let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                  (Ball1.radius + Ball2.radius);

              let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                  (Ball1.radius + Ball2.radius);

              Ball1.radius *= 0.97;
              Ball2.radius *= 0.97;

      // so as to reposition (x,y) coordinates after collision to escape the overlap
              Ball1.x = Ball1.x + newVelBall1X;
              Ball1.y = Ball1.y + newVelBall1Y;

              Ball2.x = Ball2.x + newVelBall2X;
              Ball2.y = Ball2.y + newVelBall2Y;

      // new Ball velocities
              Ball1.dx = newVelBall1X;
              Ball2.dx = newVelBall2X;

              Ball1.dy = newVelBall1Y;
              Ball2.dy = newVelBall2Y;
            }
          }
        }
      }

      function mouseClick7(canvas, event) {
          let rect = canvas.getBoundingClientRect();
          return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };
      };

      function deleteBall7(event) {
        pos1 = mouseClick7(canvas1, event);
        posx1 = pos1.x;
        posy1 = pos1.y;

        for (i=0; i<randomBalls.length; i+=1) {
          bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
          cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

          hypotenuse = Math.sqrt(bSquared + cSquared);

          if (hypotenuse <= randomBalls[i].radius) {
            randomBalls.splice([i],1);
            score += 300;
            scoreboard();
          }
          if (randomBalls.length === 0) {
            clearInterval(t);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            initiate6();

          }
        }
      }
      canvas1.addEventListener('mousedown', deleteBall7);
      start();

  }

    function initiate6() {
      let canvas = document.getElementById('canvas1');
      let ctx= canvas.getContext('2d');
      let t;
      let constant = 1;
      let mass = 1;
      let randomBalls = [];

      function generateBalls() {

        for (let i =0; i<15; i++) {
            let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
            let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

            let randomDX = ((Math.random() * 3 + 2) * plusOrNeg1) * constant;
            let randomDY = ((Math.random() * 3 + 2) * plusOrNeg2) * constant;
            let rad = 18 * mass;
            let coloR= "blue";

            let coorXShifted = 41 + i*81;

              for(let j=0; j<9; j++) {
                let coorYShifted = 41 + j*81;

                randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
                radius:rad,color:coloR});
              }
        }
      }

      function start() {
        generateBalls();
        t=setInterval(draw,90)
      }

      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        updateCircle();
        ballsCollisionDeflect();
      }

      function updateCircle() {

        for (n=0; n < randomBalls.length; n++) {
          randomBalls[n].x += randomBalls[n].dx;
          randomBalls[n].y += randomBalls[n].dy;

          ctx.beginPath();
          ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
          ctx.closePath();
          ctx.fillStyle = randomBalls[n].color;
          ctx.fill();

      // to avoid the ball getting stuck/off the canvas wall
          if (randomBalls[n].x > canvas.width - randomBalls[n].radius) {
            randomBalls[n].x = canvas.width - randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].x < randomBalls[n].radius) {
            randomBalls[n].x = randomBalls[n].radius;
            randomBalls[n].dx =- randomBalls[n].dx;
          } else if (randomBalls[n].y > canvas.height - randomBalls[n].radius) {
            randomBalls[n].y = canvas.height - randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          } else if (randomBalls[n].y < randomBalls[n].radius) {
            randomBalls[n].y = randomBalls[n].radius;
            randomBalls[n].dy =- randomBalls[n].dy;
          }

        }
      }

      function ballsCollisionDeflect() {

        for (let j=0; j<randomBalls.length; j++) {
          let Ball1 = randomBalls[j];

          for (let n=j+1; n<randomBalls.length; n++) {
            let Ball2 = randomBalls[n];
            let xDist = (Ball1.x - Ball2.x) * (Ball1.x - Ball2.x);
            let yDist = (Ball1.y - Ball2.y) * (Ball1.y - Ball2.y);

            if ((Math.sqrt(xDist + yDist)) < (Ball1.radius + Ball2.radius) ){
      //elastic collision
              let newVelBall1X =  (Ball1.dx * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall1Y =  (Ball1.dy * (Ball1.radius - Ball2.radius) + (2 * Ball2.radius * Ball2.dy)) /
                                  (Ball1.radius + Ball2.radius);

              let newVelBall2X =  (Ball2.dx * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dx)) /
                                  (Ball1.radius + Ball2.radius);
              let newVelBall2Y =  (Ball2.dy * (Ball2.radius - Ball1.radius) + (2 * Ball1.radius * Ball1.dy)) /
                                  (Ball1.radius + Ball2.radius);

              Ball1.radius *= 0.97;
              Ball2.radius *= 0.97;

      // so as to reposition (x,y) coordinates after collision to escape the overlap
              Ball1.x = Ball1.x + newVelBall1X;
              Ball1.y = Ball1.y + newVelBall1Y;

              Ball2.x = Ball2.x + newVelBall2X;
              Ball2.y = Ball2.y + newVelBall2Y;

      // new Ball velocities
              Ball1.dx = newVelBall1X;
              Ball2.dx = newVelBall2X;

              Ball1.dy = newVelBall1Y;
              Ball2.dy = newVelBall2Y;
            }
          }
        }
      }

      function mouseClick7(canvas, event) {
          let rect = canvas.getBoundingClientRect();
          return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
          };
      };

      function deleteBall7(event) {
        pos1 = mouseClick7(canvas1, event);
        posx1 = pos1.x;
        posy1 = pos1.y;

        for (i=0; i<randomBalls.length; i+=1) {
          bSquared = (posx1  - randomBalls[i].x)*(posx1 - randomBalls[i].x);
          cSquared = (posy1 - randomBalls[i].y)*(posy1 - randomBalls[i].y);

          hypotenuse = Math.sqrt(bSquared + cSquared);

          if (hypotenuse <= randomBalls[i].radius) {
            randomBalls.splice([i],1);
            score += 500;
            scoreboard();
          }
          if (randomBalls.length === 0) {
            clearInterval(t);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            start();

          }
        }
      }
      canvas1.addEventListener('mousedown', deleteBall7);
      start();
  }
  initiate1();
  scoreboard();
}

function initialFrozenStateDisplay() {

  let canvas = document.getElementById('canvas1');
  let ctx= canvas.getContext('2d');
  let t;
  let constant = 1;
  let mass = 1;
  let randomBalls = [];

  function generateBalls() {

    for (let i =0; i<4; i++) {
        let plusOrNeg1 = Math.random() < 0.5 ? -1: 1;
        let plusOrNeg2 = Math.random() < 0.5 ? -1: 1;

        let randomDX = ((Math.random() * 8 + 2) * plusOrNeg1) * constant;
        let randomDY = ((Math.random() * 8 + 2) * plusOrNeg2) * constant;
        let rad = 80 * mass;
        let coloR= "blue";

        let coorXShifted = 111 + i*231;

          for(let j=0; j<2; j++) {
            let coorYShifted = 101 + j*225;

            randomBalls.push({x:coorXShifted,y:coorYShifted,dx:randomDX,dy:randomDY,
            radius:rad,color:coloR});
          }
    }
  }

  function start() {
    generateBalls();
    draw();
  }

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateCircle();
  }

  function updateCircle() {

    for (n=0; n < randomBalls.length; n++) {
      randomBalls[n].x += randomBalls[n].dx;
      randomBalls[n].y += randomBalls[n].dy;

      ctx.beginPath();
      ctx.arc(randomBalls[n].x, randomBalls[n].y, randomBalls[n].radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fillStyle = randomBalls[n].color;
      ctx.fill();
    }
  }

  function scoreboard() {
    let canvas = document.getElementById('scoreboard');
    let ctx= canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.width/2,canvas.height);

    ctx.font="900 50px Arial";
    ctx.fillStyle= "#194d19";
    ctx.fillText("TIME:" ,600,68);

    ctx.font="900 50px Arial";
    ctx.fillText("0",770,68);

    ctx.font="900 50px Arial";
    ctx.fillStyle= "#194d19";
    ctx.fillText("SCORE:" ,50,68);

    ctx.font="900 50px Arial";
    ctx.fillText("0",280,68);
  }

  start();
  scoreboard();
}

function startButton() {
  if (!timer_is_on99) {
      timer_is_on99 = 1;
      startGame();
  }
}

function restartButton() {
  location.reload();
}

initialFrozenStateDisplay();
