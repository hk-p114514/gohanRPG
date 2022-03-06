import { sceneKeys } from './scenes/sceneKeys';
import { AUTO, Game, Types } from 'phaser';
import playerSprite from '@/assets/characters/dynamic/player.png';
import mapJson1 from '@/json/map001.json';
import mapJson2 from '@/json/map002.json';
import { H, W } from 'functions/DOM/windowInfo';
import { Map1 } from 'scenes/Map1';
import { Map2 } from 'scenes/Map2';
import { Preload } from './scenes/Preload';
import '@/styles/index.scss';
import { System } from 'classes/System';

// 使用するシーンをまとめる
const scenes = [Preload, Map1, Map2];
// const scenes = [Map1, Map2];

// マップデータのjsonをまとめる
export const json: string[] = [mapJson1, mapJson2];

export const system = new System(playerSprite, sceneKeys.map1);

console.log(system);

class Main extends Game {
  constructor() {
    const config: Types.Core.GameConfig = {
      type: AUTO,
      backgroundColor: '#123456',
      width: W(),
      height: H(),
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
export const game: Game = new Main();
