import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map } from './Map.tpl';
import Ate from '@/assets/characters/static/boss/ate.png';
import Bte from '@/assets/characters/static/boss/bte.png';
import Mel from '@/assets/characters/static/boss/melcine.png';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import Obc from '@/assets/characters/static/boss/obc.png';
import {
  restart0,
  restart1,
  restart2,
  II,
  III,
  IV,
  reI,
  reII,
  reIII,
  warpstart,
  explanation3,
  addPouler,
  goMelcine,
  beforeMelcineBattle,
  afterMelcineBattle,
  warp0,
} from 'classes/timelineWords';
import { funcs } from 'classes/exam';
import { pouler, shiden } from 'friends';

export class Map5 extends Map {
  constructor() {
    super(json[5], sceneKeys.map5);
  }
  preload() {
    super.preload();
    // super.setnpcimage('Shiden', 1);
    // super.setnpcimage('Pouler', 1);
    super.setnpcimage('Shiden', 1, shiden.spriteSrc);
    super.setnpcimage('Pouler', 1, pouler.spriteSrc);
    this.loadBossimage('Mel', Mel);
    this.loadBossimage('Eleca', Eleca);
    this.loadBossimage('Obc', Obc);
  }
  create() {
    super.create();
    this.setBoss(51, 24, 'Ate');
    super.setEvent('exit', warp0);
    super.setHint('explanation2', explanation3);
    super.setEvent('add3', addPouler);
    super.setEvent('goMelcine', goMelcine);
    super.setEvent('beforeMelcine', beforeMelcineBattle);
    super.setEvent('afterMelcine', afterMelcineBattle);
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
    funcs.set(this.name + ',create', (s: any[]) => {
      if (s[0] == 'Bte') this.setBoss(0, 0, 'Bte');
      if (s[0] == 'Mel') this.setBoss(0, 0, 'Mel');
      if (s[0] == 'Eleca') this.setBoss(0, 0, 'Eleca');
      if (s[0] == 'Obc') this.setBoss(0, 0, 'Obc');
    });
    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }

  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
}
