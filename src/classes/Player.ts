import { GameObjects } from 'phaser';
import { Actor } from './Actor';
import { Direction } from 'classes/Direction';
import { playerAnims } from 'playerAnims';

type Vector2 = Phaser.Math.Vector2;

export class Char extends Actor {
  constructor(
    public sprite: GameObjects.Sprite,
    tilePos: Vector2,
    name: string = 'player',
  ) {
    super(name, sprite, tilePos);
    // プレイヤーのアニメーション
  }
}
