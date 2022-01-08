import { AUTO, Game as GAME, Scale, Types } from 'phaser';
import { Game } from './scenes/Game';
import { Preload } from './scenes/Preload';
import { H, W } from 'functions/DOM/windowInfo';
import '@/styles/index.scss';

window.onload = () => {
  // 画面いっぱいに表示されるようにする
  const height = H();
  const width = W();

  class Main extends GAME {
    constructor() {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        backgroundColor: '#2033EA',
        width: width,
        height: height,
        fps: {
          target: 60,
          forceSetTimeOut: true,
        },
      };
      super(config);

      // シーンを追加
      this.scene.add('Game', Game);
      this.scene.add('Preload', Preload);

      // シーンをスタート
      this.scene.start('Preload');
    }
  }

  const game: GAME = new Main();
};
