import { BattleActor } from 'classes/BattleActor';
import { Skill } from 'classes/Skill';

export type SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => void;

const attackForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.beInjured(attacker.buff.getAtk());
  });
};

const healForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.4,
) => {
  targets.forEach((target) => {
    target.beHealed(target.hp.max * rate);
  });
};

const poisonForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.state.activeState('poison', 3);
  });
};

const healContinueForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('heal', 3);
  });
};

const pharalysisForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('pharalysis', 3);
  });
};

const sleepForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.state.activeState('sleep', 3);
  });
};

const arthralgiaForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('arthralgia', 3);
  });
};

const glucosamineForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('glucosamine', 3);
  });
};

const provocationForAll: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('provocation', 3);
  });
};

const atkBuffForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.buff.setBuff(100, 0, 3);
  });
};

const defBuffForAll: SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.buff.setBuff(0, 100, 3);
  });
};

const highHealForAll = (attacker: BattleActor, targets: BattleActor[]) => {
  healForAll(attacker, targets);
};

export const skills: Skill[] = [
  new Skill('裏拳', attackForAll, false, true),
  new Skill('ヒール', healForAll, false, false),
  new Skill('温泉旅行', healForAll, true, false), // 全体回復
  new Skill('伊勢回転性', healForAll, true, false), // 復活(予定)
];

export const stateSkills: Skill[] = [
  new Skill('どく', poisonForAll, false, true),
  new Skill('ブレスケア', healContinueForAll, false, false),
  new Skill('シャーシンプラグイン', pharalysisForAll, false, true),
  new Skill('ハードぎ', sleepForAll, false, true),
  new Skill('ヒザカックン', arthralgiaForAll, false, true),
  new Skill('せたがやそだち', glucosamineForAll, false, false),
  new Skill('wmail from k-kenta', provocationForAll, false, true),
];

export const buffSkills: Skill[] = [
  new Skill('アタックドーピング', atkBuffForAll, false, false),
  new Skill('ディフェンス注射', defBuffForAll, false, false),
];
