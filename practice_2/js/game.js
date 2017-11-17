var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', {preload: preload, create: create, update: update});

var ship;
var cursors;

function preload() {
  game.load.atlas('ship', 'assets/red-ship.png', 'assets/red-ship.json');
};

function create() {
  ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
  ship.frame = 1;
  ship.anchor.setTo(0.5);
  ship.animations.add('fly', Phaser.Animation.generateFrameNames('sprite', 1, 3));
  game.physics.arcade.enable(ship);

  cursors = this.input.keyboard.createCursorKeys();

};

function update() {
  ship.animations.play('fly', 5, true);
};

function handleShipMovement() {
  if (cursors.up.isDown) {
    game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
  }
};


