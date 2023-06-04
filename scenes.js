const STARS = 50;
const MAXCOLLISIONS = 100 * STARS;
const MAXTIME = 10;


class StateManager {
  static stage;
  static changeStage(stage) {
    StateManager.stage = stage;
    stage.parent = StateManager;
  }
}

class Scene {  
  changeStage(stage) {
    this.parent.changeStage(stage);
  }
}

class SpongeBob {
  constructor(x,y,s) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.oscillation = 0;
    this.v = 10;
  }

  draw() {
    this.oscillation += 0.2;
    var scale = 1 + sin(this.oscillation) / 20;
    if(this.x > 400)
      this.v = -2
    if(this.x < 20)
      this.v = 2;
    this.x += this.v;
    image(GameRoundScene.spongeBobImage,this.x, this.y,this.s*scale,this.s*scale);
  }
}

class GameRoundScene extends Scene {
  constructor() {
    super();
    this.time = MAXTIME;
    this.score = 0;
    this.stars = [];
    this.initialize();
  }
  
  static beachImage;
  static starImage;
  static spongeBobImage;
  
  static preload() {
    GameRoundScene.beachImage = loadImage("beach-quotes.jpg");
  //  beach = loadImage("assets/Beach.svg");
    GameRoundScene.starImage = loadImage("starfish-a.svg");
    // spongeBob = loadImage("assets/swf-spongebob-happy-png.jpg");
    // spongeBob = loadImage("assets/spongebob.png");
    GameRoundScene.spongeBobImage = loadImage("pack-png-spongebob-12.png");    
  }
  
  initialize() {
    var collisions = 0;
    var idx = 0;
    while(this.stars.length < STARS && collisions < MAXCOLLISIONS )
    {
      // create random star
      // var x = random() * 420 + 50;
      // var y = random() * 170 + 180;
      var x = random() * 420 + 50;
      var y = random() * 170 + 280;
      var size = 0.2 * ( 0.5 + random() );
      var angle = random() * 360;
      var star = new Star(GameRoundScene.starImage,x,y,size, angle, idx);
      // now check there's no collision
      var collides = false;
      for(var s of this.stars)
        if(s.collide(star)) {
          collides = true;
          break;        
        }
      if(collides) {
        collisions++;      
        continue;
      }
      // if there's no collision, add it
      this.stars.push(star);
      idx++;
    }
    print("Ended up with ", this.stars.length, " stars");

    setInterval(() => { this.time = max(this.time-0.1,0) }, 100);
    this.spongeBob = new SpongeBob(420,230,70);
  }
  
  gameOver() {
    return this.time == 0;  
  }
  
  mousePressed() {
    if(this.gameOver()) {
      this.changeStage(new GameRoundScene());
      return;
    }
    
    for(var star of this.stars) {
       if(star.click()) {
         print(this.score);
         this.score++;
         return; // stop as soon as we click on one
       }
    }
  }
  
  
  draw() {
    background(220);
  
    image(GameRoundScene.beachImage,1,1);
    this.stars.map(star => star.draw());
    this.spongeBob.draw();

    textSize(20);
    fill(50);
    text("Time: " + this.time.toFixed(1),40,45);
    text("Score: " + this.score.toString(),40,70);

    if(this.gameOver()) {
      textSize(50);
      text("Game over", 130, 150);
    }
  }  
}


class IntroScene extends Scene {
  constructor() {
    super();
    this.y = 0;
    this.scroll = true;
  }

  static preload() {
      IntroScene.story = loadImage("StarFishStory.svg");
  }
  
  draw() {
    background(255);
    var story = IntroScene.story;
    image(story,1,this.y,story.width,story.height);
    if(this.scroll)
      this.y -= 10;
    
    if(this.y < -250) {
      this.scroll = false;
      textSize(50);
      text("Click to play",120,480);
    }
  }
  
  mousePressed() {
   this.changeStage(new GameRoundScene());
  }
}
