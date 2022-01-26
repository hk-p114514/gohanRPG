import { AUTO, Game as GAME, Scale, Scene, Types } from 'phaser';
import { Test } from './scenes/Test';
import { Preload } from './scenes/Preload';
import '@/styles/index.scss';
import { H, W } from 'functions/DOM/windowInfo';

// 32x32の画像を使用する
export const tileSize: number = 40;
export const characterSize: number = 32;

// 使用するシーンをまとめる
const scenes = [Test, Preload];

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
        scene: scenes,
      };
      super(config);

      // シーンをスタート
      this.scene.start('Preload');
    }
  }

  const game: GAME = new Main();
};
