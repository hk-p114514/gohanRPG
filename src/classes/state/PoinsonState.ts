import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';
import { State, Turn } from './State';

export class PoisonState extends State {
  private poisonDamage: number;
  constructor(
    owner: BattleActor,
    stateName: string,
    remainTurn: Turn = 0,
    poisonDamage: number = 0,
  ) {
    super(owner, stateName, remainTurn);
    this.poisonDamage = poisonDamage;
  }

  public onTurnStart(): void {
    this.owner.beInjured(this.poisonDamage);
  }
  public onActivate(scene: Scene): void {
    super.onActivate(
      scene,
      `${this.owner.name}は毒で${this.poisonDamage}のダメージを受けた！`,
    );
  }
}
