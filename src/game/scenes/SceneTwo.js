export class SceneTwo extends Phaser.Scene {
  constructor() {
    super('sceneTwo');
    this.ianTextControl = '';
    this.ianTextControlTwo = '';
    this.ianTextControlThree = '';
  }

  preload() {
    // this.load.spritesheet('dude', 'JoeNewSheet.png', {
    //   frameWidth: 59,
    //   frameHeight: 52.5,
    // });
    // this.load.image('sky', 'sky.png');
    // this.load.image('schedule', 'Schedule.png');
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);
    this.add.image(512, 384, 'background').setAlpha(0.5);
    // this.add.image(600, 450, 'schedule').setScale(0.5);

    this.ianTextControl = 'Oh No! What have you done to poor Joe???';
    this.ianTextControlTwo = "Why didn't you jump up on the platform???";
    this.ianTextControlThree = 'waaa';

    this.ianTextControl = this.add.text(5, 5, this.ianTextControl, {
      fontSize: '40px',
      fill: '#fff',
    });
    this.ianTextControlTwo = this.add.text(5, 65, this.ianTextControlTwo, {
      fontSize: '40px',
      fill: '#fff',
    });
    this.ianTextControlThree = this.add.text(5, 130, this.ianTextControlThree, {
      fontSize: '40px',
      fill: '#fff',
    });

    this.player = this.physics.add.sprite(-400, -3000, 'dude');
    this.player.flipX = true;
    this.player.scale = 3;
  }
  update() {
    this.player.angle += 5;
    this.player.x += 3;
    if (this.player.y > 2000) {
      this.scene.start('sceneThree');
    }
  }
}
