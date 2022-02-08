import { Scene, GameObjects } from 'phaser';
import { Direction } from './Direction';
import { playerAnims, tileSize } from 'scenes/Map.tpl';

type Vector2 = Phaser.Math.Vector2;

export class Player {
  constructor(
    /* parameter properties */
    private sprite: GameObjects.Sprite,
    private tilePos: Vector2,
  ) {
    const offsetX = tileSize / 2;
    const offsetY = tileSize;
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * tileSize + offsetX,
      tilePos.y * tileSize + offsetY,
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

  setTilePos(tilePosition: Vector2): void {
    this.tilePos = tilePosition.clone();
  }

  getSprite(): GameObjects.Sprite {
    return this.sprite;
  }
}
