import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import {
  restart0,
  restart1,
  restart2,
  warp4_1,
  warp4_2,
  warp4_3,
  warp4_4,
  warp4_5,
  warp4_6,
} from 'classes/timelineWords';

export class Map4 extends Map {
  constructor() {
    super(json[3], sceneKeys.map4);
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
    super.setEvent('restart', restart0);
    super.setEvent('restart1', restart1);
    super.setEvent('restart2', restart2);
    super.setEvent('woop', restart0);
    super.setEvent('woop1', restart1);
    super.setEvent('woop2', restart2);
    super.setEvent('wooptoboss', restart0);
    super.setEvent('woop1to2', restart1);
    super.setEvent('woopto1', restart2);
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map = sceneKeys.map1;

      // this.switchMap(sceneKeys.map2);
      system.switchMap(this, sceneKeys.map1);
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
