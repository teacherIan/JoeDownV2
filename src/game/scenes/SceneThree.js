export class SceneThree extends Phaser.Scene {
  constructor() {
    super('sceneThree');
    this.ianTextControl = 'Text A';
    this.ianTextControlTwo = 'Text B';
    this.ianTextControlThree = 'Text C';
    this.ianTextControlFour = 'Text D';
  }

  preload() {}

  create() {
    this.add.image(512, 384, 'background');
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 700, 'platform').setScale(4.5).refreshBody();

    this.player = this.physics.add.sprite(-1900, -4000, 'dude');
    this.player.flipX = true;
    this.player.scale = 2;
    this.player.setBounce(0.3);

    this.ianTextControl = this.add.text(10, 50, this.ianTextControl, {
      fontSize: '35px',
      fill: '#fff',
    });
    this.ianTextControlTwo = this.add.text(10, 200, this.ianTextControlTwo, {
      fontSize: '35px',
      fill: '#fff',
    });
    this.ianTextControlThree = this.add.text(
      10,
      360,
      this.ianTextControlThree,
      { fontSize: '35px', fill: '#fff' }
    );
    this.ianTextControlFour = this.add.text(10, 500, this.ianTextControlFour, {
      fontSize: '50px',
      fill: '#fff',
    });

    this.physics.add.collider(this.player, this.platforms);
  }
  update() {
    this.player.angle += 10;
    this.player.x += 7;
    if (this.player.x > 1400) {
      this.scene.start('dodgeGame');
    }
  }
}
