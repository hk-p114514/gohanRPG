import { enemies, getEnemies, players } from 'battleActors';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { Scene } from 'phaser';

export class Battle extends Scene {
  private players: BattleActor[];
  private enemies: BattleActor[];
  private sorted: BattleActor[];
  constructor() {
    super({ key: 'battle' });
    this.players = players;
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
     * 3.属していない方の配列からランダムに1人を選択し、その一人に対して攻撃を行う
     * 4.1へ戻る
     */
  }
}
