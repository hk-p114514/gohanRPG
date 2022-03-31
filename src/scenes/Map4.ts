import { sceneKeys } from './sceneKeys';
import { json } from 'index';
import { Map } from './Map.tpl';
import Mel from '@/assets/characters/static/boss/melcine.png';
import {
  afterElecaBattle,
  beforeElecaBattle,
  goEleca,
  zoomUp,
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
    super.setnpcimage('Mough', 1);
    this.loadBossimage('Mel', Mel);
  }
  create() {
    super.create();
    funcs.set(this.name + ',zoomUp', (s: any[]) => {
      this.zoomUp();
    });
    funcs.set(this.name + ',zoomDown', (s: any[]) => {
      this.zoomDown();
    });

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
