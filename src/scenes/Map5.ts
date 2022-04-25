import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';
import Ate from '@/assets/characters/static/boss/ate.png';
import Bte from '@/assets/characters/static/boss/bte.png';
import Melcine from '@/assets/characters/static/boss/melcine.png';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import Obc from '@/assets/characters/static/boss/obc.png';
import { warp0 } from 'timelineWords/timelineWords';
import { mough, pouler, shiden } from 'friends';
import {
  explanation5,
  warpAte,
  warpBte,
  warpEleca,
  warpMelcine,
  warpObc,
  backAte,
  backBte,
  backEleca,
  backMelcine,
  backObc,
  goReAte,
  goReBte,
  goReEleca,
  goReMelcine,
  goObc,
  startAte,
  startBte,
  startEleca,
  startMelcine,
  beforeObcBattle,
  // endAte,
  // endBte,
  // endEleca,
  // endMelcine,
  // afterObcBattle,
} from 'timelineWords/timelineWords5';

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
    this.createBoss(8, 35, 'Ate');
    //this.createBoss(48, 36, 'Obc');
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
    super.setEvent('startAte', startAte);
    super.setEvent('goBte', goReBte);
    super.setEvent('startBte', startBte);
    super.setEvent('goMelcine', goReMelcine);
    super.setEvent('startMelcine', startMelcine);
    super.setEvent('goEleca', goReEleca);
    super.setEvent('startEleca', startEleca);
    super.setEvent('goObc', goObc);
    super.setEvent('startObc', beforeObcBattle);
  }
  public update(_time: number, delta: number): void {
    super.update(_time, delta);
  }
  public createBoss(x: number, y: number, boss: string) {
    if (boss == 'Ate') this.setBoss(x, y, boss, 0.5, true);
    if (boss === 'Bte') this.setBoss(x, y, boss, 0.5, true);
    if (boss === 'Melcine') this.setBoss(x, y, boss, 0.25, true);
    if (boss === 'Eleca') this.setBoss(x, y, boss, 0.5, true);
    if (boss === 'Obc') this.setBoss(x, y, boss, 0.25, true);
  }
}
