import { BattleActor } from 'classes/BattleActor';
import { mapEnemies, getGhost } from 'enemies';

export const getEnemies = (key: string): BattleActor[] => {
  return mapEnemies.get(key) || [getGhost()];
};
