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
  public battleFlag: boolean = true;
  public bossFlag: Map<string, boolean> = new Map();
  public collidesFlag = false;
  public isBossBattle: boolean = false;
  public boss?: BattleActor;
  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
    this.bossFlag.set('Ate', false);
    this.bossFlag.set('Bte', false);
    this.bossFlag.set('Melcine', false);
    this.bossFlag.set('Eleca', false);
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
