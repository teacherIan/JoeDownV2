import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { SceneOne } from './scenes/SceneOne';
import { SceneTwo } from './scenes/SceneTwo';
import { SceneThree } from './scenes/SceneThree';
import { SceneFour } from './scenes/SceneFour';
import { DodgeGame } from './scenes/DodgeGame';
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

  scene: [
    Boot,
    Preloader,
    DodgeGame,
    SceneOne,
    SceneTwo,
    SceneThree,
    SceneFour,
    MainMenu,
    MainGame,
    GameOver,
  ],

  audio: {
    disableWebAudio: false,
  },
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
