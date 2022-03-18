import { GameObjects } from 'phaser';
import { playerAnims } from 'playerAnims';
import { tileSize } from 'scenes/Map.tpl';
import { Direction } from './Direction';

type Vector2 = Phaser.Math.Vector2;

export type AnimState = 'front' | 'back' | 'left' | 'right' | '';
export let stand = new Map();
stand.set('left', 4);
stand.set('right', 7);
stand.set('up', 10);
stand.set('down', 1);
export type SpriteAnims = {
  key: string;
  start: number;
  end: number;
};
export class Actor {
  public offsetX: number = tileSize / 2;
  public offsetY: number = tileSize;
  public dir: string = 'down';
  constructor(
    public name: string,
    public sprite: GameObjects.Sprite,
    public tilePos: Vector2,
  ) {
    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * tileSize + this.offsetX,
      tilePos.y * tileSize + this.offsetY,
    );
    this.sprite.setFrame(1);
    this.createPlayerAnimation(
      name,
      Direction.UP,
      playerAnims[0].frameStart,
      playerAnims[0].frameEnd,
    );
    this.createPlayerAnimation(
      name,
      Direction.LEFT,
      playerAnims[1].frameStart,
      playerAnims[1].frameEnd,
    );
    this.createPlayerAnimation(
      name,
      Direction.RIGHT,
      playerAnims[2].frameStart,
      playerAnims[2].frameEnd,
    );
    this.createPlayerAnimation(
      name,
      Direction.DOWN,
      playerAnims[3].frameStart,
      playerAnims[3].frameEnd,
    );
  }
  createPlayerAnimation(
    name: string,
    key: string,
    startFrame: number,
    endFrame: number = startFrame,
  ) {
    this.sprite.anims.create({
      key: key,
      frames: this.sprite.anims.generateFrameNumbers(name, {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }
  getPosition(): Vector2 {
    return this.sprite.getBottomCenter();
  }

  setPosition(position: Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  stopAnimation(direction: Direction) {
    const animationManager = this.sprite.anims.animationManager;
    //const standingFrame = animationManager.get(direction).frames[1].frame.name;
    this.sprite.anims.stop();
    this.sprite.setFrame(stand.get(direction));
    this.dir = direction;
  }

  startAnimation(direction: Direction) {
    this.sprite.anims.play(direction);
    this.dir = direction;
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
  moveTilePos(x: number, y: number): void {
    this.sprite.setPosition(x * tileSize + this.offsetX, y * tileSize + this.offsetY);
    this.tilePos = new Phaser.Math.Vector2(x, y);
  }
  getSprite(): GameObjects.Sprite {
    return this.sprite;
  }

  getdir(): string {
    return this.dir;
  }
  getredir(): string {
    switch (this.dir) {
      case 'up':
        return 'down';
      case 'down':
        return 'up';
      case 'left':
        return 'right';
      case 'right':
        return 'left';
    }
    return 'up';
  }
  changedir(dir: string): void {
    this.sprite.setFrame(stand.get(dir));
    this.dir = dir;
  }
}
