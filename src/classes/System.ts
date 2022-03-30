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
  public bossflag: Map<string, boolean> = new Map();
  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
    this.bossflag.set('beforeAte', true);
    this.bossflag.set('afterAte', true);
    this.bossflag.set('map3', true);
    this.bossflag.set('map4', true);
    this.bossflag.set('map5', true);
    this.bossflag.set('map6', true);
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
