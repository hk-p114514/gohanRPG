import { BattleActor } from 'classes/BattleActor';
import { mapEnemies, getGhost } from 'actor/enemies';

export const getEnemies = (key: string): BattleActor[] => {
  return mapEnemies.get(key) || [getGhost()];
};
