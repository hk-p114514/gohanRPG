import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import { Took, warp1, warp2, warp3 } from 'classes/timelineWords';
//import { system } from 'index';

export class Map3 extends Map {
  constructor() {
    super(json[2], sceneKeys.map3);
  }
  preload() {
    super.preload();
  }
  create() {
    super.create();
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
