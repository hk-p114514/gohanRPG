import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import { system } from 'index';

export class Map1 extends Map {
  constructor() {
    super(json[0], sceneKeys.map1);
  }
  preload() {
    super.preload();
    // super.makeNPC(1, 11, 11, ['nyaaa', '!!'], () => {
    //   console.log('yeeeeeeeee');
    // });
    // super.makeNPC(1, 10, 10, ['naaaa', '!!']);
    // super.makeNPC(1, 8, 8, ['shaaa', '!!']);
  }
  create() {
    super.create();
    super.setevent('event', ['nya?', 'nyanya!', 'nya~'], () => {
      console.error('出来た');
    });
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map = sceneKeys.map2;
      this.scene.switch(sceneKeys.map2);
      // this.startMap(sceneKeys.map2);
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
