import { DialogBox } from './../DialogBox';
import { BattleActor } from 'classes/BattleActor';
import { Scene } from 'phaser';

type Turn = number | 'infinite';

export abstract class State {
  private stateName: string;
  private owner: BattleActor;
  private remainTurn: Turn = 0;
  constructor(owner: BattleActor, stateName: string) {
    this.owner = owner;
    this.stateName = stateName;
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
  public abstract onActivate(): void;

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
