import { SkillFunction } from 'skills';
import { BattleActor } from './BattleActor';

export class Skill {
  private skill: SkillFunction;
  private name: string;
  private forAllTargets: boolean;
  private forEnemy: boolean;
  constructor(
    name: string,
    skill: SkillFunction,
    forAllTargets = false,
    forEnemy = true,
  ) {
    this.name = name;
    this.skill = skill;
    this.forAllTargets = forAllTargets;
    this.forEnemy = forEnemy;
  }

  getName() {
    return this.name;
  }

  exe(attacker: BattleActor, targets: BattleActor[]): void {
    this.skill(attacker, targets);
  }

  getSkill() {
    return this.skill;
  }

  getSkillInfo() {
    return { forAllTargets: this.forAllTargets, forEnemy: this.forEnemy };
  }
}
