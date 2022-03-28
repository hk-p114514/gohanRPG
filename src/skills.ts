import { BattleActor } from 'classes/BattleActor';
import { Skill } from 'classes/Skill';
import { Timelines } from 'classes/Timelines';
import { Scene } from 'phaser';
import { sceneKeys } from 'scenes/sceneKeys';

export type SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => void;

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

// 裏拳
const uraken = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk());
  const afterHp = target.hp.current;
  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}の裏拳！` },
      {
        type: 'dialog',
        text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
      },
      { type: 'endTimeline' },
    ],
  });
};

// ☆Die魔法・バックフィスト☆
const diemaho = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk());
  const afterHp = target.hp.current;
  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}の☆Die魔法・バックフィスト☆！` },
      {
        type: 'dialog',
        text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
      },
      { type: 'endTimeline' },
    ],
  });
};

// 日大災害誤射タックル
const nichidaiTacle = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  let sum: number = 0;
  targets.forEach((target) => {
    const beforeHp = target.hp.current;

    target.beInjured(attacker.buff.getAtk());

    const afterHp = target.hp.current;
    sum += Math.abs(beforeHp - afterHp);
  });
  sum = Math.floor(sum / targets.length);

  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}の日大災害誤射タックル！` },
      { type: 'dialog', text: `敵は平均 ${sum} ダメージ喰らった！` },
      { type: 'endTimeline' },
    ],
  });
};

// ヒール
const heal = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.4,
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  let text: string;
  const beforeHp = target.hp.current;
  target.beHealed(target.hp.max * rate);
  const afterHp = target.hp.current;
  if (beforeHp - afterHp === 0) {
    text = `${target.name}のHPは満タンだった...`;
  } else {
    text = `${target.name}を ${Math.abs(beforeHp - afterHp)} 回復した`;
  }
  console.log(`${target.name}の体力は${target.hp.current} / ${target.hp.max}になった!!!`);
  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}のヒールaaaa！` },
      { type: 'dialog', text: text },
      { type: 'endTimeline' },
    ],
  });
};

// 温泉旅行
const onsenryoko = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.4,
) => {
  let sum: number = 0;
  targets.forEach((target) => {
    const beforeHp = target.hp.current;

    target.beHealed(target.hp.max * rate);

    const afterHp = target.hp.current;
    sum += Math.abs(beforeHp - afterHp);
    console.log(
      `${target.name}の体力は${target.hp.current} / ${target.hp.max}になった!!!`,
    );
  });
  sum = Math.floor(sum / targets.length);

  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}の温泉旅行！` },
      { type: 'dialog', text: `仲間は平均 ${sum} 回復した！` },
      { type: 'endTimeline' },
    ],
  });
};

// 伊勢回転性
const isekaitense = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.4,
) => {
  let sum: number = 0;
  targets.forEach((target) => {
    const beforeHp = target.hp.current;

    target.beHealed(target.hp.max * rate);

    const afterHp = target.hp.current;
    sum += Math.abs(beforeHp - afterHp);
    console.log(
      `${target.name}の体力は${target.hp.current} / ${target.hp.max}になった!!!`,
    );
  });
  sum = Math.floor(sum / targets.length);

  skillDialog(scene, {
    start: [
      { type: 'dialog', text: `${attacker.name}の伊勢回転性！` },
      { type: 'dialog', text: `仲間は平均 ${sum} 回復した！` },
      { type: 'endTimeline' },
    ],
  });
};

export const skills: Skill[] = [
  new Skill('裏拳', uraken, false, true),
  new Skill('☆Die魔法・バックフィスト☆', diemaho, false, true),
  new Skill('日大災害誤射タックル', nichidaiTacle, true, true),
  new Skill('ヒール', heal, false, false),
  new Skill('温泉旅行', onsenryoko, true, false), // 全体回復
  new Skill('伊勢回転性', isekaitense, true, false), // 復活(予定)
];

const skillDialog = (scene: Scene, timelineData: Timelines) => {
  scene.scene.launch(sceneKeys.timelinePlayer, {
    anotherScene: scene,
    timelinedata: timelineData,
  });
};
