import { DialogBox } from './../DialogBox';
import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';

export type Turn = number | 'infinite';

export abstract class State {
  public readonly owner: BattleActor;

  private stateName: string;
  private remainTurn: Turn = 0;
  constructor(owner: BattleActor, stateName: string, remainTurn: Turn = 0) {
    this.owner = owner;
    this.stateName = stateName;
    this.remainTurn = remainTurn;
  }

  /**
   * @brief 状態異常を持つキャラクターのターンが開始された時に呼ばれる
   *
   * @return なし
   */
  public abstract onTurnStart(): void;

  /**
   * @brief 状態異常が発動した時に呼ばれる
   *
   * @return なし
   */
  public onActivate(scene: Scene, message: string): void {
    DialogBox.SimpleDialog(scene, message);
  }

  /**
   * @brief 状態異常が解除された時に呼ばれる
   *
   * @return なし
   */
  public onReleased(scene: Scene): void {
    DialogBox.SimpleDialog(
      scene,
      `${this.owner.name}の${this.stateName}状態が解除された！`,
    );
  }
}
