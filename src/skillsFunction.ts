import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';
import { SkillFunction } from 'skills';
import { sceneKeys } from 'scenes/sceneKeys';
import { Timeline } from 'classes/Timeline';

// ダイアログ表示関数
//引数の書き方： (scene, [{type:'--', text:'~~'}, {}, {}])
export const skillDialog = (scene: Scene, timelineData: Timeline) => {
  scene.scene.launch(sceneKeys.timelinePlayer, {
    anotherScene: scene,
    timelinedata: { start: timelineData },
  });
};

export const attackForAll = (attacker: BattleActor, targets: BattleActor[]) => {
  targets.forEach((target) => {
    target.beInjured(attacker.buff.getAtk());
  });
};

export const healForAll = (
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

export const poisonForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('poison', 3);
  });
};

export const healContinueForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('heal', 3);
  });
};

export const paralysisForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('paralysis', 3);
  });
};

export const sleepForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('sleep', 3);
  });
};

export const arthralgiaForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('arthralgia', 3);
  });
};

export const glucosamineForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('glucosamine', 3);
  });
};

export const provocationForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.state.activeState('provocation', 3);
  });
};

export const atkBuffForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.buff.setBuff(100, 0, 3);
  });
};

export const defBuffForAll: SkillFunction = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  targets.forEach((target) => {
    target.buff.setBuff(0, 100, 3);
  });
};

export const highHealForAll = (attacker: BattleActor, targets: BattleActor[]) => {
  healForAll(attacker, targets, 1);
};

// 裏拳
export const uraken = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk());
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の裏拳！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// ☆Die魔法・バックフィスト☆
export const diemaho = (scene: Scene, attacker: BattleActor, targets: BattleActor[]) => {
  if (!targets.length) return;
  const target: BattleActor = targets[0];
  const beforeHp = target.hp.current;
  target.beInjured(attacker.buff.getAtk());
  const afterHp = target.hp.current;
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の☆Die魔法・バックフィスト☆！` },
    {
      type: 'dialog',
      text: `${target.name}は ${Math.abs(beforeHp - afterHp)} ダメージ喰らった！`,
    },
    { type: 'endTimeline' },
  ]);
};

// 日大災害誤射タックル
export const nichidaiTacle = (
  scene: Scene,
  attacker: BattleActor,
  targets: BattleActor[],
) => {
  let sum: number = 0;
  targets.forEach((target) => {
    const beforeHp = target.hp.current;

    target.beInjured(attacker.buff.getAtk());

    const afterHp = target.hp.current;
    sum += Math.abs(beforeHp - afterHp);
  });
  sum = Math.floor(sum / targets.length);

  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の日大災害誤射タックル！` },
    { type: 'dialog', text: `平均 ${sum} ダメージ！` },
    { type: 'endTimeline' },
  ]);
};

// ヒール
export const heal = (
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
  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}のヒール！` },
    { type: 'dialog', text: text },
    { type: 'endTimeline' },
  ]);
};

// 温泉旅行
export const onsenryoko = (
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

  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の温泉旅行！` },
    { type: 'dialog', text: `平均 ${sum} 回復した！` },
    { type: 'endTimeline' },
  ]);
};

// 伊勢回転性
export const isekaitense = (
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

  skillDialog(scene, [
    { type: 'dialog', text: `${attacker.name}の伊勢回転性！` },
    { type: 'dialog', text: `平均 ${sum} 回復した！` },
    { type: 'endTimeline' },
  ]);
};
