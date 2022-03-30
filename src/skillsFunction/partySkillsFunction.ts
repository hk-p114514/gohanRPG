import { BattleActor } from 'classes/BattleActor';
import { randI } from 'functions/generalPurpose/rand';
import { Scene } from 'phaser';
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
