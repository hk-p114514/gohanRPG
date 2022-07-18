import { Scene } from 'phaser';
import { SkillFunction } from 'skills';
import { BattleActor } from 'classes/BattleActor';
import { skillDialog } from 'skillsFunction/skillDialog';
import { randI } from 'functions/generalPurpose/rand';
import { getAttackResult, getHealResult } from './enemySkillsFunction';

// エーテ用専用技
// スイパスウィップ
export const swepasWhip: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const { damage } = getAttackResult(attacker, target);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のスイパスウィップ！` },
    {
      type: 'dialog',
      text: `${target.name}は ${damage} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// エーテ専用技
// バンズプレス
export const vansPress: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const { damage } = getAttackResult(attacker, target);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のバンズプレス！` },
    {
      type: 'dialog',
      text: `${target.name}は ${damage} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// エーテ専用技
// パーサローフ
export const persaLoaf: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeAtk = target.buff.getAtk();
  target.buff.setBuff(target.buff.getAtk() * 0.2, 0, 3);
  const afterAtk = target.buff.getAtk();
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のパーサローフ！` },
    {
      type: 'dialog',
      text: `${target.name}の攻撃力が ${Math.abs(beforeAtk - afterAtk)} 上がった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// エーテ専用技
// フルーツファントム
export const fruitsPhantom: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
  rate: number = 0.2,
) => {
  if (!targets.length) return;
  const target = targets[0];
  const { beforeHp, afterHp, heal } = getHealResult(target, rate);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のフルーツファントム！` },
    {
      type: 'dialog',
      text: `${target.name}は ${heal} 回復した！`,
    },
    { type: 'endTimeline' },
  ]);
};

// エーテ専用技
// サバレースプラッシュ
export const sabaleSplash: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    num++;
    const { damage } = getAttackResult(attacker, target);
    sum += damage;
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のサバレースプラッシュ！` },
    { type: 'dialog', text: `眼球にレモンの汁が襲い来る！` },
    { type: 'dialog', text: `平均${sum / num}のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// ビーテ専用技
// エビテンスイング
export const shrimpSwing: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const { damage } = getAttackResult(attacker, target);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のエビテンスイング！` },
    {
      type: 'dialog',
      text: `${target.name}は ${damage} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// ビーテ専用技
// 三色の舞
export const tripleDance: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let i: number, num: number[], beforeHp: number[], afterHps: number[];
  num = [0, 0, 0];
  beforeHp = [0, 0, 0];
  afterHps = [0, 0, 0];
  for (i = 0; i < 3; i++) {
    do {
      num[i] = randI(targets.length - 1, 0);
    } while (targets[num[i]].isDead());

    const { beforeHp, afterHp } = getAttackResult(attacker, targets[num[i]]);
    afterHps[i] = afterHp;
  }
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の三色の舞！` },
    {
      type: 'dialog',
      text: `${targets[num[0]]}は${Math.abs(beforeHp[0] - afterHps[0])}喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// ビーテ専用技
// ジンジャーレイン
export const gingerRain: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    num++;
    const { damage } = getAttackResult(attacker, target);
    sum += damage;
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のジンジャーレイン！` },
    { type: 'dialog', text: `平均${Math.floor(sum / num)}のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// ビーテ専用技
// スロートサースト
export const throatThirst: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeDef = target.buff.getDef();
  target.buff.setBuff(0, -target.buff.getDef() * 0.2, 3);
  const afterDef = target.buff.getDef();
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のスロートサースト！` },
    {
      type: 'dialog',
      text: `${target.name}の防御力が ${Math.abs(beforeDef - afterDef)} 下がった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// ビーテ専用技
// ソースビッグウェーブ
export const sauceBigWave: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    num++;
    const { beforeHp, afterHp, damage } = getAttackResult(attacker, target);
    sum += damage;
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のソースビッグウェーブ！` },
    { type: 'dialog', text: `大盛り1杯分のソースが全てを飲み込む！` },
    { type: 'dialog', text: `平均${Math.floor(sum / num)}のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// メルシン専用技
// ヌードルクラスタ
export const noodleCluster: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const { damage } = getAttackResult(attacker, target);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のヌードルクラスタ！` },
    {
      type: 'dialog',
      text: `${target.name}は ${damage} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// メルシン専用技
// アーティフィカルチャーシュー
export const artificialFillet: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeAtk = target.buff.getAtk();
  const beforeDef = target.buff.getDef();
  target.buff.setBuff(-target.buff.getAtk() * 0.3, -target.buff.getDef() * 0.3, 5);
  const afterAtk = target.buff.getAtk();
  const afterDef = target.buff.getDef();
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のアーティフィカルチャーシュー！` },
    {
      type: 'dialog',
      text: `${target.name}の攻撃力が ${Math.abs(beforeAtk - afterAtk)} 下がった！`,
    },
    {
      type: 'dialog',
      text: `${target.name}の防御力が ${Math.abs(beforeDef - afterDef)} 下がった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// メルシン専用技
// ダーシースパイス
export const soupSpice: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  targets.forEach((target: BattleActor) => {
    if (!target.isDead()) {
      target.state.activeState('poison', 2);
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のダーシースパイス！` },
    { type: 'dialog', text: `仲間たちは毒状態になってしまった！` },
    { type: 'endTimeline' },
  ]);
};

// メルシン専用技
// フリーズチャイン
export const freezeChin: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  targets[0].state.activeState('arthralgia', 2);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のフリーズチャイン！` },
    { type: 'dialog', text: `${target.name}は使える技が減った！` },
    { type: 'endTimeline' },
  ]);
};

// メルシン専用技
// ウィードグルージ
export const weedGrudge: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    if (!target.isDead()) {
      num++;
      const { beforeHp, afterHp, damage } = getAttackResult(attacker, target);
      sum += damage;
      target.state.activeState('sleep', randI(3, 1));
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のウィードグルージ！` },
    { type: 'dialog', text: '食べ残されたワカメの怨念が襲い来る！' },
    { type: 'dialog', text: '仲間たちは眠ってしまった！' },
    { type: 'dialog', text: `平均${Math.floor(sum / num)}のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// エレカ専用技
// ボイドライス
export const voidRice: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const { damage } = getAttackResult(attacker, target, 1.3);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のボイドライス！` },
    {
      type: 'dialog',
      text: `${target.name}は ${damage} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// エレカ専用技
// ミートボールフォール
export const meatballFall: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    if (!target.isDead()) {
      num++;
      const { beforeHp, afterHp, damage } = getAttackResult(attacker, target);
      sum += damage;
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のミートボールフォール！` },
    { type: 'dialog', text: `平均 ${Math.floor(sum / num)} のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// エレカ専用技
// ベリカラカリー
export const veryHotCurry: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  const { beforeHp, afterHp, heal } = getHealResult(target, 0.5);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のベリカラカリー！` },
    { type: 'dialog', text: `${target.name}は${heal}回復した！` },
    { type: 'endTimeline' },
  ]);
};

// エレカ専用技
// フクピクマウンテン
export const hukuPickMountain: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  target.buff.setBuff(0, 1000000, 1);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のフクピクマウンテン！` },
    { type: 'dialog', text: `${attacker.name}の守備力が1ターン大幅アップ！` },
    { type: 'endTimeline' },
  ]);
};

// エレカ専用技
// キーマガトリング
export const keemaGatling: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  attacker.buff.setBuff(1000000, 0, 1);
  const { beforeHp, afterHp, damage } = getAttackResult(attacker, target);
  skillDialog(scene, [
    { type: 'dialog', text: 'エレカのキーマガトリング！' },
    { type: 'dialog', text: `ルーのつぶつぶが${target.name}を襲う！` },
    {
      type: 'dialog',
      text: `${target.name}に${damage}のダメージ！`,
    },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// レフトオーバーフォービット
export const leftoverForbid: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  const target = targets[0];
  target.beInjured(15);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のレフトオーバーフォービット！` },
    {
      type: 'dialog',
      text: `${target.name}は ${15} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// サイレントフォース
export const silentForce: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  attacker.buff.initBuff();
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のサイレントフォース！` },
    { type: 'dialog', text: `${attacker.name}は攻撃力、防御力を元に戻した！` },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// ディストリビュートイーティング
export const distributeEating: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    num++;
    const { beforeHp, afterHp, damage } = getAttackResult(attacker, target);
    sum += damage;
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のディストリビュートイーテイング！` },
    { type: 'dialog', text: `平均 ${Math.floor(sum / num)} のダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// テーブルウェアハートル
export const tablewareHurtle: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let num: number;
  do {
    num = randI(targets.length - 1, 0);
  } while (targets[num].isDead());
  const { damage } = getAttackResult(attacker, targets[num], 1.3);
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のテーブルウェアハートル！` },
    {
      type: 'dialog',
      text: `${targets[num].name}は ${damage} 喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// アンサニタリーキッチン
export const unsanitaryKitchen: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  let i: number, num: number[];
  num = [0, 0];
  for (i = 0; i < 2; i++) {
    do {
      num[i] = randI(targets.length - 1, 0);
    } while (targets[num[i]].isDead());
    targets[num[i]].state.activeState('sleep', 4);
  }
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のアンサニタリーキッチン！` },
    { type: 'dialog', text: `${targets[num[0]].name}は眠ってしまった！` },
    { type: 'dialog', text: `${targets[num[1]].name}は眠ってしまった！` },
    { type: 'endTimeline' },
  ]);
};

// OBC専用技
// デス・ダイニング
export const deathDining: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  if (!targets.length) return;
  let sum = 0,
    num = 0;
  targets.forEach((target: BattleActor) => {
    if (!target.isDead()) {
      num++;
      const { damage } = getAttackResult(attacker, target);
      sum += damage;
    }
  });
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のデス・ダイニング！` },
    { type: 'dialog', text: `黒い霧が食堂を包み込む！` },
    { type: 'dialog', text: `平均 ${Math.floor(sum / num)} のダメージ！` },
    { type: 'endTimeline' },
  ]);
};
