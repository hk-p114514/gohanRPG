import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import Mel from '@/assets/characters/static/boss/melcine.png';
import {
  restart0,
  restart1,
  restart2,
  II,
  III,
  IV,
  reI,
  reII,
  reIII,
  warpstart,
  explanation3,
  addPouler,
  goMelcine,
  beforeMelcineBattle,
  afterMelcineBattle,
  warp0,
} from 'classes/timelineWords';
import { funcs } from 'classes/exam';

export class Map4 extends Map {
  constructor() {
    super(json[4], sceneKeys.map4);
  }
  preload() {
    super.preload();
    super.setnpcimage('Shiden', 1);
    super.setnpcimage('Pouler', 1);
    this.loadBossimage('Mel', Mel);
  }
  create() {
    super.create();
    this.setBoss(51, 24, 'Mel', 0.25);
    super.setEvent('exit', warp0);
    super.setHint('explanation2', explanation3);
    super.setEvent('add3', addPouler);
    super.setEvent('goMelcine', goMelcine);
    super.setEvent('beforeMelcine', beforeMelcineBattle);
    super.setEvent('afterMelcine', afterMelcineBattle);
    super.setEvent('restart', restart0);
    super.setEvent('restart1', restart1);
    super.setEvent('restart2', restart2);
    super.setHint('woop', II);
    super.setHint('woop1', III);
    super.setHint('woop2', IV);
    super.setHint('woopto1', reI);
    super.setHint('woop1to2', reII);
    super.setHint('wooptoboss', reIII);
    super.setHint('woopstart', warpstart);
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    funcs.set(this.name + ',zoomUp', (s: any[]) => {
      this.zoomUp();
    });
    funcs.set(this.name + ',zoomOut', (s: any[]) => {
      this.zoomDown();
    });
    enter.on('down', () => {
      system.map = sceneKeys.map1;

      system.switchMap(this, sceneKeys.map1);
    });
    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }

  zoomUp() {
    this.cameras.main.zoomTo(2, 1000);
  }

  zoomDown() {
    this.cameras.main.zoomTo(1, 1000);
  }
}
