import { sceneKeys } from './sceneKeys';
import { Map_TPL } from './Map.tpl';
const { Melcine: Mel } = bosses;
import {
  addPouler,
  beforeMelcineBattle,
  dir1,
  dir2,
  dir3,
  explanation3,
  goMelcine,
  II,
  III,
  IV,
  reI,
  reII,
  reIII,
  restart0,
  restart1,
  restart2,
  warpstart,
} from '../timelineWords/timelineWords3';
import { bosses } from '../assetPath';
import { json, system } from '..';
import { shiden, pouler } from '../actor/friends';
import { warp0 } from '../timelineWords/timelineWords';

export class Map3 extends Map_TPL {
  constructor() {
    super('json/map004.json', sceneKeys.map3);
  }
  preload() {
    super.preload();
    super.setnpcimage('Shiden', 1, shiden.spriteSrc);
    super.setnpcimage('Pouler', 1, pouler.spriteSrc);
    this.loadBossimage('Mel', Mel);
  }
  create() {
    super.create();
    {
      this.setBoss(51, 24, 'Mel', system.isBossKilled.get('Melcine'), 0.25);
      super.setEvent('exit', warp0);
      super.setHint('explanation3', explanation3);
      super.setEvent('add3', addPouler, system.isExistActorInParty(pouler.name));
      super.setEvent('goMelcine', goMelcine, system.isBossKilled.get('Melcine'));
      super.setEvent(
        'beforeMelcine',
        beforeMelcineBattle,
        system.isBossKilled.get('Melcine'),
      );
      super.setEvent('restart', restart0);
      super.setEvent('restart1', restart1);
      super.setEvent('restart2', restart2);
      super.setHint('woop', II);
      super.setHint('woop1', III);
      super.setHint('woop2', IV);
      super.setHint('woopto1', reI);
      super.setHint('woop1to2', reII);
      super.setHint('wooptoboss', reIII);
      super.setHint('woopstart', warpstart);
      super.setHint('roadhint1', dir1);
      super.setHint('roadhint2', dir2);
      super.setHint('roadhint3', dir3);
    }
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
