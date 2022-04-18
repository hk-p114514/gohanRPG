import { UI } from './scenes/UI';
import { Battle } from './scenes/Battle';
import { AUTO, Game, Types } from 'phaser';
import mapJson1 from '@/json/map001.json';
import mapJson2 from '@/json/map002.json';
import mapJson3 from '@/json/map003.json';
import mapJson4 from '@/json/map004.json';
import mapJson5 from '@/json/map005.json';
import mapJson6 from '@/json/map006.json';
import { H, W } from 'functions/DOM/windowInfo';
import { Preload } from './scenes/Preload';
import { Prologue } from 'scenes/Prologue';
import { Title } from 'scenes/Title';
import { GameOver } from 'scenes/GameOver';
import '@/styles/index.scss';
import { System } from 'classes/System';
import { sceneKeys } from 'scenes/sceneKeys';
import { TimelinePlayer } from 'classes/TimelinePlayer';
import { Map0 } from 'scenes/Map0';
import { Map1 } from 'scenes/Map1';
import { Map2 } from 'scenes/Map2';
import { Map3 } from 'scenes/Map3';
import { Map4 } from 'scenes/Map4';
import { Map5 } from 'scenes/Map5';
import { marc, mough, pouler, shiden } from 'friends';

// 使用するシーンをまとめる
const scenes = [
  Title,
  Prologue,
  Preload,
  Map0,
  Map1,
  Map2,
  Map3,
  Map4,
  Map5,
  Battle,
  GameOver,
  UI,
  TimelinePlayer,
];
// const scenes = [Map1, Map2];

export const system = new System(sceneKeys.map0, [marc, shiden, pouler, mough]);

// マップデータのjsonをまとめる
export const json: string[] = [
  mapJson1,
  mapJson2,
  mapJson3,
  mapJson4,
  mapJson5,
  mapJson6,
];

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
