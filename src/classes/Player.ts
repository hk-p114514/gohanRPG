import { GameObjects } from 'phaser';
import { tileSize } from 'scenes/Map.tpl';
import { playerAnims } from 'playerAnims';
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
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      this.tilePos.x * tileSize + this.offsetX,
      this.tilePos.y * tileSize + this.offsetY,
    );
    this.sprite.setFrame(playerAnims[playerAnims.length - 1].frameStart);
  }

  // getPosition(): Vector2 {
  //   return this.sprite.getBottomCenter();
  // }

  // setPosition(position: Vector2): void {
  //   this.sprite.setPosition(position.x, position.y);
  // }

  // stopAnimation(direction: Direction) {
  //   const animationManager = this.sprite.anims.animationManager;
  //   const standingFrame = animationManager.get(direction).frames[1].frame.name;
  //   this.sprite.anims.stop();
  //   this.sprite.setFrame(standingFrame);
  // }

  // startAnimation(direction: Direction) {
  //   this.sprite.anims.play(direction);
  // }

  // getTilePos(): Vector2 {
  //   return this.tilePos.clone();
  // }

  // // method overloading
  // setTilePos(tilePosition: Vector2): void;
  // setTilePos(x: number, y: number): void;
  // setTilePos(...values: any[]): void {
  //   if (values.length === 1) {
  //     this.tilePos = values[0].clone();
  //   } else {
  //     this.sprite.setPosition(
  //       values[0] * tileSize + this.offsetX,
  //       values[1] * tileSize + this.offsetY,
  //     );
  //   }
  // }

  // getSprite(): GameObjects.Sprite {
  //   return this.sprite;
  // }
}
