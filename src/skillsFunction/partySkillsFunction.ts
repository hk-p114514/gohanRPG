import { BattleActor } from 'classes/BattleActor';
import { randI } from 'functions/generalPurpose/rand';
import { Scene } from 'phaser';
import { SkillFunction } from 'skills';
import { skillDialog } from './skillDialog';

// そぎ切り（中攻撃）
export const sogigiri = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk() * 1);
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のそぎ切り！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// 夢翔斬（超強攻撃、自分に眠り）
export const mushouzan = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk() * 1.5);
  attacker.state.activeState('sleep', 1);
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の夢翔斬！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    {
      type: 'dialog',
      text: `${attacker.name}は 眠り状態になった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// 因果の小車（強攻撃、死か外れるまで攻撃し続ける）
export const inganoOguruma = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  let sum: number = 0;
  while (randI(3)) {
    const beforeHp = target.hp.current;
    target.beInjured(attacker.buff.getAtk() * 1.2);
    const afterHp = target.hp.current;
    sum += Math.abs(beforeHp - afterHp);
  }
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の因果の小車！` },
    {
      type: 'dialog',
      text: `${target.name}は合計 ${sum} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// ドライブスルー（強攻撃、被害者にマヒ）
export const drivethough = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  // 強攻撃
  target.beInjured(attacker.buff.getAtk() * 1.2);
  const afterHp = target.hp.current;
  // マヒ
  target.state.activeState('paralysis', 3);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のドライブスルー！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    {
      type: 'dialog',
      text: `${target.name}は マヒ状態になった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// js上の詠唱曲
export const airOnJs: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk());
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のjs上の詠唱曲！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// 聖杯の幻想曲
export const grailFantasia: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const beforeHp = target.hp.current;
  target.beHealed(target.hp.max * 0.3);
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の聖杯の幻想曲！` },
    { type: 'dialog', text: `${target.name}は${Math.abs(beforeHp - afterHp)}回復した！` },
    { type: 'endTimeline' },
  ]);
};
// 指揮者の終曲
export const conductorFinale: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const targetBeforeDef = target.buff.getDef();
  target.buff.setBuff(0, -target.buff.getDef(), 1);
  const targetAfterDef = target.buff.getDef();
  const targetBeforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk() * 1.5);
  const targetAfterHp = target.hp.current;
  const attackerBeforeHp = attacker.hp.current;
  attacker.hp.current = 0;
  const attackerAfterHp = attacker.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の指揮者の終曲！` },
    {
      type: 'dialog',
      text: `${target.name}の防御が${Math.abs(
        targetBeforeDef - targetAfterDef,
      )}下がった！`,
    },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(
        targetBeforeHp - targetAfterHp,
      )} ダメージ喰らった！`,
    },
    {
      type: 'dialog',
      text: `${attacker.name}は反動で ${Math.abs(
        attackerBeforeHp - attackerAfterHp,
      )} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// 紅魔の鎮魂歌
export const redDevilRequiem: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    if (target.hp.current > 0) {
      num++;
      const beforeHp = target.hp.current;
      target.beInjured(attacker.buff.getAtk() * 1.5);
      const afterHp = target.hp.current;
      sum += Math.abs(beforeHp - afterHp);
      target.state.activeState('poison', 2);
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の紅魔の鎮魂歌！` },
    { type: 'dialog', text: `平均 ${Math.floor(sum / num)} ダメージ与えた！` },
    { type: 'dialog', text: '敵を毒状態にした！' },
    { type: 'endTimeline' },
  ]);
};
// 朝ラーの加護
export const morningRamenBless: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let hpSum = 0,
    atkSum = 0,
    defSum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    if (target.hp.current > 0) {
      num++;
      const beforeHp = target.hp.current;
      target.beInjured(attacker.buff.getAtk() * 1.2);
      const afterHp = target.hp.current;
      hpSum += Math.abs(beforeHp - afterHp);
      const beforeAtk = target.buff.getAtk();
      const beforeDef = target.buff.getDef();
      target.buff.setBuff(-target.buff.getAtk() * 0.2, -target.buff.getDef() * 0.2, 3);
      const afterAtk = target.buff.getAtk();
      const afterDef = target.buff.getDef();
      atkSum += Math.abs(beforeAtk - afterAtk);
      defSum += Math.abs(beforeDef - afterDef);
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の朝ラーの加護！` },
    { type: 'dialog', text: `敵は平均 ${Math.floor(hpSum / num)} 喰らった！` },
    { type: 'dialog', text: `敵の攻撃力が平均 ${Math.floor(atkSum / num)} 下がった！` },
    { type: 'dialog', text: `敵の防御力が平均 ${Math.floor(defSum / num)} 下がった！` },
    { type: 'endTimeline' },
  ]);
};
// 杜の恵み
export const forestGrace: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum: number = 0;
  targets.forEach((target: BattleActor) => {
    const beforeHp = target.hp.current;
    target.beHealed(target.hp.max * 0.5);
    const afterHp = target.hp.current;
    target.state.activeState('glucosamine', 2);
    sum += Math.abs(beforeHp - afterHp);
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の杜の恵み！` },
    { type: 'dialog', text: `平均 ${Math.floor(sum / targets.length)} 回復した！` },
    { type: 'dialog', text: '技が1つ多く選べるようになった！' },
    { type: 'endTimeline' },
  ]);
};
// ピコヒール
export const picoHeal: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  target.state.activeState('heal', 5);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のピコヒール！` },
    { type: 'dialog', text: `${target.name}は継続回復を得た！` },
    { type: 'endTimeline' },
  ]);
};
// メガヒール
export const megaHeal: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const beforeHp = target.hp.current;
  target.beHealed(target.hp.max * 0.3);
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のメガヒール！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} 回復した！`,
    },
  ]);
};
// まもる
export const protect: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  target.state.activeState('provocation', 4);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のまもる！` },
    { type: 'dialog', text: `${target.name}は挑発し、敵の注意を引いた！` },
    { type: 'endTimeline' },
  ]);
};
// つよくなる
export const beStrong: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk() * 0.8);
  const afterHp = target.hp.current;
  const beforeDef = target.buff.getDef();
  attacker.buff.setBuff(0, attacker.buff.getDef() * 0.2, 4);
  const afterDef = target.buff.getDef();
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のつよくなる！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    {
      type: 'dialog',
      text: `${attacker.name}の防御力が ${Math.abs(beforeDef - afterDef)} 上がった！`,
    },
    { type: 'endTimeline' },
  ]);
};
// たいきばんせい
export const daikiLate: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  target.state.activeState('provocation', 3);
  target.buff.setBuff(0, 1000000, 1);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のたいきばんせい！` },
    { type: 'dialog', text: `${target.name}は敵の注意を引いた！` },
    { type: 'dialog', text: `${target.name}の防御力がかなり上がった！` },
    { type: 'endTimeline' },
  ]);
};
// とつげき
export const charge: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk() * 1.2);
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のとつげき！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};
