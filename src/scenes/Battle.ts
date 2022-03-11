import { getEnemies, getGhost, playersParty } from 'battleActors';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { GameObjects, Scene, Time } from 'phaser';
import { sceneKeys } from './sceneKeys';

export class Battle extends Scene {
  private players: BattleActor[] = playersParty;
  private enemies: BattleActor[] = getEnemies(system.map);
  private sorted: BattleActor[] = [...this.players, ...this.enemies].sort((a, b) => {
    return b.speed - a.speed;
  });
  private actorIndex: number = 0;
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
      this.scene.stop(sceneKeys.ui);
      this.scene.stop(sceneKeys.battle);
      this.scene.wake(system.map);
    });
  }

  logAllActorHP() {
    console.log('==================');
    this.sorted.forEach((actor) => {
      console.log(`${actor.name} HP: ${actor.hp.current}`);
    });
    console.log('==================');
  }

  addActorIndex() {
    this.actorIndex++;
    this.actorIndex %= this.sorted.length - 1;
  }

  update(time: number, delta: number) {}

  nextTurn() {
    const i = this.actorIndex;
    const actor = this.sorted[i];
    actor.getRandSkill()(actor, this.getEnemyGroup(actor, this.players, this.enemies));
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
