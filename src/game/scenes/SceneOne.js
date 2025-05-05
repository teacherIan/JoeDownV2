import { Scene } from 'phaser';

export class SceneOne extends Scene {
  constructor() {
    super('sceneOne');
    console.log(this);
    this.score = 0;
    this.ScoreText = '';
    this.ianChange = false;
    this.theNumber = 0;
    this.theText =
      'You are Joe.\nUse the arrow keys, or swipe to move & jump.\nGo talk to Ian.';
    //this.versionText = "Version 0.84";
    this.check = false;
    this.screenTouch = false;
    this.moveLeft = false;
    //Ian talk
    this.ianText = 'How are you Joe?';
    this.ianTextControl = '';
    // this.scene.scale.lockOrientation('portrait');
    this.swipeStartX = 0;
    this.swipeEndX = 0;
  }

  preload() {
    this.add.image(512, 384, 'background');
    this.theText = this.add.text(16, 16, this.theText, {
      fontSize: '32px',
      fill: '#ffffff',
    });
    this.ianTextControl = this.add.text(150, 320, this.ianTextControl, {
      fontSize: '20px',
      fill: '#ffffff',
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.clothes = this.physics.add.sprite(520, 200, 'suitCase');
    this.clothes.scale = 0.5;
    this.clothes.visible = false;

    this.Ian = this.physics.add.sprite(450, 480, 'ian');
    this.Ian.scale = 2.4;
    this.Ian.body.offset.y = -1.5;

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
    //Ian's platform
    this.platforms.create(525, 570, 'platform').refreshBody();
    this.platforms.create(1000, 520, 'platform').refreshBody();
    this.platforms.create(1300, 400, 'platform').refreshBody();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.Ian, this.platforms);
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
  }

  handleSwipe() {
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
      this.Ian.anims.play('ianTurn', true);
      this.Ian.y = 480;
      this.ianChange = true;
      this.Ian.body.offset.y = -2.6;
      this.ianTextControl.setText(
        `No clothes again, eh Joe?! \nJump up here. \nI've got some extra for ya.`
      );
      this.clothes.visible = true;
    }
    if (this.cursors.space.isDown) {
      this.theNumber = this.theNumber + 1;
    }
    if (this.theNumber > 20) {
      //this.theText.setText("Do you notice how slow you move and \n how hard it is for you to jump? \n It's because your so fat... \n Waddle on over to you're friend Ian. ");
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
