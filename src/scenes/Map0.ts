import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';

import {
  warp1,
  warp2,
  warp3,
  warp4,
  warp5,
  explanation0,
  explanation,
  stopl,
  stopr,
  afterDakahu,
  stopper,
  beJK,
  beBijinesuman,
  beEruhu,
  beKisi,
  beTyuubou,
  beSyoujo,
  beMajo,
  beRoujin,
  tutorial1,
} from 'timelineWords/timelineWords0';

export class Map0 extends Map_TPL {
  constructor() {
    super(json[0], sceneKeys.map0);
  }
  preload() {
    super.preload();
    this.setnpcimage('notMob', 0);
    this.setnpcimage('notMob2', 0);
    this.setnpcimage('notMob3', 0);
    this.setnpcimage('notMob4', 0);
    this.setnpcimage('Bijinesuman', 1);
    this.setnpcimage('JK1', 2);
    this.setnpcimage('JK2', 3);
    this.setnpcimage('Tyuubou', 4);
    this.setnpcimage('Eruhu', 5);
    this.setnpcimage('Kisi', 6);
    this.setnpcimage('Majo', 7);
    this.setnpcimage('Syoujo', 8);
    this.setnpcimage('Roujin', 9);
  }
  create() {
    super.create();
    super.makeNPC('JK1', beJK, 'right');
    super.makeNPC('JK2', beJK, 'left');
    super.makeNPC('Bijinesuman', beBijinesuman);
    super.makeNPC('Eruhu', beEruhu);
    super.makeNPC('Kisi', beKisi);
    super.makeNPC('Tyuubou', beTyuubou, 'up');
    super.makeNPC('Syoujo', beSyoujo, 'up');
    super.makeNPC('Majo', beMajo);
    super.makeNPC('Roujin', beRoujin, 'left');
    super.makeNPC('notMob', afterDakahu);
    super.makeNPC('stoper1', stopper);
    super.makeNPC('stoper2', stopper);
    super.makeNPC('stoper3', stopper);
    super.makeNPC('stoper4', stopper);
    super.makeNPC('stoper5', stopper);
    super.makeNPC('stoper6', stopper);
    super.makeNPC('stoper7', stopper);
    super.makeNPC('stoper8', stopper);
    super.setEvent('goStage1', warp1);
    super.setEvent('goStage2', warp2);
    super.setEvent('goStage3', warp3);
    super.setEvent('goStage4', warp4);
    super.setHint('goStage5', warp5);
    super.setHint('first', explanation0);
    super.setEvent('startMob', explanation);
    super.setEvent('stopl', stopl);
    super.setEvent('stopr', stopr);
    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelineData: tutorial1,
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
