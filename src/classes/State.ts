import { Scene } from 'phaser';
import { sceneKeys } from 'scenes/sceneKeys';
import { BattleActor } from './BattleActor';
import { randI } from 'functions/generalPurpose/rand';

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
  private statesName: Map<string, string> = new Map<string, string>();

  constructor(actor: BattleActor) {
    this.actor = actor;

    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    const { max } = actor.getHp();
    this.poisonDamage = Math.floor(max * 0.1);
    this.healDamage = Math.floor(max * 0.1);
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
      name: 'arthralgia',
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

    this.statesName.set('poison', '毒');
    this.statesName.set('heal', '継続回復');
    this.statesName.set('paralysis', '麻痺');
    this.statesName.set('sleep', '眠り');
    this.statesName.set('arthralgia', 'トラウマ');
    this.statesName.set('glucosamine', '祝福');
    this.statesName.set('provocation', '挑発');
  }

  public initState(): void {
    this.states.forEach((state: StateInfo) => {
      this.passiveState(state.name);
    });
    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;
  }

  /**
   * @brief 毎ターン開始時の状態異常処理
   *
   * @param scene 実行中のバトルシーン
   *
   * @return void
   */
  public stateProcess(scene: Scene): void {
    if (this.actor.isDead()) return;
    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    this.states.forEach((state: StateInfo) => {
      if (state.remain > 0) {
        state.remain--;
        if (state.remain <= 0) {
          this.onePhrase(
            scene,
            `${this.actor.name}の${this.statesName.get(state.name)}状態が解除された！`,
          );
        } else {
          this.stateProgress(scene, state.name);
        }
      }
    });

    this.actor.changeHp(this.damageBuff);
  }

  private stateProgress(scene: Scene, name: string): void {
    switch (name) {
      case 'poison':
        if (this.poisonDamage > 0) {
          this.onePhrase(scene, `${this.actor.name}は毒で${this.poisonDamage}ダメージ！`);
          this.damageBuff -= this.poisonDamage;
        }
        break;
      case 'heal':
        if (this.healDamage > 0) {
          this.onePhrase(scene, `${this.actor.name}は${this.healDamage}回復した!`);
          this.damageBuff += this.healDamage;
        }
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
      case 'arthralgia':
        this.onePhrase(scene, `${this.actor.name}はトラウマで技が上手く選べない！`);
        this.skillBuff -= this.arthralgiaBuff;
        break;
      case 'glucosamine':
        this.onePhrase(scene, `${this.actor.name}は祝福により選べる技が増えた！`);
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
      timelineData: {
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
  public static getProvocationActors(party: BattleActor[]): BattleActor[] {
    return party.filter(
      (actor: BattleActor) => actor.state.isProvocation && !actor.isDead(),
    );
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
