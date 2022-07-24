import { SceneKeys } from './../scenes/sceneKeys';
import { Scene } from 'phaser';
import { BattleActor } from './BattleActor';
import { SkillFunction } from 'skillsFunction/skills';
//import { Map } from 'scenes/Map.tpl';

type Battling = {
  actor: BattleActor;
  selectedSkill?: SkillFunction;
};

export class System {
  static readonly TILE_SIZE: number = 40;
  public map: string;
  private party: BattleActor[] = [];
  public isBattle: boolean = false;
  public battling?: Battling;
  public DEBUG_isIgnoreBattle: boolean = true;
  public isBossKilled: Map<string, boolean> = new Map();
  public isBossBattle: boolean = false;
  public boss?: BattleActor;
  public isBossBattleWin: boolean = false;
  public collidesFlag: boolean = true;
  public eventFlag: boolean = true;
  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
    this.isBossKilled.set('Ate', false);
    this.isBossKilled.set('Bte', false);
    this.isBossKilled.set('Melcine', false);
    this.isBossKilled.set('Eleca', false);
    this.isBossKilled.set('reAte', false);
    this.isBossKilled.set('reBte', false);
    this.isBossKilled.set('reMelcine', false);
    this.isBossKilled.set('reEleca', false);
    this.isBossKilled.set('OBC', false);
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

  public findActorInPartyByName(name: string): BattleActor[] {
    return this.party.filter((actor) => actor.name === name);
  }

  public isExistActorInParty(name: string): boolean {
    const actors = this.findActorInPartyByName(name);

    if (actors.length <= 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * @brief 味方パーティにキャラクターを追加する（重複は除外）
   *
   * @param BattleActor 追加するキャラクター
   *
   * @return 追加成功:true 重複:false
   */
  public addPartyActor(actor: BattleActor): boolean {
    if (!this.party.includes(actor)) {
      this.party.push(actor);
      return true;
    }

    return false;
  }

  public getParty() {
    return this.party;
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

  winToBoss() {
    this.isBossBattleWin = true;

    return () => {
      this.isBossBattleWin = false;
    };
  }
}
