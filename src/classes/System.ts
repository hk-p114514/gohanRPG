import { SceneKeys } from './../scenes/sceneKeys';
import { Scene } from 'phaser';
import { BattleActor } from './BattleActor';
import { SkillFunction } from 'skills';
//import { Map } from 'scenes/Map.tpl';

type Battling = {
  actor: BattleActor;
  selectedSkill?: SkillFunction;
};

export class System {
  static readonly TILE_SIZE: number = 40;
  public map: string;
  public party: BattleActor[] = [];
  public isBattle: boolean = false;
  public battling?: Battling;
  public battleflag: boolean = true;
  public bossflag: Map<string, boolean> = new Map();
  public collidesFlag = false;
  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
    this.bossflag.set('Ate', false);
    this.bossflag.set('Bte', false);
    this.bossflag.set('Melcine', false);
    this.bossflag.set('Eleca', false);
  }

  public preload() {}

  public startMap(from: Scene, to: string): number {
    if (from.scene.key === to) {
      return 1;
    }
    this.map = to;
    from.scene.start(to);

    return 0;
  }

  public switchMap(from: Scene, to: string): number {
    if (from.scene.key === to) {
      return 1;
    }
    this.map = to;
    from.scene.switch(to);

    return 0;
  }

  setActor(actor: BattleActor) {
    this.battling = {
      actor,
    };
  }

  setSkill(skill: SkillFunction) {
    if (this.battling) {
      this.battling.selectedSkill = skill;
    }
  }
}
