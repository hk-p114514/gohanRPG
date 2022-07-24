import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';
import { sceneKeys } from './sceneKeys';
import { bosses } from 'assets/assetPath';
const { Ate } = bosses;
import { warp0 } from 'timelineWords/timelineWords';
import {
  warpA,
  backA,
  beforeAteBattle,
  goAte,
  stone1,
  stone2,
  stone3,
  stone4,
  hint1,
  explanation1,
} from 'timelineWords/timelineWords1';

export class Map1 extends Map_TPL {
  constructor() {
    super(json[1], sceneKeys.map1);
  }
  preload() {
    super.preload();
    this.loadBossimage('Ate', Ate);
  }

  create() {
    super.create();
    {
      this.setBoss(13, 3, 'Ate', system.isBossKilled.get('Ate'));
      super.setEvent('exit', warp0);
      super.setEvent('woop', warpA);
      super.setEvent('woopboss', backA);
      super.setEvent('goAte', goAte, system.isBossKilled.get('Ate'));
      super.setEvent('beforeAte', beforeAteBattle, system.isBossKilled.get('Ate'));
      super.setHint('stage1hint', hint1);
      super.setHint('explanation1', explanation1);
      super.setHint('stone1', stone1);
      super.setHint('stone2', stone2);
      super.setHint('stone3', stone3);
      super.setHint('stone4', stone4);
    }
  }
}
