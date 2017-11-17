var game = new Phaser.Game(800, 600, Phaser.CANVAS, '');
var weapon;
var fireButton;
var MainState = {
  preload: function() {
    this.load.image('background', 'assets/background-forest.png');
    this.load.atlas('boy', 'assets/boy.png', 'assets/boy.json');
    this.load.atlas('things', 'assets/things.png', 'assets/things.json');
    this.load.image('bullet', 'assets/bullet.png');

  },
  create: function() {
    // add objects
    this.background = this.add.image(0, 0, 'background');
    this.background.height = this.game.height;
    this.background.width = this.game.width;
    this.yellowFire = this.add.sprite(200, 200, 'things'); 
    this.blueFire = this.add.sprite(250, 250, 'things');
    this.boy = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'boy');
    this.fireplace = this.add.sprite(500, 500, 'things')
    this.objectVelocity = 400; 

    //enable physics
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.enable(this.boy);
    this.physics.arcade.enable(this.yellowFire);
    this.physics.arcade.enable(this.blueFire);
    this.physics.arcade.enable(this.fireplace);


    //create the boy
    this.boy.body.collideWorldBounds = true;
    // this.boy.scale.setTo(3);
    this.boy.animations.add('walk-down', Phaser.Animation.generateFrameNames('sprite', 1, 3));
    this.boy.animations.add('walk-left', Phaser.Animation.generateFrameNames('sprite', 4, 6));
    this.boy.animations.add('walk-right', Phaser.Animation.generateFrameNames('sprite', 7, 9));
    this.boy.animations.add('walk-up', Phaser.Animation.generateFrameNames('sprite', 10, 12));

    //create yellow fire
    this.yellowFire.frame = 49;
    this.yellowFire.body.width = 8
    this.yellowFire.body.height = 8
    this.yellowFire.animations.add('burn', Phaser.Animation.generateFrameNames('sprite', 49, 50));
    this.yellowFire.body.immovable = true;


    //create blue fire
    this.blueFire.frame = 61;
    this.blueFire.animations.add('burn', Phaser.Animation.generateFrameNames('sprite', 61, 63));
    this.blueFire.body.bounce.setTo(1,1);

    //create the thing
    this.fireplace.frame = 71;
    this.fireplace.anchor.setTo(0.5);
    this.fireplace.body.velocity.setTo(200, 200)
    this.fireplace.body.collideWorldBounds = true;
    this.fireplace.body.bounce.set(1,1)
    console.log(this.fireplace.body)

    weapon = game.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;
    weapon.trackSprite(this.boy, 0, 0, true);
    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

  },
  update: function() {
    this.handleBoyMovement();
    this.yellowFire.animations.play('burn', 10, true);
    this.blueFire.animations.play('burn', 10, true);
    this.checkCollide(this.boy, this.yellowFire);
    this.checkCollide(this.boy, this.blueFire);
    this.yellowFire.body.width = 12
    this.yellowFire.body.height = 12

    if (fireButton.isDown)
    {
        weapon.fire();
    }
    // this.fireplace.body.velocity.y = 400;


  },
  handleBoyMovement: function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.boy.animations.play('walk-left', 5, true);
        this.boy.x -= 2;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.boy.animations.play('walk-right', 5, true);
        this.boy.x += 2;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.boy.animations.play('walk-up', 5, true);
        this.boy.y -= 2;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.boy.animations.play('walk-down', 5, true);
        this.boy.y += 2;
    }
  },
  checkCollide: function(obj1, obj2) {
    this.physics.arcade.collide(obj1, obj2, this.handleCollision, null, this);
  },
  handleCollision: function(obj1, obj2){
    console.log('collided')
  },
  render: function() {
    // this.game.debug.body(this.yellowFire);
    // this.game.debug.body(this.blueFire);
    // this.game.debug.body(this.boy);
    // this.game.debug.body(this.fireplace);
  }
};


game.state.add('MainState', MainState);
game.state.start('MainState');