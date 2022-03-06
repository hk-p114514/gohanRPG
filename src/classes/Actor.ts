import { GameObjects } from 'phaser';
import { playerAnims } from 'playerAnims';
import { tileSize } from 'scenes/Map.tpl';
import { Direction } from './Direction';
export type LimitValue = {
  current: number;
  max: number;
};

type Vector2 = Phaser.Math.Vector2;

export type Level = {
  // 現在のレベル
  current: number;
  // 現在保持している経験値(レベルアップ時に0に戻す)
  exp: number;
  // 次のレベルになるまでに必要な経験値の量
  toNext: number;
  // レベルの最大値
  max: number;
};

export type Point = {
  x: number;
  y: number;
};

export type originActor = {
  name: string;
  hp: LimitValue;
  mp: LimitValue;
  level: Level;
  atk: number;
  def: number;
};

export type AnimState = 'front' | 'back' | 'left' | 'right' | '';

export type SpriteAnims = {
  key: string;
  start: number;
  end: number;
};

export class Actor {
  public offsetX: number = tileSize / 2;
  public offsetY: number = tileSize;
  public name: string;
  private hp: LimitValue;
  private mp: LimitValue;
  private level: Level = { current: 1, exp: 0, toNext: 1, max: 100 };
  private atk: number;
  private def: number;
  private animState: AnimState = 'front';
  private anims: SpriteAnims[] = [
    // 画像データは"ぴぽや"のキャラクターシートを使っているため、順番は固定
    { key: 'front', start: 0, end: 2 },
    { key: 'back', start: 3, end: 5 },
    { key: 'left', start: 6, end: 8 },
    { key: 'right', start: 9, end: 11 },
  ];
  constructor(
    public sprite: GameObjects.Sprite,
    public tilePos: Vector2,
    name: string = '',
    hp: LimitValue = { current: 1, max: 1 },
    mp: LimitValue = { current: 1, max: 1 },
    level: Level = { current: 1, toNext: 1, exp: 1, max: 1 },
    atk: number = 1,
    def: number = 1,
  ) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.level = level;
    this.atk = atk;
    this.def = def;

    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * tileSize + this.offsetX,
      tilePos.y * tileSize + this.offsetY,
    );
    this.sprite.setFrame(playerAnims[playerAnims.length - 1].frameStart);
  }

  public beInjured(damage: number) {
    this.hp.current - Math.floor(damage - damage / this.def);
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
