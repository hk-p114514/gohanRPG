import { characterSize } from './../scenes/Game';
import { GameObjects, Scene, Tilemaps } from 'phaser';
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

export class Actor {
  public name: string;
  private p: Point;
  private hp: LimitValue;
  private mp: LimitValue;
  private level: Level = { current: 1, exp: 0, max: 100 };
  private atk: number;
  private def: number;
  private sprite?: GameObjects.Sprite;
  constructor(
    spData: GameObjects.Sprite,
    name: string,
    hp: LimitValue,
    mp: LimitValue,
    level: Level,
    atk: number,
    def: number
  ) {
    const { x, y } = spData;
    this.name = name;
    this.p = { x, y };
    this.hp = hp;
    this.mp = mp;
    this.level = level;
    this.atk = atk;
    this.def = def;
  }

  public getActor(): originActor {
    const { name, hp, mp, level, atk, def } = this;
    return { name, hp, mp, level, atk, def };
  }

  public preload = (scene: Scene, name: string, src: string): void => {
    scene.load.spritesheet(name, src, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
  };

  public create = (scene: Scene, mapGroundLayer: Tilemaps.TilemapLayer): void => {
    const { x, y } = this.p;
    const p: Phaser.Math.Vector2 = mapGroundLayer.tileToWorldXY(x, y);
  };
}
