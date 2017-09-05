const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;
let sep = 0.6;
let speed = 3;

const PI = Math.PI;
const TAU = PI * 2;

c.shadowColor = '#000';

var COLOURS = [
  '#e34',
  '#06f',
  '#fff',
  '#111',
]
let circles = [];

function randColour() {
  let r = (Math.random()*16|0).toString(16),
      g = (Math.random()*16|0).toString(16),
      b = (Math.random()*16|0).toString(16);
  if (Math.random() > .2) return '#'+r+g+b;
  else return '#'+r+r+r;
}

window.addEventListener('click', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  sep = 0.6 + Math.random() * 0.5;
  c.shadowColor = '#000';
  circles = [];
  COLOURS = [
    randColour(),
    randColour(),
    randColour(),
    randColour(),
  ]
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
  c.shadowBlur = r**.65;
  for(let i = 0; i < 4; i++) {
    c.fillStyle = colours[i];
    let a = TAU/4 * i;

    c.beginPath();
    c.arc(0, 0, r, a, a + TAU/4);
    c.lineTo(0, 0);
    c.fill();
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

    let min = Infinity; // has to be declared outside of loop so I can use it later
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
