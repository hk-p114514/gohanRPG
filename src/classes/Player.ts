import { characterSize } from './../index';
import { GameObjects } from 'phaser';
import { Actor } from './Actor';

export class Player extends Actor {
  constructor(spData: GameObjects.Sprite, ActorData: Actor) {
    super(spData, name, hp, mp, level, atk, def, characterSize);
    var { name, hp, mp, level, atk, def } = ActorData.getActor();
  }

  public setAnim = () => {
    for (const anim of this.anims) {
    }
  };
}
