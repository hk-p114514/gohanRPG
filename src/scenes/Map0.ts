import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import {
  select,
  warp1,
  warp2,
  warp3,
  dummy,
  noComment,
  warp4,
  warp5,
  explanation0,
  explanation,
  stoplu,
  stopru,
  stopld,
  stoprd,
} from 'classes/timelineWords';
//import { system } from 'index';

export class Map0 extends Map {
  constructor() {
    super(json[0], sceneKeys.map0);
  }
  preload() {
    super.preload();
    super.setnpcimage('notMob', 0);
    super.setnpcimage('vimmer', 0);
    super.setnpcimage('mob3', 0);
    super.setnpcimage('mob4', 0);
    super.setnpcimage('mob5', 0);
    super.setnpcimage('mob6', 0);
    super.setnpcimage('mob7', 0);
    super.setnpcimage('mob8', 0);
  }
  create() {
    super.create();
    super.setEvent('goStage1', warp1);
    super.setEvent('goStage2', warp2);
    super.setEvent('goStage3', warp3);
    super.setEvent('goStage4', warp4);
    super.setEvent('goStage5', warp5);
    super.setHint('first', explanation0);
    super.makeNPC('notMob', noComment);
    super.makeNPC('vimmer', noComment);
    super.setEvent('startMob', explanation);
    super.setEvent('stoplu', stoplu);
    super.setEvent('stopru', stopru);
    super.setEvent('stopld', stopld);
    super.setEvent('stoprd', stoprd);
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map = sceneKeys.map3;

      // this.switchMap(sceneKeys.map1);
      system.switchMap(this, sceneKeys.map3);
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
