import { GameObjects, Scene, Tilemaps, Types } from 'phaser';
export type LimitValue = {
  current: number;
  max: number;
};

export type Level = {
  current: number;
  exp: number;
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
  public name: string;
  // private p: Point;
  // private hp: LimitValue;
  // private mp: LimitValue;
  // private level: Level = { current: 1, exp: 0, max: 100 };
  // private atk: number;
  // private def: number;
  // private diameter;
  private sprite?: GameObjects.Sprite;
  private animState: AnimState = 'front';
  private anims: SpriteAnims[] = [
    // 画像データは"ぴぽや"のキャラクターシートを使っているため、順番は固定
    { key: 'front', start: 0, end: 2 },
    { key: 'back', start: 3, end: 5 },
    { key: 'left', start: 6, end: 8 },
    { key: 'right', start: 9, end: 11 },
  ];
  constructor(
    spData: GameObjects.Sprite,
    name: string,
    // hp: LimitValue,
    // mp: LimitValue,
    // level: Level,
    // atk: number,
    // def: number,
    // diameter: number,
  ) {
    this.name = name;
    // const { x, y } = spData;
    // this.p = { x, y };
    // this.hp = hp;
    // this.mp = mp;
    // this.level = level;
    // this.atk = atk;
    // this.def = def;
    // this.diameter = diameter;
  }
}
