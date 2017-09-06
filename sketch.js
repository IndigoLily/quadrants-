const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;
let sep = 0.5;
let speed = 1;
let shadow = true;

const PI = Math.PI;
const TAU = PI * 2;

c.shadowColor = 'rgba(0, 0, 0, 0.5)';

var COLOURS = [
  '#e34',
  '#06f',
  '#fff',
  '#111',
];
let circles = [];

function randColour() {
  let r = (Math.random()*16|0).toString(16),
      g = (Math.random()*16|0).toString(16),
      b = (Math.random()*16|0).toString(16);
  if (Math.random() > .2) return '#'+r+g+b;
  else return '#'+r+r+r;
}

/*window.addEventListener('click', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  sep = 0.4 + Math.random() * 0.7;
  c.shadowColor = shadow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
  circles = [];
  COLOURS = [
    randColour(),
    randColour(),
    randColour(),
    randColour(),
  ];
});*/

function resize() {
  c.clearRect(0,0,width,height);
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  c.shadowColor = shadow ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
  circles = [];
}

window.addEventListener('keydown', e => {
  switch(e.keyCode) {
    case 38: // up
      speed++;
      break;

    case 40: // down
      if (speed > 1) speed--;
      break;

    case 82: // r(esize)
      resize();
      break;

    case 83: // s(hadow)
      shadow = !shadow;
      resize();
      break;

    case 80: // p (separation)
      resize();
      sep = 0.4 + Math.random() * 0.7;
      break;

    case 67: // c(olour)
      resize();
      COLOURS = [
        randColour(),
        randColour(),
        randColour(),
        randColour(),
      ];
      break;

    default:
      console.log(e.keyCode);
  }
});

function shuffle(array) {
  let copy = [...array], out = [];
  while(copy.length) {
    let choice = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(choice, 1)[0]);
  }
  return out;
}

function drawQuadrants(x, y, r, a) {
  let colours = shuffle(COLOURS);

  c.save();
  c.translate(x, y);
  c.rotate(a);
  for(let i = 0; i < 4; i++) {
    c.strokeStyle = c.fillStyle = colours[i];
    c.shadowBlur = r**.5;
    let a = TAU/4 * i;

    c.beginPath();
    c.arc(0, 0, r, a, a + TAU/4);
    c.lineTo(0, 0);
    c.fill();
    c.shadowBlur = 0;
    c.stroke();
  }
  c.restore();
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1-x2, y1-y2);
}

function draw() {
  for(let i = 0; i < speed; i++) {
    let x = Math.random() * width,
        y = Math.random() * height,
        a = Math.random() * TAU;

    let min = Infinity;
    for(let j = 0; j < circles.length; j++) {
      let it = circles[j];
      let d = dist(it.x, it.y, x, y);
      if (it.r > d) {
        j = -1;
        min = Infinity;
        x = Math.random() * width;
        y = Math.random() * height;
        continue;
      }
      if (d - it.r < min) min = d - it.r;
    }

    if (x < min) min = x;
    if (width - x < min) min = width - x;
    if (y < min) min = y;
    if (height - y < min) min = height - y;

    r = min * sep;

    drawQuadrants(x, y, r, a);
    circles.push({x: x, y: y, r: r});
  }
  requestAnimationFrame(draw);
}

draw();
