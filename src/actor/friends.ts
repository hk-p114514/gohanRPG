import marcSprite from '../../public/assets/characters/dynamic/marc.png';
import shidenSprite from '../../public/assets/characters/dynamic/shiden.png';
import poulerSprite from '../../public/assets/characters/dynamic/pouler.png';
import moughSprite from '../../public/assets/characters/dynamic/mough.png';
import { BattleActor } from '../classes/BattleActor';
import {
  marcSkills,
  shidenSkills,
  poulerSkills,
  moughSkills,
} from '../skillsFunction/skills';

// 綴の参照
// http://kotoba.nuee.nagoya-u.ac.jp/sc/tsuduri/
const marc: BattleActor = new BattleActor({
  name: 'マルク',
  spriteSrc: marcSprite,
  hp: { current: 7, max: 7 },
  atk: 5,
  def: 7,
  speed: 6,
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

const administrator: BattleActor = new BattleActor({
  name: 'Administrator',
  startLevel: 99,
  atk: 100,
  def: 100100,
  speed: 100,
  initSkills: [...marcSkills, ...shidenSkills, ...poulerSkills, ...moughSkills],
});

export { marc, shiden, pouler, mough, administrator };
