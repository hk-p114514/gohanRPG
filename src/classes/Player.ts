import { GameObjects } from 'phaser';
import { Actor } from './Actor';
class Player extends Actor {
  constructor(spData: GameObjects.Sprite, ActorData: Actor) {
    super(spData, name, hp, mp, level, atk, def);
    var { name, hp, mp, level, atk, def } = ActorData.getActor();
  }
}
