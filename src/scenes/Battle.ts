import { getEnemies, getGhost } from 'battleActors';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { Scene, Time } from 'phaser';
import { sceneKeys } from './sceneKeys';

/*    Spread Syntax
 *    スプレッド構文構文を利用すると、
 *    簡単に配列のコピーや結合ができる。
 *    これは配列そのものへの参照ではなく、新しい配列を作る操作である。
 *    しかし、行われるのは shallow copy(浅いコピー)なので、
 *    配列の中でネストしている場合や中身がオブジェクトの場合は参照を共有することになる。
 * */

export class Battle extends Scene {
  private party: BattleActor[] = [...system.party];
  private enemies: BattleActor[] = getEnemies(system.map);
  private sorted: BattleActor[] = [...this.party, ...this.enemies].sort((a, b) => {
    return b.speed - a.speed;
  });
  private index: number = 0;
  timerOneShot?: Time.TimerEvent;
  elapsedTime: number = 0;
  constructor() {
    super({ key: sceneKeys.battle });
  }

  preload() {}

  create() {
    // UIシーンを起動
    this.scene.launch(sceneKeys.ui);

    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      // UIシーンとバトルシーンを停止してマップシーンを再開(マップシーンはsleepしている)
      this.backToMap();
    });

    // バトル開始
    this.nextTurn();
  }

  backToMap() {
    this.scene.stop(sceneKeys.ui);
    this.scene.stop(sceneKeys.battle);
    this.scene.wake(system.map);
  }

  logAllActorHP() {
    console.log('キャラクターのステータス');
    this.sorted.forEach((actor) => {
      console.log(`${actor.name} HP: ${actor.hp.current}`);
    });
    console.log('------------------------------------');
  }

  nextTurn() {
    this.logAllActorHP();
    const actor = this.sorted[this.index];
    const enemies = this.getEnemyGroup(actor, this.party, this.enemies);
    if (!actor.isDead()) {
      console.log('####################');
      console.log(`this.sorted[${this.index}]の${actor.name}のターン`);
      actor.getRandSkill()(actor, enemies);
      console.log('####################');

      this.logAllActorHP();
      this.index = (this.index + 1) % this.sorted.length;
      const endBattle = this.isEndBattle(this.party, this.enemies);
      if (endBattle === 1) {
        console.log('プレイヤーの勝利');
        this.backToMap();
      } else if (endBattle === 2) {
        console.log('敵の勝利');
        this.backToMap();
      } else if (endBattle === 3) {
        console.log('両者が死んでいる');
        this.backToMap();
      }
    } else {
      this.sorted.splice(this.index, 1);
      if (enemies === this.party) {
        this.enemies.splice(this.enemies.indexOf(actor), 1);
      } else if (enemies === this.enemies) {
        this.party.splice(this.enemies.indexOf(actor), 1);
      }
    }

    this.index = (this.index + 1) % this.sorted.length;
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  getGroupBelongsTo(actor: BattleActor, groups: BattleActor[][]) {
    for (const group of groups) {
      if (group.includes(actor)) {
        return group;
      }
    }
  }

  getEnemyGroup(
    subject: BattleActor,
    group1: BattleActor[],
    group2: BattleActor[],
  ): BattleActor[] {
    if (group1.includes(subject)) {
      return group2;
    } else if (group2.includes(subject)) {
      return group1;
    }

    return [getGhost()];
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
