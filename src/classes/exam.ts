import { GameObjects, Scene } from 'phaser';
import { Actor } from './Actor';
import { charas } from './Characters';
import { playerAnims } from 'playerAnims';
import { system } from 'index';
type Vector2 = Phaser.Math.Vector2;
export class NPC extends Actor {
  public object: string = 'npc';
  constructor(
    public nn: number,
    public sprite: GameObjects.Sprite,
    public tilePos: Vector2,
    public took: Array<string>,
    public event?: Function,
  ) {
    super(sprite, tilePos);
    this.createPlayerAnimation('NUP', playerAnims[0].frameStart);
    this.createPlayerAnimation('NLEFT', playerAnims[1].frameStart);
    this.createPlayerAnimation('NRIGHT', playerAnims[2].frameStart);
    this.createPlayerAnimation('NDOWN', playerAnims[3].frameStart);
  }
  setText(took: Array<string>): void {
    this.took = took.concat();
  }
  setevent(eve: Function): void {
    this.event = eve;
  }
  createPlayerAnimation(name: string, startFrame: number) {
    this.sprite.anims.create({
      key: name,
      frames: this.sprite.anims.generateFrameNumbers(system.map + ',' + 'npc' + this.nn, {
        start: startFrame,
        end: startFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }
}

export let map = new Map();
map.set('left', new Phaser.Math.Vector2(-1, 0));
map.set('right', new Phaser.Math.Vector2(1, 0));
map.set('up', new Phaser.Math.Vector2(0, -1));
map.set('down', new Phaser.Math.Vector2(0, 1));

export class mono extends Actor {
  public object: string = 'box';
  constructor(
    public nn: number,
    public sprite: GameObjects.Sprite,
    public tilePos: Vector2,
    public took: Array<string>,
    public event?: Function,
  ) {
    super(sprite, tilePos);
  }
  setText(took: Array<string>): void {
    this.took = took.concat();
  }
  setevent(eve: Function): void {
    this.event = eve;
  }
  createPlayerAnimation(name: string, startFrame: number) {
    this.sprite.anims.create({
      key: name,
      frames: this.sprite.anims.generateFrameNumbers(system.map + ',' + 'npc' + this.nn, {
        start: startFrame,
        end: startFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }
}
export let events = new Map();