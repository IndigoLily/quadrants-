const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

const PI = Math.PI;
const TAU = PI * 2;

const COLOURS = [
  '#e34',
  '#06f',
  '#fff',
  '#000',
]

c.shadowBlur = 10;
c.shadowColor = '#000';

function shuffle(array) {
  let copy = [...array], out = [];
  while(copy.length) {
    let choice = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(choice, 1)[0]);
  }
  return out;
}

function drawQuadrants(x, y, r = 20, a = 0) {
  let colours = shuffle(COLOURS);

  c.save();
  c.translate(x, y);
  c.rotate(a);
  c.shadowBlur = r**.75;
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

let circles = [];

Array.prototype.min = function() {
  this.reduce( (min,val) => val < min ? val : min, Infinity );
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1-x2, y1-y2);
}

function draw() {
  let n = circles.length**.5 + 1;
  for(let i = 0; i < n; i++) {
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

    r = min * .5;

    drawQuadrants(x, y, r, a);
    circles.push({x: x, y: y, r: r});
  }
  requestAnimationFrame(draw);
}
draw();
