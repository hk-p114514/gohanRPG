import { AUTO, Game as GAME, Scale, Types } from 'phaser';
import { Test } from './scenes/Test';
import { Preload } from './scenes/Preload';
import { H, W } from 'functions/DOM/windowInfo';
import '@/styles/index.scss';

// 32x32の画像を使用する
export const tileSize: number = 40;
export const characterSize: number = 32;

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
      };
      super(config);

      // シーンを追加
      this.scene.add('Test', Test);
      this.scene.add('Preload', Preload);

      // シーンをスタート
      this.scene.start('Preload');
    }
  }

  const game: GAME = new Main();
};
