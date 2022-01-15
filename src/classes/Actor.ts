import { characterSize } from './../scenes/Game';
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
  private p: Point;
  private hp: LimitValue;
  private mp: LimitValue;
  private level: Level = { current: 1, exp: 0, max: 100 };
  private atk: number;
  private def: number;
  private diameter;
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
    hp: LimitValue,
    mp: LimitValue,
    level: Level,
    atk: number,
    def: number,
    diameter: number,
  ) {
    const { x, y } = spData;
    this.name = name;
    this.p = { x, y };
    this.hp = hp;
    this.mp = mp;
    this.level = level;
    this.atk = atk;
    this.def = def;
    this.diameter = diameter;
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
    this.sprite = scene.add.sprite(p.x, p.y, this.name, 0);
    this.sprite.setOrigin(0);
    this.sprite.setDisplaySize(this.diameter, this.diameter);
  };

  public setAnim = (scene: Scene) => {
    for (const anim of this.anims) {
      if (scene.anims.create(this.spriteAnimConfig(anim, scene)) === false) {
        continue;
      }
    }
    this.sprite?.anims.play(this.animState);
  };

  public spriteAnimConfig = (
    config: SpriteAnims,
    scene: Scene,
  ): Types.Animations.Animation => {
    return {
      key: config.key,
      frames: scene.anims.generateFrameNames(this.name, {
        start: config.start,
        end: config.end,
      }),
      frameRate: 8,
      repeat: -1,
    };
  };

  public update = (): void => {};
}
