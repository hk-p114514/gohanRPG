import { randI } from 'functions/generalPurpose/rand';
import { Display, Scene } from 'phaser';
import { sceneKeys } from 'scenes/sceneKeys';
import { BattleActor } from './BattleActor';

export class State {
  private actor: BattleActor;

  private damageBuff: number;
  private isPossible: boolean;
  private skillBuff: number;
  private isProvocation: boolean;

  private poisonDamage: number;
  private healDamage: number;
  private paralysisProbability: number;
  private arthralgiaBuff: number;
  private glucosamineBuff: number;

  private states: Map<string, StateInfo> = new Map<string, StateInfo>();

  constructor(actor: BattleActor) {
    this.actor = actor;

    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    this.poisonDamage = 1;
    this.healDamage = 1;
    this.paralysisProbability = 2;
    this.arthralgiaBuff = 1;
    this.glucosamineBuff = 1;

    this.states.set('poison', {
      name: 'poison',
      remain: 0,
    });
    this.states.set('heal', {
      name: 'heal',
      remain: 0,
    });
    this.states.set('paralysis', {
      name: 'paralysis',
      remain: 0,
    });
    this.states.set('sleep', {
      name: 'sleep',
      remain: 0,
    });
    this.states.set('arthralgia', {
      name: 'arthralgiaBuff',
      remain: 0,
    });
    this.states.set('glucosamine', {
      name: 'glucosamine',
      remain: 0,
    });
    this.states.set('provocation', {
      name: 'provocation',
      remain: 0,
    });
  }

  /**
   * @brief 毎ターン開始時の状態異常処理
   *
   * @param scene 実行中のバトルシーン
   *
   * @return void
   */
  public stateProcess(scene: Scene): void {
    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    this.states.forEach((state: StateInfo) => {
      if (state.remain > 0) {
        this.stateProgress(scene, state.name);
        state.remain--;
      }
    });

    this.actor.hp.current += this.damageBuff;
    if (this.actor.hp.current < 0) {
      this.actor.hp.current = 0;
    }
    if (this.actor.hp.current > this.actor.hp.max) {
      this.actor.hp.current = this.actor.hp.max;
    }
  }

  private stateProgress(scene: Scene, name: string): void {
    switch (name) {
      case 'poison':
        this.onePhrase(scene, `${this.actor.name}は毒で${this.poisonDamage}ダメージ！`);
        this.damageBuff -= this.poisonDamage;
        break;
      case 'heal':
        this.onePhrase(scene, `${this.actor.name}は${this.healDamage}回復した!`);
        this.damageBuff += this.healDamage;
        break;
      case 'paralysis':
        if (!randI(this.paralysisProbability - 1, 0)) {
          this.onePhrase(scene, `${this.actor.name}は体が痺れて動けない！`);
          this.isPossible = false;
        }
        break;
      case 'sleep':
        this.onePhrase(scene, `${this.actor.name}は眠っている！`);
        this.isPossible = false;
        break;
      case 'arghralgia':
        this.onePhrase(scene, `${this.actor.name}は膝が痛くて技が上手く選べない！`);
        this.skillBuff -= this.arthralgiaBuff;
        break;
      case 'glucosamine':
        this.onePhrase(scene, `${this.actor.name}は膝がグルグルして選べる技が増えた！`);
        this.skillBuff += this.glucosamineBuff;
        break;
      case 'provocation':
        this.onePhrase(scene, `${this.actor.name}は挑発している！`);
        this.isProvocation = true;
        break;
    }
  }

  private onePhrase(scene: Scene, text: string) {
    scene.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: scene,
      timelinedata: {
        start: [
          {
            type: 'dialog',
            text: text,
          },
          { type: 'endTimeline' },
        ],
      },
    });
  }

  /**
   * @brief 状態異常の発動
   *
   * @param name 状態異常の名前
   * @param time 状態異常の有効ターン数
   *
   * @return void
   */
  public activeState(name: string, time: number): void {
    const state = this.states.get(name);
    if (!!state) {
      if (time > state.remain) {
        state.remain = time;
      }
    }
  }

  /**
   * @brief 状態異常の解除
   *
   * @param name 状態異常の名前
   *
   * @return void
   */
  public passiveState(name: string): void {
    const state = this.states.get(name);
    if (!!state) {
      state.remain = 0;
    }
  }

  /**
   * @brief 行動可能かどうか
   *
   * @return 可能ならtrue
   */
  public getPossible(): boolean {
    return this.isPossible;
  }

  /**
   * @brief 使用可能な技の数を調べる
   *
   * @return 使用可能な技の数
   */
  public getAvailableSkillCount(skillCount: number): number {
    if (skillCount + this.skillBuff <= 0) {
      return 1;
    } else {
      return skillCount + this.skillBuff;
    }
  }

  /**
   * @brief 挑発状態のキャラクターを配列で返す
   *
   * @returns 挑発状態のキャラクター群
   */
  public getProvocationActors(party: BattleActor[]): BattleActor[] {
    return party.filter((actor: BattleActor) => actor.state.isProvocation);
  }
}

class StateInfo {
  public name: string;
  public remain: number;

  constructor() {
    this.name = '';
    this.remain = 0;
  }
}
