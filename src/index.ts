import { UI } from './scenes/UI';
import { Battle } from './scenes/Battle';
import { AUTO, Game, Types } from 'phaser';
import { Title } from './scenes/Title';
import { Prologue } from './scenes/Prologue';
import { Map0 } from './scenes/Map0';
import { Map1 } from './scenes/Map1';
import { Map2 } from './scenes/Map2';
import { Map3 } from './scenes/Map3';
import { Map4 } from './scenes/Map4';
import { Map5 } from './scenes/Map5';
import { GameOver } from './scenes/GameOver';
import { TimelinePlayer } from './classes/TimelinePlayer';
import { System } from './classes/System';
import { sceneKeys } from './scenes/sceneKeys';
import { marc } from './actor/friends';
import { H, W } from './functions/DOM/windowInfo';

// 使用するシーンをまとめる
/**
 * !!! 注意 !!!
 * シーンを追加する場合は、以下の'scenes'、及びsceneKeys.tsの'sceneKeys'に、
 * それぞれ、追加するシーンのクラス、Sceneのコンストラクタに渡したkeyを追加すること。
 * シーンが追加されていないと、Phaserがシーンを取得できません。
 */
const scenes = [
  // Title,
  // Prologue,
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

export const system = new System(sceneKeys.map0, [marc]);

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
