import { Scene } from 'phaser';
import { BattleActor } from './BattleActor';
import { randI } from 'functions/generalPurpose/rand';
import { thisTypeAnnotation } from '@babel/types';

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

  public stateProcess(): void {
    this.damageBuff = 0;
    this.isPossible = true;
    this.skillBuff = 0;
    this.isProvocation = false;

    this.states.forEach((state: StateInfo) => {
      if (state.remain > 0) {
        this.stateProgress(state.name);
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

  private stateProgress(name: string): void {
    switch (name) {
      case 'poison':
        this.damageBuff -= this.poisonDamage;
        break;
      case 'heal':
        this.damageBuff += this.healDamage;
        break;
      case 'paralysis':
        if (!randI(this.paralysisProbability - 1, 0)) {
          this.isPossible = false;
        }
        break;
      case 'sleep':
        this.isPossible = false;
        break;
      case 'arthralgia':
        this.skillBuff -= this.arthralgiaBuff;
        break;
      case 'glucosamine':
        this.skillBuff += this.glucosamineBuff;
        break;
      case 'provocation':
        this.isProvocation = true;
        break;
    }
  }

  public activeState(name: string, time: number): void {
    const state = this.states.get(name);
    if (!!state) {
      if (time > state.remain) {
        state.remain = time;
      }
    }
  }

  public passiveState(name: string): void {
    const state = this.states.get(name);
    if (!!state) {
      state.remain = 0;
    }
  }

  public getPossible(): boolean {
    return this.isPossible;
  }

  public getAvailableSkillCount(skillCount: number): number {
    return skillCount + this.skillBuff;
  }

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
