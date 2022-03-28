import { BattleActor } from 'classes/BattleActor';
import { allInitStatus } from 'functions/generalPurpose/allInitStatus';
import { sceneKeys } from 'scenes/sceneKeys';

import slime from '@/assets/characters/static/slime.png';
import slimea from '@/assets/characters/static/slimea.png';
import slimeb from '@/assets/characters/static/slimeb.png';

import mage from '@/assets/characters/static/mage.png';
import magea from '@/assets/characters/static/magea.png';
import mageb from '@/assets/characters/static/mageb.png';

const e = {
  slime: allInitStatus('スライム', slime),
  slimea: allInitStatus('スライムA', slimea),
  slimeb: allInitStatus('スライムB', slimeb),
  mage: new BattleActor({ name: 'まほうつかい', spriteSrc: mage, startLevel: 5 }),
  magea: new BattleActor({ name: 'まほうつかいA', spriteSrc: magea, startLevel: 5 }),
  mageb: new BattleActor({ name: 'まほうつかいB', spriteSrc: mageb, startLevel: 5 }),
};

export const mapEnemies = new Map<string, BattleActor[]>([
  [sceneKeys.map1, [e.slime, e.slimea]],
  [sceneKeys.map2, [e.slimeb, e.mage, e.magea]],
]);

export const getGhost = (): BattleActor => allInitStatus('ghost');

export const getEnemies = (key: string): BattleActor[] => {
  return mapEnemies.get(key) || [getGhost()];
};
