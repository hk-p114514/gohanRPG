import { BattleActor } from 'classes/BattleActor';
import marcSprite from '@/assets/characters/dynamic/marc.png';
import shidenSprite from '@/assets/characters/dynamic/shiden.png';
import poulerSprite from '@/assets/characters/dynamic/pouler.png';
import moughSprite from '@/assets/characters/dynamic/mough.png';
import { skills } from 'skills';

// 綴の参照
// http://kotoba.nuee.nagoya-u.ac.jp/sc/tsuduri/
const marc: BattleActor = new BattleActor({
  name: 'マルク',
  spriteSrc: marcSprite,
  atk: 4,
  def: 6,
  speed: 5,
  initSkills: [skills[0], skills[2]],
});

const shiden: BattleActor = new BattleActor({
  name: 'シデン',
  spriteSrc: shidenSprite,
  startLevel: 5,
  atk: 7,
  def: 6,
  speed: 5,
  initSkills: [skills[1]],
});

const pouler: BattleActor = new BattleActor({
  name: 'パウラ',
  spriteSrc: poulerSprite,
  startLevel: 8,
  atk: 4,
  def: 3,
  speed: 7,
  initSkills: [skills[3]],
});

const mough: BattleActor = new BattleActor({
  name: 'マウ',
  spriteSrc: moughSprite,
  startLevel: 11,
  atk: 8,
  def: 10,
  speed: 3,
});

export { marc, shiden, pouler, mough };
