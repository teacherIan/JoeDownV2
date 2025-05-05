export class DodgeGame extends Phaser.Scene {
  constructor() {
    super('dodgeGame');
    this.readyVar = false;
    this.screenTouch = false;
    this.goRight = true;
    this.instructions = 'Instructions Text';
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);
    this.add.image(512, 384, 'background').setAlpha(0.5);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(300, 50, this.instructions, {
      fontSize: '30px',
      fill: '#fff',
    });

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(320, 750, 'platform').setScale(6).refreshBody();
    this.number = 0;
    var scoreText = this.add.text(20, 20, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff',
    });

    this.player = this.physics.add.sprite(0, 200, 'dude').setScale(2);
    this.player.setVelocityX(7);
    this.player.angle += 10;
    this.player.setCollideWorldBounds(true);
    this.player.debugShowBody = true;
    this.player.setSize(1, 35);

    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 0 }),
      frameRate: 0,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 7 }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: 'ianTurn',
      frames: this.anims.generateFrameNumbers('ianLeft', { start: 0, end: 0 }),
      frameRate: 5,
      repeat: -1,
    });

    const ians = this.physics.add.group();

    const ianGen = () => {
      const xCoord = Math.random() * 1200;
      ians.create(xCoord, -200, 'ian');
    };
    let newNumber = 0;
    const bugGenLoop = this.time.addEvent({
      timeScale: 1,
      delay: 150,
      callback: ianGen,
      loop: true,
    });

    this.physics.add.collider(ians, this.platforms, function (ians) {
      ians.destroy();
      newNumber += 10;
      scoreText.setText(`Score: ${newNumber}`);
      this.nextNumber++;
    });

    this.physics.add.collider(this.player, ians, () => {
      bugGenLoop.destroy();
      this.physics.pause();
      this.scene.start('sceneFour', newNumber);
    });

    this.input.on(
      'pointerdown',
      function () {
        if (this.screenTouch === false && this.player.body.touching.down) {
          this.player.setVelocityX(120);
          this.screenTouch = true;
          this.player.anims.play('right', true);
          this.player.flipX = true;
        } else if (
          this.screenTouch &&
          this.player.body.touching.down &&
          this.goRight
        ) {
          this.player.setVelocityX(-120);
          this.player.flipX = false;
          this.goRight = false;
        } else {
          this.player.setVelocityX(120);
          this.player.flipX = true;
          this.goRight = true;
        }
      },
      this
    );
  }

  update() {
    if (this.readyVar == false) {
      this.player.setVelocityX(220);
      this.player.angle += 10;
    }
    if (this.player.body.touching.down && this.readyVar == false) {
      this.player.angle = 0;
      this.readyVar = true;
      this.player.setVelocityX(0);
    }

    if (this.cursors.right.isDown && this.readyVar == true) {
      this.player.setVelocityX(120);
      this.player.anims.play('right', true);
      this.player.flipX = true;
    }
    if (this.cursors.left.isDown && this.readyVar == true) {
      this.player.setVelocityX(-120);
      this.player.anims.play('left', true);
      this.player.flipX = false;
    }
  }
}
