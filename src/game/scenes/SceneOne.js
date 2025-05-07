import { Scene } from 'phaser';

export class SceneOne extends Scene {
  constructor() {
    super('sceneOne');
    this.score = 0;
    this.ScoreText = '';
    this.ianChange = false;
    this.theNumber = 0;
    this.textA = 'This is a demo project';
    this.textACopy = '';

    this.check = false;
    this.screenTouch = false;
    this.moveLeft = false;
    //ian talk
    this.ianText = 'Text B';
    this.ianTextControl = '';

    this.swipeStartX = 0;
    this.swipeEndX = 0;

    this.textUpdater();
  }

  textUpdater() {
    console.log('From Text Updater');
    if (this.textACopy.length < this.textA.length) {
      this.textACopy = this.textACopy.concat('A');
    }
  }

  preload() {
    this.add.image(512, 384, 'background');

    this.cursors = this.input.keyboard.createCursorKeys();

    this.clothes = this.physics.add.sprite(520, 200, 'suitCase');
    this.clothes.scale = 0.5;
    this.clothes.visible = false;

    this.ian = this.physics.add.sprite(450, 480, 'ian');
    this.ian.scale = 2.4;
    this.ian.body.offset.y = -1.5;

    this.player = this.physics.add.sprite(100, 515, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds = true;

    this.player.body.setSize(0.5);
    this.player.scale = 2;

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

    this.platforms = this.physics.add.staticGroup();

    //ground platform
    this.platforms.create(100, 590, 'platform').refreshBody();
    //ian's platform
    this.platforms.create(525, 570, 'platform').refreshBody();
    this.platforms.create(1000, 520, 'platform').refreshBody();
    this.platforms.create(1300, 400, 'platform').refreshBody();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.ian, this.platforms);
    this.physics.add.collider(this.clothes, this.platforms);

    this.input.on('pointerdown', (pointer) => {
      this.swipeStartX = pointer.x;
    });

    this.input.on('pointerup', (pointer) => {
      this.swipeEndX = pointer.x;
      this.handleSwipe();
    });
  }

  create() {
    let music = this.sound.add('catfish');
    music.play();

    this.theText = this.add.bitmapText(16, 16, 'arcadeFont', this.textA);

    this.ianTextControl = this.add.bitmapText(
      150,
      320,
      'arcadeFont',
      this.ianTextControl,
      20
    );

    this.time.addEvent({
      delay: 1000, // 1000 ms = 1 second
      callback: this.textUpdater, // Function to call
      callbackScope: this, // Scope of the callback
      loop: true, // Repeat the event
    });
  }

  handleSwipe() {
    this.screenTouch = true;
    const swipeDistance = this.swipeEndX - this.swipeStartX;

    if (swipeDistance > 50) {
      // Swipe right
      console.log('Swiped right');
      this.player.setVelocityX(50);
      this.player.anims.play('right', true);
      this.player.flipX = true;
    } else if (swipeDistance < -50) {
      // Swipe left
      console.log('Swiped left');
      this.player.setVelocityX(-50);
      this.player.anims.play('left', true);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.stop();
    }
  }

  update() {
    this.theText.text = this.textACopy;

    if (this.player.x > 302) {
      this.player.angle += 2;
    }
    if (this.player.y > 1500) {
      this.scene.start('sceneTwo');
    }
    if (this.screenTouch === false) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-50);
        this.player.anims.play('left', true);
        this.player.flipX = false;
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(50);
        this.player.anims.play('right', true);
        this.player.flipX = true;
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
      }
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-100);
      }
    }

    if (this.player.x > 200 && this.ianChange === false) {
      this.ian.anims.play('ianTurn', true);
      this.ian.y = 480;
      this.ianChange = true;
      this.ian.body.offset.y = -2.6;
      this.ianTextControl.setText('Text C');
      this.clothes.visible = true;
    }
    if (this.cursors.space.isDown) {
      this.theNumber = this.theNumber + 1;
    }
    if (this.moveLeft) {
      this.player.setVelocityX(25);
      this.theNumber = this.theNumber + 100;
      this.player.anims.play('right', true);
      this.player.flipX = true;
      //   this.screenTouch = true;
      this.check = true;
    } else if (!this.moveLeft && this.check === true) {
      this.player.setVelocityX(0);
      this.player.anims.play('turn');
    }
  }
}
