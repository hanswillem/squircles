// The particle object
function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.r = random(100);
  this.red = random(255);
  this.green = random(255);
  this.blue = random(255);
  this.opacity = 0;
  this.choice = int(random(2));


  this.show = function() {
    buffer.stroke(this.red, this.green, this.blue, 255);
    buffer.fill(255, this.opacity);
    if (this.choice === 1) {
      buffer.ellipse(this.x, this.y, this.r, this.r);
    } else {
      buffer.rect(this.x, this.y, this.r / 2, this.r / 2);
    }
  }


  this.update = function() {
    if ((this.r - 3 ) > 0) {
      this.r -= 3;
      this.opacity += 2;
    }
  }
}

