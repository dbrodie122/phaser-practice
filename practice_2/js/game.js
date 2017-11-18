var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var ship;
var cursors;
var starfield;
var weapon;
var fireButton;
var laser;

function preload() {
  game.load.atlas('ship', 'assets/red-ship.png', 'assets/red-ship.json');
  game.load.image('starfield', 'assets/starfield.png');
  game.load.image('bullet', 'assets/bullet.png');
  game.load.audio('laser', 'assets/laser.wav');
};

function create() {
// background
  starfield = game.add.sprite(0, 0, 'starfield');
  starfield.height = game.height;
  starfield.width = game.width;
// sound
laser = game.add.audio('laser');
// laser.allowMultiple = true;

// ship
  ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
  ship.frame = 1;
  ship.anchor.setTo(0.5);
  ship.animations.add('fly', Phaser.Animation.generateFrameNames('sprite', 1, 3));
  game.physics.arcade.enable(ship);
  ship.body.drag.set(70);
  ship.body.maxVelocity.set(200);

// weapon
weapon = game.add.weapon(30, 'bullet');
weapon.bulletType = Phaser.Weapon.KILL_WORLD_BOUNDS;
weapon.bulletSpeed = 600;
weapon.fireRate = 200;
weapon.trackSprite(ship, 0, 0, true);



// cursors
  cursors = game.input.keyboard.createCursorKeys();
  fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
};

function update() {
  ship.animations.play('fly', 5, true);
  handleShipMovement();
  handleFiring();
};

function handleShipMovement() {
  if (cursors.up.isDown) {
    game.physics.arcade.accelerationFromRotation(ship.rotation, 300, ship.body.acceleration);
    
  } else {
    ship.body.acceleration.set(0);
  }
  if (cursors.left.isDown) {
    ship.body.angularVelocity = -300;
  } else if (cursors.right.isDown) {
    ship.body.angularVelocity = 300;
  } else {
    ship.body.angularVelocity = 0;
  }

  game.world.wrap(ship, 16);
};
function handleFiring() {
  if (fireButton.isDown) {
    weapon.fire();
    // if(laser.isPlaying) {
    //   return;
    // } else {
      laser.play();
    // }
  }
}


