import { Skill } from 'classes/Skill';
import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';
import {
  arthralgiaForAll,
  atkBuffForAll,
  defBuffForAll,
  diemaho,
  glucosamineForAll,
  heal,
  healContinueForAll,
  isekaitense,
  nichidaiTacle,
  onsenryoko,
  paralysisForAll,
  poisonForAll,
  provocationForAll,
  sleepForAll,
  uraken,
} from 'skillsFunction';

export type SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => void;

export const skills: Skill[] = [
  new Skill('裏拳', uraken, false, true),
  new Skill('☆Die魔法・バックフィスト☆', diemaho, false, true),
  new Skill('日大災害誤射タックル', nichidaiTacle, true, true),
  new Skill('ヒール', heal, false, false),
  new Skill('温泉旅行', onsenryoko, true, false), // 全体回復
  new Skill('伊勢回転性', isekaitense, true, false, true), // 復活(予定)
];

export const stateSkills: Skill[] = [
  new Skill('どく', poisonForAll, false, true),
  new Skill('ブレスケア', healContinueForAll, false, false),
  new Skill('シャーシンプラグイン', paralysisForAll, false, true),
  new Skill('ハードぎ', sleepForAll, false, true),
  new Skill('ヒザカックン', arthralgiaForAll, false, true),
  new Skill('せたがやそだち', glucosamineForAll, false, false),
  new Skill('wmail from k-kenta', provocationForAll, false, false),
];

export const buffSkills: Skill[] = [
  new Skill('アタックドーピング', atkBuffForAll, false, false),
  new Skill('かたくなる', defBuffForAll, false, false),
];
