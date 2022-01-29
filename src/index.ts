import { Test2 } from 'scenes/Test2';
import { AUTO, Game, Scale, Scene, Types } from 'phaser';
import { Test } from './scenes/Test';
import { Preload } from './scenes/Preload';
import '@/styles/index.scss';
import { H, W } from 'functions/DOM/windowInfo';

// 40x40のマップチップを使用する
export const tileSize: number = 40;
// 32x32の画像を使用する
export const characterSize: number = 32;

// 使用するシーンをまとめる
const scenes = [Preload, Test, Test2];

window.onload = () => {
  // 画面いっぱいに表示されるようにする
  const height = H();
  const width = W();

  class Main extends Game {
    constructor() {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        backgroundColor: '#2033EA',
        width: width,
        height: height,
        scene: scenes,
      };
      super(config);

      // シーンをスタート
      this.scene.start('Preload');
    }
  }

  const game: Game = new Main();
};
