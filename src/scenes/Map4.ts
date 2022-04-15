import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import {
  afterElecaBattle,
  backboss,
  beforeElecaBattle,
  goEleca,
  warpboss,
  zoomUp,
} from 'classes/timelineWords';
import { funcs } from 'classes/exam';
import { mough, pouler, shiden } from 'friends';

export class Map4 extends Map {
  constructor() {
    super(json[4], sceneKeys.map4);
  }
  preload() {
    super.preload();
    // super.setnpcimage('Shiden', 1);
    // super.setnpcimage('Pouler', 1);
    // super.setnpcimage('Mough', 1);
    super.setnpcimage('Shiden', 1, shiden.spriteSrc);
    super.setnpcimage('Pouler', 1, pouler.spriteSrc);
    super.setnpcimage('Mough', 1, mough.spriteSrc);
    this.loadBossimage('Eleca', Eleca);
  }
  create() {
    super.create();
    funcs.set(this.name + ',zoomUp', (s: any[]) => {
      this.zoomUp();
    });
    funcs.set(this.name + ',zoomDown', (s: any[]) => {
      this.zoomDown();
    });
    this.setBoss(29, 39, 'Eleca', 0.25);
    super.setHint('warpboss', warpboss);
    super.setHint('warptoboss', backboss);
    super.setEvent('zoomUp', zoomUp);
    super.setEvent('goEleca', goEleca);
    super.setEvent('beforeEleca', beforeElecaBattle);
    super.setEvent('afterEleca', afterElecaBattle);
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
