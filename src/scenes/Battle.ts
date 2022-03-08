import { getEnemies, playersParty } from 'battleActors';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { Scene } from 'phaser';

export class Battle extends Scene {
  private players: BattleActor[];
  private enemies: BattleActor[];
  private sorted: BattleActor[];
  constructor() {
    super({ key: 'battle' });
    this.players = playersParty;
    this.enemies = getEnemies(system.map);
    // playersとenemiesを.speedでソート(降順)し、sortedに入れる
    this.sorted = [...this.players, ...this.enemies].sort((a, b) => {
      return b.speed - a.speed;
    });
  }

  preload() {}

  create() {}

  update() {
    /**
     * バトルのループ
     * 1.敵味方のどちらかのHPが0になっていれば元いたマップに戻る
     * 2.ソートした配列の先頭からplayersかenemiesかどちらに属するかを判定
     * 3.属していない方の配列を対象に攻撃をする
     * 4.1へ戻る
     */
    const isEnd = this.isEndBattle(this.players, this.enemies);
    switch (isEnd) {
      case 1:
        console.log('WIN');
      case 2:
        console.log('LOSE');
      case 3:
        this.scene.wake(system.map);
        break;
    }

    for (const actor of this.sorted) {
    }
  }

  getGroupBelongsTo(actor: BattleActor, groups: BattleActor[][]) {
    return groups.map((group) => {
      if (group.includes(actor)) {
        return group;
      }
    });
  }

  /**
   * @brief バトルが終了したかどうかを判定する
   *
   * @param BattleActor[]   バトルをしているキャラクターの配列
   * @param BattleActor[]   対戦相手のキャラクター配列
   *
   * @return  まだ終了していない: 0
   *          actors1側の勝利で終了: 1
   *          actors2側の勝利で終了: 2
   *          両方死んでいる: 3
   */
  isEndBattle(actors1: BattleActor[], actors2: BattleActor[]): number {
    const hp1: number = this.getSumHp(actors1);
    const hp2: number = this.getSumHp(actors2);

    if (hp1 <= 0 && hp2 <= 0) {
      return 3;
    } else if (hp1 <= 0 && hp2 > 0) {
      return 2;
    } else if (hp1 > 0 && hp2 <= 0) {
      return 1;
    }
    return 0;
  }

  getSumHp(actors: BattleActor[]): number {
    return actors
      .map((actor) => actor.hp.current)
      .reduce((sum, current) => sum + current);
  }
}
