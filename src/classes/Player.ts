import { GameObjects } from 'phaser';
import { Actor } from './Actor';

type Vector2 = Phaser.Math.Vector2;

export class Player extends Actor {
  constructor(public sprite: GameObjects.Sprite, tilePos: Vector2) {
    super(sprite, tilePos);
  }
}
