import { BattleActor } from 'classes/BattleActor';
import { Skill } from 'classes/Skill';

export type SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => void;

const attackForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.beInjured(attacker.atk);
  });
};

const healForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.beHealed(target.hp.current * 0.4);
  });
};

export const skills: Skill[] = [
  new Skill('裏拳', attackForAll, false, true),
  new Skill('ヒール', healForAll, false, false),
];
