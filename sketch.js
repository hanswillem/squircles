var lm;
var m;
var p;
var rp;
var buffer;
var redraw;
var rpcount;
var bg;
var bt1;
var bt2;
var sens;


function setup() {
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowWidth);
  bg = color(26, 35, 40);
  background(bg);
  buffer.rectMode(CENTER);
  cursor(CROSS);
  redraw = false;
  p = [];
  rp = [];
  bt1 = createButton('draw');
  bt1.position(20, 20);
  bt1.mousePressed(resetSketch);
  bt2 = createButton('redraw');
  bt2.position(20, 55);
  bt2.mousePressed(animate);
  inp = createInput(0.075);
  inp.size(35);
  inp.position(20, 95);
  inp.input(setSens);
  sens = inp.value();
}


function draw() {
  background(bg);
  image(buffer, 0, 0);
  stroke(255, 50)
  line(100, 0, 100, height)
  if (redraw === false) {
    lazyMouse();
    drawParticles();
  } else {
    redrawParticles();
  }
}


// when a new stroke starts set the lm variable to the mouse position
function mousePressed() {
  lm = createVector(mouseX, mouseY);
}


// make the mouse lazy
function lazyMouse() {
  if (mouseIsPressed) {
    if (mouseX > 100) {
      m = createVector(mouseX, mouseY);
      m.sub(lm);
      m.mult(sens);
      lm.add(m);
      stroke(255, 200);
      noFill();
      line(mouseX, mouseY, lm.x, lm.y);
      ellipse(lm.x, lm.y, 25, 25);
      addParticle();
    }
  }
}


// set the sensitivity of the lazy mouse
function setSens() {
  sens = inp.value();
}


// add a particle to the p array
function addParticle() {
  if (p.length > 0) {
    if (dist(lm.x, lm.y, p[p.length - 1].x, p[p.length - 1].y) > 15) {
      p.push(new Particle(lm.x, lm.y));
    }
  } else {
    p.push(new Particle(lm.x, lm.y));
  }
}


// draw particles from the p array in the buffer
function drawParticles() {
  for (var i=0; i < p.length; i++) {
    p[i].show();
    p[i].update();
  }
}


// reset the sketch to start drawing again
function resetSketch() {
  redraw = false;
  p = [];
  rp = [];
  buffer.background(bg);
  cursor(CROSS);
}


// prepare the sketch to redraw the particles
function animate() {
  if (p.length != 0) {
    redraw = true;
    rpcount = 0;
    rp = [];
    buffer.background(bg);
    cursor(ARROW);
  }
}


// redraw particles to the buffer
function redrawParticles() {
  if (rpcount < p.length) {
    rp.push(new Particle(p[rpcount].x, p[rpcount].y));
    rpcount ++;
  }
  for (var i = 0; i < rp.length; i++) {
    rp[i].show();
    rp[i].update();
  }
}
