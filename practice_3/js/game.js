var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var graphics = [];
var twoLayers = [];

function preload() {
  // graphics = game.add.graphics(100, 100);

};

function create() {
  twoLayersOfRect(3);

  // graphics.beginFill(0xFF700B, 1);
  // graphics.drawRect(50, 250, 100, 100);
  //redish border
  // graphics.lineStyle(2, 0xFF0000, 0.8);
  // blue border
  // graphics.lineStyle(2, 0x0000FF, 1);

  // graphics.drawRect(200, 250, 100, 100);

};

function update() {

};

function makeRectangles(num) {
  var xPos = 50;
  var yPos = 250;
  for (var i = 0; i < num; i++) {

    var rect = game.add.graphics(100,100);
    rect.beginFill(0xFF700B, 1);
    rect.drawRect(xPos, yPos, 100, 100);
    xPos += 200
  }
}

function twoLayersOfRect(num) {
    var layer1 = [];
    var layer2 = [];
    var xPos = 50;
    var yPos = 250;
    var yPos2 = 400;

    for (var i = 0; i < num; i++) {
      var rect = game.add.graphics(100,100);
      rect.beginFill(0xFF700B, 1);
      rect.drawRect(xPos, yPos, 100, 100);
      // rect.click(handleClick);
      var sprite = game.add.sprite(0,0, rect);
      console.log(rect);
      layer1.push(rect);

      var rect2 = game.add.graphics(100, 100);
      rect2.beginFill(0xFF700B, 1);
      rect2.drawRect(xPos, yPos2, 100, 100);
      // rect2.click(handleClick);
      layer2.push(rect2);
      xPos += 200
    }
    twoLayers.push(layer1);
    twoLayers.push(layer2);
    console.log(twoLayers);
  }

  function handleClick() {
    console.log('clicked!')
  }