import { BattleActor } from 'classes/BattleActor';
import { sceneKeys } from 'scenes/sceneKeys';
import { allInitStatus } from 'functions/generalPurpose/allInitStatus';

import slime from '@/assets/characters/static/slime.png';
import tb1a from '@/assets/characters/static/mushroom.png';
import batman from '@/assets/characters/static/batman.png';
import abTree from '@/assets/characters/static/tree.png';
import hangedBear from '@/assets/characters/static/tree.png';
import showerHead from '@/assets/characters/static/axotla.png';
import sabagiza from '@/assets/characters/static/magea.png';
import tsuchinoko from '@assets/characters/static/snakea.png';
import bloodScorpion from '@/assets/characters/static/scorpiona.png';
import formerBoss from '@/assets/characters/static/dragon2.png';
import fishEgg from '@/assets/characters/static/egga.png';
import konjacJelly from '@/assets/characters/static/jellyfish.png';
import arrestLock from '@/assets/characters/static/mimicb.png';
import entrance from '@/assets/characters/static/footballFish.png';
import riverDam from '@/assets/characters/static/walla.png';
import cutlery from '@/assets/characters/static/cavityMana.png';
import friedChiken from '@/assets/characters/static/chikena.png';
import burn from '@/assets/characters/static/skeletonb.png';
import yakitori from '@/assets/characters/static/griffona.png';
import enken from '@/assets/characters/static/kerberos.png';
import ghost from '@/assets/characters/static/flyGhost.png';
import { map } from 'lodash';
import { skills } from 'skills';

const enemy = {
  slime: new BattleActor({
    name: 'スライム',
    spriteSrc: slime,
    hp: { current: 1, max: 1 },
    mp: { current: 1, max: 1 },
    atk: 1,
    def: 1,
    speed: 1,
    startLevel: 1,
    initSkills: [skills[0]],
  }),
  tb1a: new BattleActor({ name: 'TB1-a', spriteSrc: tb1a }),
  batman: new BattleActor({ name: 'バットマン', spriteSrc: batman }),
  abTree: new BattleActor({ name: '外見二分木', spriteSrc: abTree }),
  hangedBear: new BattleActor({ name: '†ハングドベア†', spriteSrc: hangedBear }),

  showerHead: new BattleActor({ name: 'シャワーヘッド', spriteSrc: showerHead }),
  sabagiza: new BattleActor({ name: 'サバギザ', spriteSrc: sabagiza }),
  tsuchinoko: new BattleActor({ name: 'その辺のツチノコ', spriteSrc: tsuchinoko }),
  bloodScorpion: new BattleActor({ name: 'けっせんサソリ', spriteSrc: bloodScorpion }),
  formerBoss: new BattleActor({ name: '元ボス', spriteSrc: formerBoss }),

  fishEgg: new BattleActor({ name: '魚卵', spriteSrc: fishEgg }),
  konjacJelly: new BattleActor({ name: 'こんにゃくゼリーP', spriteSrc: konjacJelly }),
  arrestLock: new BattleActor({ name: '軟禁錠', spriteSrc: arrestLock }),
  entrance: new BattleActor({ name: '入り口', spriteSrc: entrance }),
  riverDam: new BattleActor({ name: '都田川ダム', spriteSrc: riverDam }),

  cutlery: new BattleActor({ name: 'カトラリー', spriteSrc: cutlery }),
  friedChiken: new BattleActor({ name: 'からレドくん', spriteSrc: friedChiken }),
  burn: new BattleActor({ name: 'おおやけど', spriteSrc: burn }),
  yakitori: new BattleActor({ name: 'Yakitori', spriteSrc: yakitori }),
  enken: new BattleActor({ name: 'えんけんさん', spriteSrc: enken }),
};

export const mapEnemies = new Map<string, BattleActor[]>([
  [
    sceneKeys.map1,
    [enemy.slime, enemy.tb1a, enemy.batman, enemy.abTree, enemy.hangedBear],
  ],
  [
    sceneKeys.map2,
    [
      enemy.showerHead,
      enemy.sabagiza,
      enemy.tsuchinoko,
      enemy.bloodScorpion,
      enemy.formerBoss,
    ],
  ],
  [
    sceneKeys.map3,
    [enemy.fishEgg, enemy.konjacJelly, enemy.arrestLock, enemy.entrance, enemy.riverDam],
  ],
  [
    sceneKeys.map4,
    [enemy.cutlery, enemy.friedChiken, enemy.burn, enemy.yakitori, enemy.enken],
  ],
]);

export const getGhost = (): BattleActor => allInitStatus('ghost');

export const getEnemies = (key: string): BattleActor[] => {
  return mapEnemies.get(key) || [getGhost()];
};
