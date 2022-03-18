import { GameObjects } from 'phaser';
import { Actor } from './Actor';
import { Direction } from 'classes/Direction';
import { playerAnims } from 'playerAnims';

type Vector2 = Phaser.Math.Vector2;

export class Player extends Actor {
  constructor(public sprite: GameObjects.Sprite, tilePos: Vector2) {
    super('player', sprite, tilePos);
    // プレイヤーのアニメーション
  }
}
