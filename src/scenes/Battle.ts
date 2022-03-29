import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { Scene, Time } from 'phaser';
import { sceneKeys } from './sceneKeys';
import { getEnemies } from 'functions/generalPurpose/getEnemies';
import { cloneDeep } from 'lodash';
import { randArr, randI } from 'functions/generalPurpose/rand';

/*    Spread Syntax
 *    スプレッド構文構文を利用すると、
 *    簡単に配列のコピーや結合ができる。
 *    これは配列そのものへの参照ではなく、新しい配列を作る操作である。
 *    しかし、行われるのは shallow copy(浅いコピー)なので、
 *    配列の中でネストしている場合や中身がオブジェクトの場合は参照を共有することになる。
 * */

export class Battle extends Scene {
  public static readonly availableSkillCount: number = 4;
  public static readonly maxEnemiesAppearance: number = 3;
  private party: BattleActor[] = [...system.party];
  private enemies: BattleActor[] = [];
  private sorted: BattleActor[] = [];
  private index: number = 0;
  private exp: number = 0;
  private isTurnAttack: boolean = true;
  timerOneShot?: Time.TimerEvent;
  elapsedTime: number = 0;
  constructor() {
    super({ key: sceneKeys.battle });
  }

  init() {
    this.party = [...system.party];
    this.enemies = [];
    this.sorted = [];
    this.index = 0;
    this.exp = 0;
  }

  preload() {
    const clone = cloneDeep(getEnemies(system.map));
    this.enemies = clone;
    // 現在のマップに出て来る可能性のある敵キャラの数
    const len = this.enemies.length;
    const appear = randI(Battle.availableSkillCount - 1);
    const diff = len - appear;
    for (let i = 0; i < diff; i++) {
      const n = randI(len - 1, 0);
      this.enemies.splice(n, 1);
    }

    this.sorted = [...this.party, ...this.enemies].sort((a, b) => {
      return b.speed - a.speed;
    });

    // バトル勝利時にプレイヤー達が獲得する経験値を計算
    const enemyCount = this.enemies.length;
    const enemyLevelAbs = Math.floor(
      this.enemies.reduce((a, b) => a + b.level.current, 0) / enemyCount,
    );
    this.exp = enemyLevelAbs * enemyCount;

    system.isBattle = true;
  }

  create() {
    this.isTurnAttack = true;

    // UIシーンを起動
    this.scene.launch(sceneKeys.ui, {
      actors: [this.party, this.enemies],
      battleScene: this,
    });

    // バトル開始
    this.nextTurn();
  }

  // 2往復で1ターン：1往復目->攻撃、回復等 例：「〜の〜攻撃」「〜に〜ダメージ」
  //               ：2往復目-> 状態異常 例：「どくで〜ダメージ」
  nextTurn() {
    this.logAllActorHP();
    console.log(`===== ${this.index}ターン目 =====`);
    const actor = this.sorted[this.index];
    if (!this.isTurnAttack) {
      actor.state.stateProcess(this);
      actor.buff.buffProcess();
      this.isTurnAttack = true;
    } else {
      if (actor.isDead()) {
        // sortedの中で、actorが死んでいる場合は、それを除く
        this.sorted = this.sorted.filter((a) => a !== actor);
        console.log(`${actor.name}は死んでしまった`);
        this.resultDialog('dead', actor);
      } else {
        // バトルが終わっていないか確認
        const endBattle = this.isEndBattle(this.party, this.enemies);
        // endBattleが0でない場合は、ターン終了
        if (endBattle !== 0) {
          system.isBattle = false;
          switch (endBattle) {
            case 1:
              console.log('プレイヤーの勝利');
              // this.resultDialog('win');
              const levelUps = this.giveExpPlayers();
              this.levelUpDialog(levelUps);
              this.backToMap();
              break;
            case 2:
            case 3:
              console.log('敵の勝利');
              this.resultDialog('lose');
              this.scene.stop(sceneKeys.ui);
              // start --> shutdown this.scene & start scene of key
              this.scene.start(sceneKeys.gameover);
              break;
          }
          // HPが0になった味方はマップに戻るときにHP1にする
          this.party.forEach((actor) => {
            if (actor.isDead()) {
              actor.beHealed(1);
            }
          });
          return;
        }
        console.log('####################');
        console.log(`${this.index}番目の${actor.name}のターン`);
        console.log('####################');

        // actor.getRandSkill()(actor, enemies);
        // actorの攻撃
        if (actor.state.getPossible()) {
          if (this.party.includes(actor)) {
            // 該当のキャラクターがプレイヤー側なら、
            // 使う技をプレイヤーに選択させる
            // プレイヤーが技を選択するまで待つ
            this.scene.pause();
            system.setActor(actor);
          } else {
            system.battling = undefined;
            // 該当のキャラクターが敵側なら、
            // ランダムに技を選択する
            this.actorAction(actor);
          }
        }

        this.index++;
      }
      this.isTurnAttack = false;
    }

    this.index = this.index % this.sorted.length;
    this.time.addEvent({ delay: 800, callback: this.nextTurn, callbackScope: this });
  }

  actorAction(actor: BattleActor): void {
    const skill = actor.getRandSkill();
    const { forAllTargets, forEnemy } = skill.getSkillInfo();
    console.log(`${actor.name}の${skill.getName()}!!`);
    if (!forAllTargets) {
      // 単体効果
      let targetEnemy: BattleActor;
      if (forEnemy) {
        // 現在のキャラクター主観で敵に使う技
        // 挑発しているキャラクターがいたら、対象を変更する
        const provocations = actor.state.getProvocationActors(
          this.getSurvivors(this.party),
        );
        if (provocations.length > 0) {
          targetEnemy = randArr(provocations);
        } else {
          targetEnemy = randArr(
            this.getSurvivors(this.getEnemyGroup(actor, this.party, this.enemies)),
          );
        }
      } else {
        // 現在のキャラクター主観で味方に使う技
        targetEnemy = randArr(
          this.getSurvivors(this.getGroup(actor, [this.party, this.enemies])),
        );
      }
      // スキル実行 & ダイアログ表示
      skill.exe(this, actor, [targetEnemy]);
    } else {
      // 全体効果
      let targetGroup: BattleActor[] = [];
      if (forEnemy) {
        targetGroup = this.getEnemyGroup(actor, this.party, this.enemies);
      } else {
        targetGroup = this.getGroup(actor, [this.party, this.enemies]);
      }
      // スキル実行 & ダイアログ表示
      skill.exe(this, actor, targetGroup);
    }
  }

  /**
   * @brief もといたマップシーンに戻る
   *
   * @return void
   */
  backToMap() {
    this.scene.stop(sceneKeys.ui);
    this.scene.stop(sceneKeys.battle);
    this.scene.wake(system.map);
  }

  /**
   * @brief 全キャラクターのHPを表示する
   *
   * @return void
   */
  logAllActorHP() {
    console.log('キャラクターのステータス');
    console.log('------------------------------------');
    this.sorted.forEach((actor) => {
      console.log(`${actor.name} HP: ${actor.hp.current}`);
    });
    console.log('------------------------------------');
  }

  /**
   * @brief キャラクターの所属するグループを返す
   *
   * @param BattleActor キャラクター
   * @param BattleActor[][] 検索したいグループ
   *
   * @return BattleActor[] 所属するグループ
   */
  getGroup(actor: BattleActor, groups: BattleActor[][]): BattleActor[] {
    for (const group of groups) {
      if (group.includes(actor)) {
        return group;
      }
    }

    return [];
  }

  /**
   * @brief キャラクターの敵グループを返す
   *
   * @param BattleActor キャラクター
   * @param BattleActor[][] 検索したいグループ
   *
   * @return BattleActor[] 敵グループ
   */
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

    return [];
  }

  /**
   * @brief キャラクターの配列から、現在生きている（バトル可能な）
   *        キャラクターのみを集め、新たな配列として返す
   *
   * @param BattleActor[]   生存者を探索する元データ
   *
   * @returns BattleActor[] 生存者のみを集めた配列
   */
  getSurvivors(actors: BattleActor[]): BattleActor[] {
    return actors.filter((actor) => !actor.isDead());
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

  /**
   * @brief キャラクターのHPの合計値を返す
   *
   * @param actors キャラクターの配列
   * @returns HPの合計値
   */
  getSumHp(actors: BattleActor[]): number {
    return actors
      .map((actor) => actor.hp.current)
      .reduce((sum, current) => sum + current);
  }

  // situationにどんなダイアログを出すか、actorに死者を渡す
  resultDialog(situation: string, actor?: BattleActor): void {
    let text: string = '';
    if (situation === 'dead') {
      if (!actor) return;
      if (this.party.includes(actor)) {
        text = `${actor.name}は死んでしまった...`;
      } else {
        text = `${actor.name}は倒れた！`;
      }
    }
    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelinedata: {
        win: [{ type: 'dialog', text: `敵の殲滅に成功！` }, { type: 'endTimeline' }],
        lose: [{ type: 'dialog', text: `仲間が全滅した....` }, { type: 'endTimeline' }],
        dead: [{ type: 'dialog', text: text }, { type: 'endTimeline' }],
      },
      specID: situation,
    });
  }

  /**
   * @brief プレイヤーがバトルに勝利したとき、
   *        プレイヤーパーティー全員に経験値を加算する
   *
   * @returns レベルアップしたキャラクター
   */
  giveExpPlayers(): BattleActor[] {
    return this.party.filter((actor) => actor.addExp(this.exp));
  }

  levelUpDialog(actors: BattleActor[]): void {
    const timeLines = actors.map((actor) => {
      return {
        type: 'dialog',
        text: `${actor.name}はレベル${actor.level.current}になった！\n次のレベルまでに必要な経験値→${actor.level.toNext}`,
      };
    });

    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelinedata: {
        start: [...timeLines, { type: 'endTimeline' }],
      },
    });
  }
}
