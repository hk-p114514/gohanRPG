import { json } from 'index';
import { MapTpl } from './Map.tpl';

export class Map1 extends MapTpl {
  constructor() {
    super(json[0], 'map1');
  }

  create() {
    super.create();
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.scene.switch('map2');
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
