import { sceneKeys } from './sceneKeys';
import { json, system } from 'index';
import { Map_TPL } from './Map.tpl';
import Ate from '@/assets/characters/static/boss/ate.png';
import Bte from '@/assets/characters/static/boss/bte.png';
import Mel from '@/assets/characters/static/boss/melcine.png';
import Eleca from '@/assets/characters/static/boss/eleca.png';
import Obc from '@/assets/characters/static/boss/obc.png';
import { warp0 } from 'classes/timelineWords';
import { funcs } from 'classes/exam';
import { pouler, shiden } from 'friends';

export class Map5 extends Map_TPL {
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
