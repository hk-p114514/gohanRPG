import { BattleActor, Level, LimitValue } from 'classes/BattleActor';
import { sceneKeys } from 'scenes/sceneKeys';

export const level1: Level = { current: 1, exp: 0, toNext: 5, max: 100 };
export const initHp = (): LimitValue => ({ current: 5, max: 5 });
export const initMp = (): LimitValue => ({ current: 10, max: 10 });
export const initAtk: number = 5;
export const initDef: number = 5;
export const initSpeed: number = 5;

export const allInitStatus = (name: string): BattleActor =>
  new BattleActor({
    name: name,
    level: level1,
    hp: initHp,
    mp: initMp,
    atk: initAtk,
    def: initDef,
    speed: initSpeed,
  });

export const enemies = new Map<string, BattleActor[]>([
  [sceneKeys.map1, [allInitStatus('スライム1'), allInitStatus('スライム2')]],
  [sceneKeys.map2, [allInitStatus('スライム1'), allInitStatus('スライム2')]],
]);

export const getGhost = (): BattleActor => allInitStatus('ghost');

export const getEnemies = (key: string): BattleActor[] => {
  return enemies.get(key) || [getGhost()];
};
