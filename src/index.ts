import { AUTO, Game, Types } from 'phaser';
import mapJson1 from '@/json/map001.json';
import mapJson2 from '@/json/map002.json';
import { H, W } from 'functions/DOM/windowInfo';
import { Map1 } from 'scenes/Map1';
import { Map2 } from 'scenes/Map2';
import { Preload } from './scenes/Preload';
import '@/styles/index.scss';

// 使用するシーンをまとめる
const scenes = [Preload, Map1, Map2];

// マップデータのjsonをまとめる
export const json: string[] = [mapJson1, mapJson2];

window.onload = () => {
  // 画面いっぱいに表示されるようにする
  const height = H();
  const width = W();

  class Main extends Game {
    constructor() {
      const config: Types.Core.GameConfig = {
        type: AUTO,
        backgroundColor: '#123456',
        width: width,
        height: height,
        scene: scenes,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
          },
        },
      };
      super(config);
    }
  }

  const game: Game = new Main();
};
