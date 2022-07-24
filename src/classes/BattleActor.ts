import { randF, randI } from './../functions/generalPurpose/rand';
import { Skill } from './Skill';
import { State } from './State';
import { Buff } from './Buff';
import {
  initHp,
  initMp,
  initAtk,
  initDef,
  initSpeed,
} from '../functions/generalPurpose/allInitStatus';
import { DEBUG } from '../functions/generalPurpose/debugLog';
import { skills } from '../skillsFunction/skills';
export type Level = {
  // 現在のレベル
  current: number;
  // 現在保持している経験値(レベルアップ時に消費される)
  exp: number;
  // 次のレベルになるまでに必要な経験値の量
  toNext: number;
  // レベルの最大値
  max: number;
};

export type LimitValue = {
  current: number;
  max: number;
};

type AddStatus = {
  maxHp: number;
  maxMp: number;
  atk: number;
  def: number;
  speed: number;
};

export class BattleActor {
  name: string = '';
  spriteSrc: string = '';
  level: Level;
  private hp: LimitValue;
  mp: LimitValue;
  atk: number;
  def: number;
  speed: number;
  // 引数にskillArgを持つ関数の配列を持つ
  skills: Skill[];
  state: State;
  buff: Buff;
  constructor({
    name = 'unknown',
    spriteSrc = '',
    hp = { ...initHp() },
    mp = { ...initMp() },
    atk = initAtk,
    def = initDef,
    speed = initSpeed,
    startLevel = 1,
    initSkills = [skills[0]],
  }) {
    this.name = name;
    this.spriteSrc = spriteSrc;
    this.hp = hp;
    this.mp = mp;
    this.atk = atk;
    this.def = def;
    this.speed = speed;
    this.level = {
      current: 1,
      exp: 0,
      toNext: 5,
      max: 100,
    };
    this.setLevel(startLevel);
    this.skills = initSkills;
    this.state = new State(this);
    this.buff = new Buff(this);
  }

  /**
   * @brief キャラクターの持つ経験値を加算する
   *
   * @param number exp 加算分の経験値
   *
   * @returns 経験値を得た結果キャラクターがレベルアップした: true
   *         経験値を得た結果キャラクターがレベルアップしなかった: false
   */
  public addExp(exp: number): boolean {
    let isLevelUp = false;
    this.level.exp += exp;
    while (this.level.exp >= this.level.toNext) {
      this.levelUp();
      this.level.exp -= this.level.toNext;
      this.level.toNext = Math.floor(this.level.toNext * 1.5);
      isLevelUp = true;
    }

    return isLevelUp;
  }

  /**
   * @brief キャラクターのレベルを上げる
   *        １度呼び出されるとレベルが１上がり、経験値が消費される。
   *        ステータスはupStatusでランダムな倍率で上昇する。
   * @return
   */
  public levelUp() {
    this.level.current++;
    this.upStatus(randF(1.8, 1.1));
  }

  /**
   * @brief キャラクターのHPを変化させる。
   *        回復、減少のいずれでも対応可能。
   *        内部でMath.floor()を使用する。
   * @param number variation HPの変化量。正の値で回復、負の値でダメージとして扱う。
   *
   * @return number 回復後のHP
   */
  public changeHp(variation: number) {
    if (variation > 0) {
      this.beHealed(variation);
    } else if (variation < 0) {
      this.beInjured(-variation);
    }

    if (this.hp.current < 0) {
      this.hp.current = 0;
    }

    if (this.hp.current > this.hp.max) {
      this.hp.current = this.hp.max;
    }
    return this.hp.current;
  }

  // 被ダメ
  public beInjured(damage: number): void {
    const before = this.hp.current;
    this.hp.current -= Math.floor(damage - damage / (this.buff.getDef() + randI(2, 1)));
    if (this.hp.current < 0) {
      this.hp.current = 0;
    }
    DEBUG.log(`${this.name} damaged ${before - this.hp.current}`);
  }

  // 回復
  public beHealed(heal: number): void {
    this.hp.current += Math.floor(heal);
    if (this.hp.current > this.hp.max) {
      this.hp.current = this.hp.max;
    }
  }

  // max回復
  public beMaxHealed(): void {
    this.hp.current = this.hp.max;
  }

  public getRandSkill(): Skill {
    return this.skills[randI(this.skills.length - 1)];
  }

  public isDead(): boolean {
    return this.hp.current <= 0;
  }

  public getHp() {
    return this.hp;
  }

  private changeStatus(status: AddStatus) {
    this.hp.max = this.hp.current = Math.floor(status.maxHp);
    this.mp.max = this.mp.current = Math.floor(status.maxMp);
    this.atk = Math.floor(status.atk);
    this.def = Math.floor(status.def);
    this.speed = Math.floor(status.speed);
  }

  private upStatus(rate: number) {
    this.changeStatus({
      atk: this.atk * rate,
      def: this.def * rate,
      maxHp: this.hp.max * rate,
      maxMp: this.mp.max * rate,
      speed: this.speed * rate,
    });
  }

  private setLevel(current: number): number {
    if (this.level.current > current) {
      return 1;
    }

    for (let i = 0; Math.abs(current - this.level.current); i++) {
      this.levelUp();
      this.level.toNext = Math.floor(this.level.toNext * 1.5);
    }

    return 0;
  }
}
