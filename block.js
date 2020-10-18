class Block {
  constructor(x, w, v, m) {
    this.x = x;
    this.width = w;
    this.velocity = v;
    this.mass = m;
  }

  update() {
    this.x += this.velocity;
  }

  isColliding(other) {
    return !(((this.x + this.width) < other.x) || (other.x + other.width < this.x));
  }

  hitWall() {
    return this.x <= 0;
  }

  updateVelocity(v) {
    this.velocity = v;
  }

  show() {
    rect(this.x, height - this.width, this.width, this.width);
  }

}