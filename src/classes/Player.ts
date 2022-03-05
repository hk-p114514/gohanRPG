import { Scene, GameObjects } from 'phaser';
import { Direction } from './Direction';
import { tileSize } from 'scenes/Map.tpl';
import { playerAnims } from 'playerAnims';

type Vector2 = Phaser.Math.Vector2;

export class Player {
  constructor(
    /* parameter properties */
    public sprite: GameObjects.Sprite,
    private tilePos: Vector2,
    private offsetX: number = tileSize / 2,
    private offsetY: number = tileSize,
  ) {
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * tileSize + this.offsetX,
      tilePos.y * tileSize + this.offsetY,
    );
    this.sprite.setFrame(playerAnims[playerAnims.length - 1].frameStart);
  }

  getPosition(): Vector2 {
    return this.sprite.getBottomCenter();
  }

  setPosition(position: Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  stopAnimation(direction: Direction) {
    const animationManager = this.sprite.anims.animationManager;
    const standingFrame = animationManager.get(direction).frames[1].frame.name;
    this.sprite.anims.stop();
    this.sprite.setFrame(standingFrame);
  }

  startAnimation(direction: Direction) {
    this.sprite.anims.play(direction);
  }

  getTilePos(): Vector2 {
    return this.tilePos.clone();
  }

  // method overloading
  setTilePos(tilePosition: Vector2): void;
  setTilePos(x: number, y: number): void;
  setTilePos(...values: any[]): void {
    if (values.length === 1) {
      this.tilePos = values[0].clone();
    } else {
      this.sprite.setPosition(
        values[0] * tileSize + this.offsetX,
        values[1] * tileSize + this.offsetY,
      );
    }
  }

  getSprite(): GameObjects.Sprite {
    return this.sprite;
  }
}
