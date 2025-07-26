let pigeonImage;
let flyingImage;
let pigeons = [];
let popcorn = null;
let popcornTarget = null;
let popcornFalling = false;
let popcornSize = 140;
let popcornBites = 0;
let pigeonsFed = 0;


function preload() {
  pigeonImage = loadImage("pigeon.png"); // must be in same folder
  flyingImage = loadImage("Flying.png")
  cornImage = loadImage("Corn.png");
}

function setup() {
  createCanvas(1200, 1000);
  for (let i = 0; i < 10; i++) {
    pigeons.push(new Pigeon(random(width), random(height)));
  }
}

function draw() {
  background(80, 160, 80); // green field

  // score displaing
  fill(0);
  textSize(48);
  textAlign(LEFT, TOP);
  text(`Pigeons fed: ${pigeonsFed}`, 20, 20);  // Padding 20px

  // All pigeons are fed Animation
  if (pigeonsFed >= pigeons.length) {
    fill(20, 120, 20);  //Dark green
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Thank you for the corn :)", width / 2, height / 2);  // Right center with margin
  }

  // Draw fence
  noFill();
  stroke(120, 70, 20);
  strokeWeight(12);
  rect(6, 6, width - 12, height - 12);

  // Update and show pigeons
  for (let pigeon of pigeons) {
    pigeon.update();
    pigeon.show();
  }

  // Animate falling popcorn
  if (popcorn) {
    if (popcornFalling) {
      let step = p5.Vector.sub(popcornTarget, popcorn).setMag(5);
      popcorn.add(step);

      if (p5.Vector.dist(popcorn, popcornTarget) < 5) {
        popcorn = popcornTarget.copy();
        popcornFalling = false;

        // Play landing sound
        const landSound = document.getElementById("land-sound");
        if (landSound) {
          landSound.currentTime = 0;  // Rewind in case it's still playing
          landSound.play();
        }

        // Let pigeons seek the popcorn
        for (let pigeon of pigeons) {
          if (!pigeon.ate && popcorn !=null) {
            pigeon.seek(popcorn);
          } 
        }
      }
    }

    // Draw popcorn with size depending on how many bites it has
    if (cornImage && popcornBites < 2) {
      imageMode(CENTER);
      let size = (popcornBites === 0) 
      ? popcornSize
      : popcornSize / 2;
      image(cornImage, popcorn.x, popcorn.y, size, size);

    }
  }
}

function mousePressed() {
  popcornTarget = createVector(mouseX, mouseY);
  popcorn = createVector(mouseX, 0); // drop from top
  
  popcornFalling = true;
  popcornBites = 0;  // reset Bites!

  // Play pop sound
  const popSound = document.getElementById("pop-sound");
  if (popSound) popSound.play();
}

class Pigeon {
  constructor(x, y) {
    this.image = pigeonImage;
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 1));
    this.speed = random(0.5, 1.5);
    this.target = null;
    this.hasEatenThisPopcorn = false; // New flag to track if this specific pigeon has eaten from the current popcorn
    this.fed = false;  //Flag: true if this pigeon has eaten
    this.pauseFrames = 0;
    this.size = 110;
  }

  update() {
    if (this.pauseFrames > 0) {
      this.pauseFrames--;
      return;
    }

    // If the pigeon has been fed, it just wanders and doesn't seek
    if (this.fed) {
      this.wander();
      this.pos.add(this.vel);  //Ensure it moves
      //Keep within boundary
      this.pos.x = constrain(this.pos.x, 12, width - 12);
      this.pos.y = constrain(this.pos.y, 12, height - 12);
      if (random() < 0.005) {  // Still alow occasional pauses
        this.pauseFrames = int(random(10, 40));
      }
      return;  //Stop further update if fed
    }

    // Normal behavior for unfed pigeons
    if (this.target) {
      // Check if the pigeon is close enough to its target popcorn
      if (popcorn && p5.Vector.dist(this.pos, this.target) < 10) {
        this.eat();
      } else if (!popcorn || this.hasEatenThisPopcorn) { // If popcorn is gone or this pigeon already ate it, clear target
        this.target = null;
        this.wander(); // Go back to wandering
      } else {
        this.seek(this.target);
      }
    } else {
      this.wander();
    }

    this.pos.add(this.vel);

    if (random() < 0.005) {
      this.pauseFrames = int(random(10, 40));
    }

    this.pos.x = constrain(this.pos.x, 12, width - 12);
    this.pos.y = constrain(this.pos.y, 12, height - 12);
  }

  show() {
    imageMode(CENTER);
    if (this.image) {
      image(this.image, this.pos.x, this.pos.y, this.size, this.size);
    } else if (pigeonImage) {
      image(pigeonImage, this.pos.x, this.pos.y, this.size, this.size);
    } else {
      fill(200);
      ellipse(this.pos.x, this.pos.y, 20, 20);
    }
  }

  seek(target) {
    this.target = target.copy();
    let desired = p5.Vector.sub(this.target, this.pos).setMag(this.speed);
    this.vel = desired;
  }

  wander() {
    if (random() < 0.01) {
      this.vel = p5.Vector.random2D().mult(this.speed);
    }
  }

  eat() {
    // Only allow eating if there is popcorn and this pigeon hasn't eaten this specific popcorn yet
    // And the global popcoenBites is less than 2
    if (!popcorn || this.hasEatenThisPopcorn || popcornBites >=2) {
      return;
    }

    this.hasEatenThisPopcorn = true; // Mark this pigeon as having eaten from the current popcorn
    this.fed = true;  // This pigeon has now been fed permanently
    this.pauseFrames = 60; // Pause for a moment after eating
    this.image = flyingImage; // Change image to show it's "flying away" or satisfied
    this.target = null; // Clear the target for this pigeon

    popcornBites++; // Increment the global bite count for the current popcorn
    pigeonsFed++; // Increment the total number of unique pigeons fed

    // Play croc sound
    const crocSound = document.getElementById("croc-sound");
    if (crocSound) {
      crocSound.currentTime = 0;
      crocSound.play();
    }

    // If two pigeons have eaten this popcorn, remove it
    if (popcornBites >= 2) {
      popcorn = null;
      popcornTarget = null;
      popcornFalling = false;

      // Reset the hasEatenThisPopcorn flag for ALL pigeons so thet target the NEXT popcorn
      // This will only affect unfed pigeons now due to the `this.fed` check in update
      for (let pigeon of pigeons) {
        pigeon.hasEatenThisPopcorn = false;
        // Only reset image for pigeons that haven't been fed yet
        if (!pigeon.fed) {
          pigeon.image = pigeonImage;
        }
      }
      console.log("Popcorn fully eaten and all targets cleared.");
    } else {
      console.log(`Popcorn bitten once. Bites so far: ${popcornBites}`);
    }
  }
}