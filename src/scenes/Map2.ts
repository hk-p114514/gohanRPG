import { json } from 'index';
import { MapTpl } from './Map.tpl';

export class Map2 extends MapTpl {
  constructor() {
    super(json[1], 'map2');
  }

  create() {
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.scene.switch('map1');
    });
    super.create();
  }
}
