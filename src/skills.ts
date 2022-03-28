import { BattleActor } from 'classes/BattleActor';
import { Skill } from 'classes/Skill';

export type SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => void;

const attackForAll = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.beInjured(attacker.buff.getAtk());
  });
};

const healForAll = (
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.4,
) => {
  targets.forEach((target) => {
    target.beHealed(target.hp.max * rate);
    console.log(
      `${target.name}の体力は${target.hp.current} / ${target.hp.max}になった!!!`,
    );
  });
};

const highHealForAll = (attacker: BattleActor, targets: BattleActor[]) => {
  healForAll(attacker, targets, 1);
};

export const skills: Skill[] = [
  new Skill('裏拳', attackForAll, false, true),
  new Skill('☆Die魔法・バックフィスト☆', attackForAll, false, true),
  new Skill('日大災害誤射タックル', attackForAll, true, true),
  new Skill('ヒール', healForAll, false, false),
  new Skill('日帰り旅行', healForAll, true, false), // 全体回復
  new Skill('伊勢回転性', healForAll, true, false), // 復活(予定)
];
