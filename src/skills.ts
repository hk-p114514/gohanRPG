import { BattleActor } from 'classes/BattleActor';

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

export const skills: Map<string, SkillFunction> = new Map([
  ['attackForAll', attackForAll],
  ['healForAll', healForAll],
]);

export const getSkill = (name: string): SkillFunction => {
  return skills.get(name) || attackForAll;
};
