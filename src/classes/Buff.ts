import { BattleActor } from './BattleActor';

export class Buff {
  private actor: BattleActor;
  private buffs: BuffInfo[];
  private rmBuffsIndex: number[];

  constructor(actor: BattleActor) {
    this.actor = actor;
    this.buffs = [];
    this.rmBuffsIndex = [];
  }

  public initBuff(): void {
    this.buffs = [];
  }

  public buffProcess(): void {
    this.rmBuffsIndex.splice(0, this.rmBuffsIndex.length);
    this.buffs.forEach((buff: BuffInfo) => {
      buff.time--;
      if (buff.time <= 0) {
        this.rmBuffsIndex.push(this.buffs.indexOf(buff));
      }
    });
    this.rmBuffsIndex.reverse();
    this.rmBuffsIndex.forEach((index: number) => {
      this.buffs.splice(index, 1);
    });
  }

  public setBuff(atk: number, def: number, time: number) {
    this.buffs.push({
      atk: atk,
      def: def,
      time: time,
    });
  }

  public getAtk(): number {
    let atk = this.actor.atk;
    this.buffs.forEach((buff: BuffInfo) => {
      atk += buff.atk;
    });
    if (atk <= 0) {
      atk = 1;
    }
    return Math.floor(atk);
  }

  public getDef(): number {
    let def = this.actor.def;
    this.buffs.forEach((buff: BuffInfo) => {
      def += buff.def;
    });
    if (def <= 0) {
      def = 1;
    }
    return Math.floor(def);
  }
}

class BuffInfo {
  public atk: number;
  public def: number;
  public time: number;

  constructor() {
    this.atk = 0;
    this.def = 0;
    this.time = 0;
  }
}
