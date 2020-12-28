const canvas = document.getElementById ( 'game' );
const context = canvas.getContext ( '2d' );

const shotImg = new Image();
shotImg.src = '../img/shot.png';

const shipImg = new Image();
shipImg.src = '../img/ship.png';

const asterImg = new Image();
asterImg.src = '../img/aster.png';

const mainBackground = new Image();
mainBackground.src = '../img/mainbckgrnd.png';

const explImg = new Image();
explImg.src = '../img/expl.png';

const expl = [];
const aster = [];
const shot = [];

const ship = {x: 275, y: 275};

let timer = 0;

canvas.addEventListener("mousemove", function(event) {
  ship.x = event.offsetX - 25;
  ship.y = event.offsetY - 25;
})

explImg.onload = function () {

  game();

}

function game() {

  update();
  render();
  requestAnimFrame(game);
}

function update() {

  timer++;
  if (timer%10 == 0) {
    aster.push({
      x: Math.random()*540,
      y: -65,
      dX: Math.random()*2-1,
      dY: Math.random()*2+2,
      del: 0
    });
  }

  if (timer%30 == 0) {
    shot.push({x: ship.x + 12, y: ship.y - 32, dX: 0, dY: -5.2});
    shot.push({x: ship.x + 12, y: ship.y - 32, dX: -1, dY: -5});
    shot.push({x: ship.x + 12, y: ship.y - 32, dX: 1, dY: -5});
  }


  for (let i in aster) {
    aster[i].x = aster[i].x + aster[i].dX;
    aster[i].y = aster[i].y + aster[i].dY;
    
    if (aster[i].x >= 540 || aster[i].x <= 0) aster[i].dX = -aster[i].dX;
    if (aster[i].y >= 610) aster.splice(i, 1);

    for (let j in shot) {
      if (Math.abs(aster[i].x - shot[j].x) < 60 && Math.abs(aster[i].y - shot[j].y) < 30) {

        expl.push({x: aster[i].x - 20, y: aster[i].y - 20, animX: 0, animY: 0});

        aster[i].del = 1;
        shot.splice(j, 1); 
        break;
      }
    }

    if (aster[i].del == 1) aster.splice(i, 1);
  }

  for (let i in expl) {
    expl[i].animX = expl[i].animX + 1;
    if (expl[i].animX > 8) {
      expl[i].animY++;
      expl[i].animX = 0;
    }
    if (expl[i].animY > 4) expl.splice(i, 1);
  }

  for (let i in shot) {
    shot[i].x = shot[i].x + shot[i].dX;
    shot[i].y = shot[i].y + shot[i].dY;

    if (shot.y <= -40) shot.splice(i, 1);
  }

    
}

function render() {
  context.drawImage (mainBackground, 0, 0, 600, 600);
  context.drawImage (shipImg, ship.x, ship.y, 50, 50);

  for (let i in shot) {
    context.drawImage (shotImg, shot[i].x, shot[i].y);
  }

  for (let i in aster) {
    context.drawImage (asterImg, aster[i].x, aster[i].y, 60, 60);
  }

  for (let i in expl) {
    context.drawImage (explImg, Math.floor(150*expl[i].animX), Math.floor(150*expl[i].animY), 150, 150, expl[i].x, expl[i].y, 100, 100);
  }
}

const requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();