import { AUTO, Game as GAME, Scale, Types } from 'phaser';
import { Game } from './scenes/Game';
import { Preload } from './scenes/Preload';

// html全体の背景色を灰色にする
document.body.style.backgroundColor = '#ccc';

export const width = window.innerWidth;
export const height = window.innerHeight;

class Main extends GAME {
  constructor() {
    const config: Types.Core.GameConfig = {
      type: AUTO,
      backgroundColor: '#2033EA',
      width: width,
      height: height,
    };
    super(config);

    // シーンを追加
    this.scene.add('Game', Game);
    this.scene.add('Preload', Preload);

    // シーンをスタート
    this.scene.start('Preload');
  }
}

window.onload = () => {
  const game: GAME = new Main();
};
