import { BattleActor, Level, LimitValue } from 'classes/BattleActor';

export const level1: Level = { current: 1, exp: 0, toNext: 5, max: 100 };
export const initHp = (): LimitValue => ({ current: 5, max: 5 });
export const initMp = (): LimitValue => ({ current: 10, max: 10 });
export const initAtk: number = 5;
export const initDef: number = 5;
export const initSpeed: number = 5;

export const allInitStatus = (name: string, spriteSrp: string = ''): BattleActor =>
  new BattleActor({
    name: name,
    spriteSrc: spriteSrp,
    hp: initHp(),
    mp: initMp(),
    atk: initAtk,
    def: initDef,
    speed: initSpeed,
  });
