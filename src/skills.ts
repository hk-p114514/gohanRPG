import { BattleActor } from 'classes/BattleActor';
import { randI } from 'functions/generalPurpose/rand';

export type SkillFunction = (attacker: BattleActor, targets: BattleActor[]) => number;

/**
 * @brief targetsのいずれかに単体物理攻撃を行う
 *
 * @param BattleActor     attacker 攻撃する側のキャラクター
 * @param BattleActor[]   targets  攻撃を受ける可能性のあるキャラクターの配列
 *
 * @return 攻撃の結果、対象が死亡した場合:1, 存命の場合: 0
 */
export const randomNormalAttack: SkillFunction = (
  attacker: BattleActor,
  targets: BattleActor[],
): number => {
  const i = randI(targets.length);
  targets[i].beInjured(attacker.atk);
  const isDead = targets[i].isDead();

  return isDead ? 1 : 0;
};
