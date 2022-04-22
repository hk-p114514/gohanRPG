import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';
import Ate from '@/assets/characters/static/boss/ate.png';
import Bte from '@/assets/characters/static/boss/bte.png';
import Melcine from '@/assets/characters/static/boss/melcine.png';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import Obc from '@/assets/characters/static/boss/obc.png';
import { warp0 } from 'classes/timelineWords';
import { mough, pouler, shiden } from 'friends';
import {
  afterObcBattle,
  backAte,
  backBte,
  backEleca,
  backMelcine,
  backObc,
  beforeObcBattle,
  endAte,
  endBte,
  endEleca,
  endMelcine,
  explanation5,
  goObc,
  goReAte,
  goReBte,
  goReEleca,
  goReMelcine,
  startAte,
  warpAte,
  warpBte,
  warpEleca,
  warpMelcine,
  warpObc,
} from 'classes/timelineWords5';

export class Map5 extends Map_TPL {
  constructor() {
    super(json[5], sceneKeys.map5);
  }
  preload() {
    super.preload();
    super.setnpcimage('Shiden', 1, shiden.spriteSrc);
    super.setnpcimage('Pouler', 1, pouler.spriteSrc);
    super.setnpcimage('Mough', 1, mough.spriteSrc);
    this.loadBossimage('Ate', Ate);
    this.loadBossimage('Bte', Bte);
    this.loadBossimage('Melcine', Melcine);
    this.loadBossimage('Eleca', Eleca);
    this.loadBossimage('Obc', Obc);
  }
  create() {
    super.create();
    this.setBoss(8, 35, 'Ate', 0.5, true);
    super.setHint('explanation5', explanation5);
    super.setEvent('exit', warp0);
    super.setEvent('toboss1', warpAte);
    super.setEvent('toboss2', warpBte);
    super.setEvent('toboss3', warpMelcine);
    super.setEvent('toboss4', warpEleca);
    super.setEvent('tolastboss', warpObc);
    super.setEvent('spawnPoint1', backAte);
    super.setEvent('spawnPoint2', backBte);
    super.setEvent('spawnPoint3', backMelcine);
    super.setEvent('spawnPoint4', backEleca);
    super.setEvent('spawnPoint5', backObc);
    super.setEvent('goAte', goReAte);
    super.setEvent('startAte', endAte);
    super.setEvent('goBte', goReBte);
    super.setEvent('startBte', endBte);
    super.setEvent('goMelcine', goReMelcine);
    super.setEvent('startMelcine', endMelcine);
    super.setEvent('goEleca', goReEleca);
    super.setEvent('startEleca', endEleca);
    super.setEvent('goObc', goObc);
    super.setEvent('startObc', afterObcBattle);

    // イベントの位置を取得
    // const events = this.tileMap?.filterTiles((tile) => {});
  }
  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
  public createBoss(x: number, y: number, boss: string) {
    if (boss === 'Bte') this.setBoss(x, y, boss, 0.5, true);
    if (boss === 'Melcine') this.setBoss(x, y, boss, 0.25, true);
    if (boss === 'Eleca') this.setBoss(x, y, boss, 0.5, true);
    if (boss === 'Obc') this.setBoss(x, y, boss, 0.5, true);
  }
}
