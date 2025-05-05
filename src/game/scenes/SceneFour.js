export class SceneFour extends Phaser.Scene {
  constructor() {
    super('sceneFour');
    this.number = 0;
    this.lowScoreText;
    this.midScoreText;
    this.highScoreText;
    this.textTwo = 'You scored: ' + this.number + ' points';
  }

  init(data) {
    this.number = data;
  }
  preload() {}
  create() {
    this.add.image(512, 384, 'background');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.image(400, 300, 'sky').setScale(2.5);
    this.Ian = this.add.sprite(600, 480, 'ian');
    this.Ian.scale = 6;

    this.add.image(300, 480, 'dude').setScale(5).flipX = true;
    this.add.image(100, 480, 'dude').setScale(5).flipX = true;
    this.add.image(900, 480, 'dude').setScale(5);
    this.add.image(1100, 480, 'dude').setScale(5);

    this.lowScoreText = 'text Low Score';
    this.midScoreText = 'Text Mid Score';
    this.highScoreText = 'Text High Score';
    this.textTwo = 'You scored: ' + this.number + ' points';
    this.add.text(50, 300, "Press the 'up' key to continue.", {
      fontSize: '30px',
      fill: '#fff',
    });

    if (this.number < 500) {
      this.lowScoreText = this.add.text(50, 50, this.lowScoreText, {
        fontSize: '30px',
        fill: '#fff',
      });
    } else if (this.number < 1000) {
      this.midScoreText = this.add.text(50, 50, this.midScoreText, {
        fontSize: '30px',
        fill: '#fff',
      });
    } else {
      this.highScoreText = this.add.text(50, 50, this.highScoreText, {
        fontSize: '30px',
        fill: '#fff',
      });
    }

    this.input.on(
      'pointerdown',
      function () {
        this.scene.start('SceneFive');
      },
      this
    );
  }
  update() {
    if (this.cursors.up.isDown) {
      this.scene.start('SceneFive');
    }
  }
}
