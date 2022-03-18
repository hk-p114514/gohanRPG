import { UI } from './scenes/UI';
import { Battle } from './scenes/Battle';
import { AUTO, Game, Types } from 'phaser';
import mapJson1 from '@/json/map001.json';
import mapJson2 from '@/json/map002.json';
import { H, W } from 'functions/DOM/windowInfo';
import { Map1 } from 'scenes/Map1';
import { Map2 } from 'scenes/Map2';
import { Preload } from './scenes/Preload';
import '@/styles/index.scss';
import { System } from 'classes/System';
import { sceneKeys } from 'scenes/sceneKeys';
import { BattleActor } from 'classes/BattleActor';
import { TimelinePlayer } from 'classes/TimelinePlayer';
import { skills } from 'skills';

// 使用するシーンをまとめる
const scenes = [Preload, Map1, Map2, Battle, UI, TimelinePlayer];
// const scenes = [Map1, Map2];

export const system = new System(sceneKeys.map1, [
  new BattleActor({ name: 'ゆーしゃ', initSkills: [skills[0]] }),
  new BattleActor({
    name: 'なかま1',
    initSkills: [skills[0], skills[1]],
  }),
]);

// マップデータのjsonをまとめる
export const json: string[] = [mapJson1, mapJson2];

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
