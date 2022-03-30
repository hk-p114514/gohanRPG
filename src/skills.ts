import { Skill } from 'classes/Skill';
import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';
import {
  arthralgiaForAll,
  attackdoping,
  batmobiru,
  breakdance,
  bresscare,
  diemaho,
  dokuhoushi,
  doujou,
  firebress,
  glucosamineForAll,
  hagaizime,
  hanihant,
  hasamikom,
  heal,
  healContinueForAll,
  insert,
  isekaitense,
  kakokyu,
  katakunaru,
  komorebi,
  nichidaiTacle,
  norinoridance,
  onsenryoko,
  paralysisForAll,
  pararaizu,
  poisonForAll,
  pop,
  presentbonus,
  provocationForAll,
  sleepForAll,
  soshaku,
  uraken,
} from 'skillsFunction';

export type SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => void;

export const skills: Skill[] = [
  new Skill('裏拳', uraken, false, true),
  new Skill('バットモビール', batmobiru, true, true),
  new Skill('ヒール', heal, false, false),
  new Skill('インサート', insert, false, false),
  new Skill('ポップ', pop, false, true),
  new Skill('ハニーハント', pop, false, true),
  new Skill('☆Die魔法・バックフィスト☆', diemaho, false, true),
  new Skill('ノリノリダンス', norinoridance, true, false), // 全体回復
  new Skill('はさみこむ', hasamikom, false, true),
  new Skill('ファイヤーブレス', firebress, true, true),
  new Skill('プレゼントボーナス', presentbonus, true, false, true), // 復活(予定)

  new Skill('日大災害誤射タックル', nichidaiTacle, true, true),
  new Skill('温泉旅行', onsenryoko, true, false), // 全体回復
  new Skill('伊勢回転性', isekaitense, true, false, true), // 復活(予定)
];

export const stateSkills: Skill[] = [
  new Skill('毒胞子', dokuhoushi, false, true),
  new Skill('パラライズ', pararaizu, false, true),
  new Skill('木漏れ日', komorebi, false, true),
  new Skill('羽交い締め', hagaizime, false, true),
  new Skill('ブレイクダンス', breakdance, false, false),
  new Skill('咀嚼', soshaku, false, true),
  new Skill('同情を誘う', doujou, false, true),
  new Skill('過呼吸', kakokyu, false, true),
  new Skill('ブレスケア', bresscare, false, false),

  new Skill('どく', poisonForAll, false, true),
  new Skill('ブレスケア', healContinueForAll, false, false),
  new Skill('シャーシンプラグイン', paralysisForAll, false, true),
  new Skill('ハードぎ', sleepForAll, false, true),
  new Skill('ヒザカックン', arthralgiaForAll, false, true),
  new Skill('せたがやそだち', glucosamineForAll, false, false),
  new Skill('wmail from k-kenta', provocationForAll, false, false),
  new Skill('どく', poisonForAll, false, true),
  new Skill('どく', poisonForAll, false, true),
];

export const buffSkills: Skill[] = [
  new Skill('アタックドーピング', attackdoping, false, false),
  new Skill('かたくなる', katakunaru, false, false),
];
