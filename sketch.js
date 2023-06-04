var scenes = [ GameRoundScene, IntroScene ];

function preload() {
  // preload all images required by the various scenes
  scenes.map(s => s.preload && s.preload());
}

function setup() {
  createCanvas(500, 500);
  StateManager.changeStage(new GameRoundScene());
//  StateManager.changeStage(new IntroScene());
}

function mousePressed() {
  var stage = StateManager.stage;
  stage.mousePressed && stage.mousePressed();
}

function draw() {
  var stage = StateManager.stage;
  stage.draw();
}