import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import { Took } from 'classes/timelineWords';
//import { system } from 'index';

export class Map1 extends Map {
  constructor() {
    super(json[0], sceneKeys.map1);
  }
  preload() {
    super.preload();
    super.setNpcImage(['hito'], 0);
  }
  create() {
    super.create();
    super.setEvent('event', Took);
    super.setHint('kanban', Took);
    super.makeNPC('hito', Took);
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map = sceneKeys.map2;

      // this.switchMap(sceneKeys.map2);
      system.switchMap(this, sceneKeys.map2);
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
