import { Scene } from "phaser";
import { BattleActor } from "./BattleActor";
import { randI } from "functions/generalPurpose/rand";
import { thisTypeAnnotation } from "@babel/types";

export class State {
  private actor: BattleActor;

  private states: {[key: string]: StateInfo};

  private isProvocation: boolean;

  private poisonDamage: number; // 毒の1ターンのダメージ
  private healDamage: number; // 継続回復のダメージ量

  private damageBuff: number;
  private isPossible: boolean;
  private skillBuff: number;
  // private attackBuff: number;
  // private defenseBuff: number;

  constructor(actor: BattleActor) {
    this.actor = actor;

    this.states = {};

    // ターンごとにHP減少 
    this.states['poison'] = { 
      name: 'poison',
      remain: 0,
      progress: () => {
        this.damageBuff -= this.poisonDamage;
      }
    }

    // ターンごとにHP増加
    this.states['heal'] = {
      name: 'heal',
      remain: 0,
      progress: () => {
        this.damageBuff += this.healDamage;
      }
    }

    // 毎ターン50%の確率で行動不能
    this.states['paralysis'] = {
      name: 'paralysis',
      remain: 0,
      progress: () => {
        if (!randI(1, 0)) {
          this.isPossible = false;
        }
      }
    }

    // 一定ターン行動不能
    this.states['sleep'] = {
      name: 'sleep',
      remain: 0,
      progress: () => {
        this.isPossible = false;
      }
    }

    // 使える技の数-1
    this.states['arghralgia'] = {
      name: 'arghralgia',
      remain: 0,
      progress: () => {
        this.skillBuff -= 1;
      }
    }

    // 使える技の数+1
    this.states['glucosamine'] = {
      name: 'glucosamine',
      remain: 0,
      progress: () => {
        this.skillBuff += 1;
      }
    }

    // 敵の攻撃引き寄せ
    this.states['provocation'] = {
      name: 'provocation',
      remain: 0,
      progress: () => {
        this.isProvocation = true;
      }
    }

    this.isProvocation = false;

    this.poisonDamage = 1;
    this.healDamage = 1;

    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    // this.attackBuff = 0;
    // this.defenseBuff = 0;
  }

  public stateProcess(scene: Scene): void {
    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    for (const key in this.states) {
      if (this.states[key].remain > 0) {
        this.states[key].progress();
        this.states[key].remain--;
      }
    }

    this.actor.hp.current += this.damageBuff;
    if (this.actor.hp.current < 0) {
      this.actor.hp.current = 0;
    }
    if (this.actor.hp.current > this.actor.hp.max) {
      this.actor.hp.current = this.actor.hp.max;
    }
  }


  public activeState(name: string, time: number): void {
    if (time > this.states[name].remain) {
      this.states[name].remain = time;
    }
  }


  public passiveState(name: string): void {
    this.states[name].remain = 0;
  }

  // public getAttack(): number {
  //   return this.actor.atk + this.attackBuff;
  // }

  // public getDefense(): number {
  //   return this.actor.def + this.defenseBuff;
  // }

  public getPossible(): boolean {
    return this.isPossible;
  }

  public getSkillBuff(): number {
    return this.skillBuff;
  }

  public getProvocationActors(party: BattleActor[]): BattleActor[] {
    return party.filter(actor => actor.state.getProvocation());
  }

  public getProvocation(): boolean {
    return this.isProvocation;
  }
}

class StateInfo {
  public name: string;
  public remain: number;
  public progress: Function;

  constructor() {
    this.name = '';
    this.remain = 0;
    this.progress = () => {};
  }
}