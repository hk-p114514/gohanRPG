import { BattleActor } from 'classes/BattleActor';
import marcSprite from '@/assets/characters/dynamic/marc.png';
import shidenSprite from '@/assets/characters/dynamic/shiden.png';
import poulerSprite from '@/assets/characters/dynamic/pouler.png';
import moughSprite from '@/assets/characters/dynamic/mough.png';
import { marcSkills, moughSkills, poulerSkills, shidenSkills, skills } from 'skills';

// 綴の参照
// http://kotoba.nuee.nagoya-u.ac.jp/sc/tsuduri/
const marc: BattleActor = new BattleActor({
  name: 'マルク',
  spriteSrc: marcSprite,
  atk: 4,
  def: 6,
  speed: 5,
  initSkills: marcSkills,
});

const shiden: BattleActor = new BattleActor({
  name: 'シデン',
  spriteSrc: shidenSprite,
  startLevel: 5,
  atk: 7,
  def: 6,
  speed: 5,
  initSkills: shidenSkills,
});

const pouler: BattleActor = new BattleActor({
  name: 'パウラ',
  spriteSrc: poulerSprite,
  startLevel: 8,
  atk: 4,
  def: 3,
  speed: 7,
  initSkills: poulerSkills,
});

const mough: BattleActor = new BattleActor({
  name: 'マウ',
  spriteSrc: moughSprite,
  startLevel: 11,
  atk: 8,
  def: 10,
  speed: 3,
  initSkills: moughSkills,
});

export { marc, shiden, pouler, mough };
