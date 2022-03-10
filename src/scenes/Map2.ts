import { json } from 'index';
import { Map } from './Map.tpl';
import { sceneKeys } from './sceneKeys';
import { system } from 'index';

export class Map2 extends Map {
  constructor() {
    super(json[1], sceneKeys.map2);
  }
  preload() {
    super.preload();
    super.makeNPC(0,11,11,['nyaa','!']);
    super.makeNPC(0,10,10,['naaa','!']);
    super.makeNPC(0,8,8,['shaa','!']);
  }

  create() {
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map=sceneKeys.map1;
      this.scene.switch(sceneKeys.map1);
      // this.scene.switch(sceneKeys.map1);
      this.startMap(sceneKeys.map1);
    });
    super.create();
  }
}
