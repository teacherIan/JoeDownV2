export class SceneFive extends Phaser.Scene {
  constructor() {
    super('SceneFive');
    this.playAgainText = 'Play Again';
    this.spriteArray = [];
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(512, 384, 'background');

    this.spriteArray.push({
      image: this.add
        .image(this.scale.width / 2, Math.random() * -300, 'ian')
        .setScale(15, 15),
      speed: Math.random() * 2,
    });

    for (let i = 0; i < 10; i++) {
      this.spriteArray.push({
        image: this.add.image(
          Math.floor(Math.random() * this.scale.width),
          Math.random() * -700,
          'dude'
        ),
        speed: Math.random() * 4,
      });
    }

    for (let i = 0; i < 10; i++) {
      this.spriteArray.push({
        image: this.add.image(
          Math.floor(Math.random() * this.scale.width),
          Math.random() * -700,
          'ian'
        ),
        speed: Math.random() * 4,
      });
    }

    this.add.text(10, 50, 'Text A', { fontSize: '50px', fill: '#fff' });
    this.add.text(10, 250, 'Text B', { fontSize: '40px', fill: '#fff' });

    this.playAgainText = this.add
      .text(this.scale.width / 2, 550, this.playAgainText, {
        fontSize: '40px',
        fill: '#fff',
      })
      .setOrigin(0.5, 0.5);
    this.playAgainText.setInteractive();
    this.playAgainText.on('pointerdown', this.playAgain, this);
  }

  playAgain() {
    window.location.reload();
  }

  updateSpritePosition(sprite, speed) {
    sprite.y += speed;
    sprite.flipY = true;
    if (sprite.y > 1500) {
      this.resetSpritePosition(sprite);
    }
  }
  resetSpritePosition(sprite) {
    sprite.y = -500;
    sprite.x = Math.floor(Math.random() * 1500);
  }

  update() {
    for (let i = 0; i < this.spriteArray.length; i++) {
      this.updateSpritePosition(
        this.spriteArray[i].image,
        this.spriteArray[i].speed
      );
    }
  }
}
