let block1;
let block2;
let counter;
let clack;
let timeSteps = 1;

function preload() {
  clack = loadSound('clack.mp3');
}

function setup() {
  createCanvas(600, 600);
  // setup 
  input = createInput();
  input.position(380, 40);
  button = createButton('submit');
  button.position(input.x + input.width, input.y);
  button.mousePressed(start);

  // init blocks to default
  block1 = new Block(100, 10, 0, 1);
  block2 = new Block(200, 100, -1 / timeSteps, 1);
  counter = 0;
}


function start() {
  noLoop();
  const digits = input.value();
  // init new blocks and reset counter
  timeSteps = pow(10, digits - 2)
  block1 = new Block(100, 10, 0, 1);
  m2 = pow(100, digits - 1);
  block2 = new Block(200, 100, -1 / timeSteps, m2);
  counter = 0;
  // start animating
  loop();
}

function resolveCollision(block1, block2) {
  total_mass = block1.mass + block2.mass;

  v1_after = block1.velocity * ((block1.mass - block2.mass) / total_mass) + block2.velocity * ((2 * block2.mass) / total_mass);
  v2_after = block1.velocity * ((2 * block1.mass) / total_mass) + block2.velocity * ((block2.mass - block1.mass) / total_mass);

  block1.updateVelocity(v1_after);
  block2.updateVelocity(v2_after);
}

function draw() {
  // background rendering
  background(220);
  textSize(20)
  text("How many digits of Pi?", 380, 30)
  text("Collisions: " + counter, 10, 30);

  // don't clack on every collision
  let shouldClack = false;
  for (i = 0; i < timeSteps; i++) {
    if (block1.isColliding(block2)) {
      counter += 1;
      resolveCollision(block1, block2);
      shouldClack = true;
    }

    if (block1.hitWall()) {
      counter += 1;
      block1.updateVelocity(-block1.velocity);
      shouldClack = true;
    }
    textSize(32);
    block1.update();
    block2.update();
  }

  block1.show();
  block2.show();

  // label blocks with relative weight
  textSize(12);
  push();
  textAlign(CENTER);
  text("1kg", block1.x + block1.width / 2, height - block1.width);
  text(block2.mass.toLocaleString() + "kg", block2.x + block2.width / 2, height - block2.width / 2);
  pop();
  
  if (shouldClack) {
    clack.play();
    shouldClack = false;
  }
}