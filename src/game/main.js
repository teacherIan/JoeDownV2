import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { SceneOne } from './scenes/SceneOne';
import { SceneTwo } from './scenes/SceneTwo';
import { AUTO, Game } from 'phaser';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  //   backgroundColor: '#028af8',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, SceneOne, SceneTwo, MainMenu, MainGame, GameOver],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

// function resizeApp() {
//   //screen.orientation.lock('portrait');
//   //ScreenOrientation.lock('portrait');
//   // Width-height-ratio of game resolution
//   // Replace 360 with your game width, and replace 640 with your game height
//   let game_ratio = 1200 / 800;

//   // Make div full height of browser and keep the ratio of game resolution
//   let div = document.getElementById('phaser-app');
//   div.style.width = window.innerHeight + 'px';
//   div.style.height = window.innerHeight + 'px';
//   // * game_ratio
//   // Check if device DPI messes up the width-height-ratio
//   let canvas = document.getElementsByTagName('canvas')[0];

//   let dpi_w = parseInt(div.style.width) / canvas.width;
//   let dpi_h = parseInt(div.style.height) / canvas.height;

//   let height = window.innerHeight * (dpi_w / dpi_h);
//   let width = height * game_ratio;

//   // Scale canvas
//   canvas.style.width = width + 'px';
//   canvas.style.height = height + 'px';
// }

// window.addEventListener('resize', resizeApp);

export default StartGame;
