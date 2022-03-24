import { json, system } from 'index';
import { Map } from './Map.tpl';
import { sceneKeys } from './sceneKeys';

export class Map2 extends Map {
  constructor() {
    super(json[1], sceneKeys.map2);
  }
  preload() {
    super.preload();
  }

  create() {
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      // this.switchMap(sceneKeys.map1);
      system.switchMap(this, sceneKeys.map1);
    });
    super.create();
  }
}
