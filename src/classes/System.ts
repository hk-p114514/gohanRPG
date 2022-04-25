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
  public DEBUG_isIgnoreBattle: boolean = true;
  public isBossKilled: Map<string, boolean> = new Map();
  public collidesFlag: boolean = true;
  public eventFlag: boolean = true;
  public isBossBattle: boolean = false;
  public boss?: BattleActor;
  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
    this.isBossKilled.set('Ate', false);
    this.isBossKilled.set('Bte', false);
    this.isBossKilled.set('Melcine', false);
    this.isBossKilled.set('Eleca', false);
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
