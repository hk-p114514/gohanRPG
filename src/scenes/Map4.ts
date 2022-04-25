import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import {
  addMough,
  //afterElecaBattle,
  backboss,
  beforeElecaBattle,
  goEleca,
  warpboss,
} from 'classes/timelineWords4';
import { warp0, zoomUp } from 'classes/timelineWords';
import { mough, pouler, shiden } from 'friends';

export class Map4 extends Map_TPL {
  constructor() {
    super(json[4], sceneKeys.map4);
  }
  preload() {
    super.preload();
    super.setnpcimage('Shiden', 1, shiden.spriteSrc);
    super.setnpcimage('Pouler', 1, pouler.spriteSrc);
    super.setnpcimage('Mough', 1, mough.spriteSrc);
    this.loadBossimage('Eleca', Eleca);
  }
  create() {
    super.create();
    this.setBoss(29, 44, 'Eleca');
    super.setEvent('exit', warp0);
    super.setEvent('add4', addMough);
    super.setHint('warpboss', warpboss);
    super.setHint('warptoboss', backboss);
    //super.setEvent('zoomUp', zoomUp);
    super.setEvent('goEleca', goEleca);
    super.setEvent('beforeEleca', beforeElecaBattle);
    //super.setEvent('afterEleca', afterElecaBattle);
    super.zoomUp();
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
