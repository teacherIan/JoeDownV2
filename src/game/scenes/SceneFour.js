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
    this.ian = this.add.sprite(this.scale.width / 2, 480, 'ian');
    this.ian.scale = 6;

    this.add.image(this.ian.width, 480, 'dude').setScale(5).flipX = true;
    this.add.image(this.scale.width / 4, 480, 'dude').setScale(5).flipX = true;
    this.add.image(this.scale.width * 0.75, 480, 'dude').setScale(5);
    this.add.image(this.scale.width - this.ian.width, 480, 'dude').setScale(5);

    this.lowScoreText = 'text Low Score';
    this.midScoreText = 'Text Mid Score';
    this.highScoreText = 'Text High Score';
    this.textTwo = 'You scored: ' + this.number + ' points';
    this.add.text(50, 300, 'Press Any Key to Continue.', {
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

    setTimeout(() => {
      this.input.on(
        'pointerdown',
        function () {
          this.scene.start('SceneFive');
        },
        this
      );

      this.input.keyboard.on('keydown', () => {
        this.scene.start('SceneFive');
      });
    }, 3000);
  }

  update() {}
}
