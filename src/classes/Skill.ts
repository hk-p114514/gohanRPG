import { Scene } from 'phaser';
import { SkillFunction } from 'skills';
import { BattleActor } from './BattleActor';

export class Skill {
  private skill: SkillFunction;
  private name: string;
  private forAllTargets: boolean;
  private forEnemy: boolean;
  private resurrect: boolean;
  constructor(
    name: string,
    skill: SkillFunction,
    forAllTargets = false,
    forEnemy = true,
    resurrect = false,
  ) {
    this.name = name;
    this.skill = skill;
    this.forAllTargets = forAllTargets;
    this.forEnemy = forEnemy;
    this.resurrect = resurrect;
  }

  getName() {
    return this.name;
  }

  exe(scene: Scene, attacker: BattleActor, targets: BattleActor[]): void {
    this.skill(scene, attacker, targets);
  }

  getSkill() {
    return this.skill;
  }

  getSkillInfo() {
    return { forAllTargets: this.forAllTargets, forEnemy: this.forEnemy };
  }

  getResurrect() {
    return this.resurrect;
  }
}
