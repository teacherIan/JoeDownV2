import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.add.image(512, 384, 'background');

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets');
    this.load.image('logo', 'logo.png');

    //my assets

    this.load.audio('catfish', 'Catfishgamesmall.mp3');

    this.load.image('bomb', 'bomb.png');
    this.load.image('platform', 'platform.png');
    this.load.image('sky', 'sky.png');
    this.load.image('star', 'star.png');
    this.load.spritesheet('dude', 'JoeNewSheet.png', {
      frameWidth: 59,
      frameHeight: 52.5,
    });
    this.load.image('ian', 'IanStand.png');
    this.load.spritesheet('ianLeft', 'IanLeftTurn.png', {
      frameWidth: 63,
      frameHeight: 61,
    });
    this.load.image('suitCase', 'suitCase.gif');
    this.load.bitmapFont('arcadeFont', 'arcade.png', 'arcade.xml');
  }

  create() {
    this.scene.start('sceneOne');
  }
}
