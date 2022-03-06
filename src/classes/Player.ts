import { GameObjects } from 'phaser';
import { Actor, Level, LimitValue } from './Actor';

type Vector2 = Phaser.Math.Vector2;

export class Player extends Actor {
  constructor(
    public sprite: GameObjects.Sprite,
    tilePos: Vector2,
    name: string = '',
    hp: LimitValue = { current: 1, max: 1 },
    mp: LimitValue = { current: 1, max: 1 },
    level: Level = { current: 1, toNext: 1, exp: 1, max: 1 },
    atk: number = 1,
    def: number = 1,
  ) {
    super(sprite, tilePos, name, hp, mp, level, atk, def);
  }
}
