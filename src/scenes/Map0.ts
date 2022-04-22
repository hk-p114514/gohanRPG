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
  afterGotsuji,
  stoper,
  beJK1,
  beJK2,
  beBijinesuman,
  beEruhu,
  beKisi,
  beTyuubou,
  beSyoujo,
  beMajo,
  beRoujin,
} from 'classes/timelineWords0';
import { beStrong } from 'skillsFunction/partySkillsFunction';
//import { system } from 'index';

export class Map0 extends Map_TPL {
  constructor() {
    super(json[0], sceneKeys.map0);
  }
  preload() {
    super.preload();
    super.setnpcimage('notMob', 0);
    super.setnpcimage('notMob2', 0);
    super.setnpcimage('notMob3', 0);
    super.setnpcimage('notMob4', 0);
    super.setnpcimage('name1', 0);
    super.setnpcimage('name2', 0);
    super.setnpcimage('name3', 0);
    super.setnpcimage('name4', 0);
    super.setnpcimage('name5', 0);
    super.setnpcimage('name6', 0);
    super.setnpcimage('name7', 0);
    super.setnpcimage('name8', 0);
    super.setnpcimage('name9', 0);
  }
  create() {
    super.create();
    super.makeNPC('name1', beJK1);
    super.makeNPC('name2', beJK2);
    super.makeNPC('name3', beBijinesuman);
    super.makeNPC('name4', beEruhu);
    super.makeNPC('name5', beKisi);
    super.makeNPC('name6', beTyuubou);
    super.makeNPC('name7', beSyoujo);
    super.makeNPC('name8', beMajo);
    super.makeNPC('name9', beRoujin);
    super.makeNPC('notMob', afterGotsuji);
    super.makeNPC('stoper1', stoper);
    super.makeNPC('stoper2', stoper);
    super.makeNPC('stoper3', stoper);
    super.makeNPC('stoper4', stoper);
    super.makeNPC('stoper5', stoper);
    super.makeNPC('stoper6', stoper);
    super.makeNPC('stoper7', stoper);
    super.makeNPC('stoper8', stoper);
    super.setEvent('goStage1', warp1);
    super.setEvent('goStage2', warp2);
    super.setEvent('goStage3', warp3);
    super.setEvent('goStage4', warp4);
    super.setHint('goStage5', warp5);
    super.setHint('first', explanation0);
    super.setEvent('startMob', explanation);
    super.setEvent('stopl', stopl);
    super.setEvent('stopr', stopr);

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
