import { json } from 'index';
import { MapTpl } from './Map.tpl';

export class Map1 extends MapTpl {
  constructor() {
    super(json[0], 'map1');
  }

  create() {
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.scene.switch('map2');
    });
    super.create();
  }
}
