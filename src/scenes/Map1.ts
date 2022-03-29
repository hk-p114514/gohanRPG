import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import { select, warp1, warp2, warp3, dummy, noComment } from 'classes/timelineWords';
//import { system } from 'index';

export class Map1 extends Map {
  private npcNames = ['vimmer'];
  constructor() {
    super(json[0], sceneKeys.map1);
  }
  preload() {
    super.preload();
    this.npcNames.forEach((name) => {
      super.setnpcimage([name], 0);
    });
    super.setnpcimage(['mob1'], 0);
    super.setnpcimage(['mob2'], 0);
    super.setnpcimage(['mob3'], 0);
    super.setnpcimage(['mob4'], 0);
    super.setnpcimage(['mob5'], 0);
    super.setnpcimage(['mob6'], 0);
    super.setnpcimage(['mob7'], 0);
    super.setnpcimage(['mob8'], 0);
  }
  create() {
    super.create();
    super.setEvent('goStage1', warp1);
    super.setEvent('goStage2', warp2);
    super.setEvent('goStage3', warp3);
    super.setEvent('goStage4', dummy);
    super.setEvent('goStage5', dummy);
    super.setHint('first', select);
    super.makeNPC(this.npcNames[0], {
      start: [
        { type: 'dialog', text: 'やあ!そこの君!', actorName: 'vimmer' },
        { type: 'dialog', text: 'vimって知っているかい?', actorName: 'vimmer' },
        { type: 'dialog', text: 'vimは素晴らしいエディタだよ!', actorName: 'vimmer' },
        {
          type: 'dialog',
          text: '君もvscodeなんて捨ててはやくvimに乗り換えよう!',
          actorName: 'vimmer',
        },
        {
          type: 'dialog',
          text: '今からならNeovimとcoc.nvimのセットがおすすめだよ!',
          actorName: 'vimmer',
        },
        { type: 'endTimeline' },
      ],
    });
    super.makeNPC('mob1', noComment);
    super.makeNPC('mob2', noComment);
    super.makeNPC('mob3', noComment);
    super.makeNPC('mob4', noComment);
    super.makeNPC('mob5', noComment);
    super.makeNPC('mob6', noComment);
    super.makeNPC('mob7', noComment);
    super.makeNPC('mob8', noComment);
    // enterキーでシーンを切り替える
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      system.map = sceneKeys.map4;

      // this.switchMap(sceneKeys.map2);
      system.switchMap(this, sceneKeys.map4);
    });

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
