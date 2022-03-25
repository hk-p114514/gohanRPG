import { SkillFunction } from 'skills';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';
import { Scene, Time } from 'phaser';
import { sceneKeys } from './sceneKeys';
import { getEnemies } from 'functions/generalPurpose/getEnemies';
import { cloneDeep } from 'lodash';
import { randArr } from 'functions/generalPurpose/rand';

/*    Spread Syntax
 *    スプレッド構文構文を利用すると、
 *    簡単に配列のコピーや結合ができる。
 *    これは配列そのものへの参照ではなく、新しい配列を作る操作である。
 *    しかし、行われるのは shallow copy(浅いコピー)なので、
 *    配列の中でネストしている場合や中身がオブジェクトの場合は参照を共有することになる。
 * */

export class Battle extends Scene {
  public static readonly availableSkillCount: number = 4;
  private party: BattleActor[] = [...system.party];
  private enemies: BattleActor[] = [];
  private sorted: BattleActor[] = [];
  private index: number = 0;
  timerOneShot?: Time.TimerEvent;
  elapsedTime: number = 0;
  constructor() {
    super({ key: sceneKeys.battle });
  }

  preload() {
    const clone = cloneDeep(getEnemies(system.map));
    this.enemies = clone;
    this.sorted = [...this.party, ...this.enemies].sort((a, b) => {
      return b.speed - a.speed;
    });

    system.isBattle = true;
  }

  create() {
    // UIシーンを起動
    this.scene.launch(sceneKeys.ui, {
      actors: [this.party, this.enemies],
      battleScene: this,
    });

    // バトル開始
    this.nextTurn();
  }

  nextTurn() {
    this.logAllActorHP();
    console.log(`===== ${this.index}ターン目 =====`);
    const actor = this.sorted[this.index];
    actor.state.stateProcess();
    actor.buff.buffProcess();
    if (actor.isDead()) {
      // sortedの中で、actorが死んでいる場合は、それを除く
      this.sorted = this.sorted.filter((a) => a !== actor);
      console.log(`${actor.name}は死んでしまった`);
      this.resultDialog(false, actor.name);
    } else {
      console.log('####################');
      console.log(`${this.index}番目の${actor.name}のターン`);
      console.log('####################');

      // actor.getRandSkill()(actor, enemies);
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

      const endBattle = this.isEndBattle(this.party, this.enemies);
      // endBattleが0でない場合は、ターン終了
      if (endBattle !== 0) {
        system.isBattle = false;
        switch (endBattle) {
          case 1:
            console.log('プレイヤーの勝利');
            this.resultDialog(true);
            break;
          case 2:
          case 3:
            console.log('敵の勝利');
            this.resultDialog(false);
            break;
        }
        // HPが0になった味方はマップに戻るときにHP1にする
        this.party.forEach((actor) => {
          if (actor.isDead()) {
            actor.beHealed(1);
          }
        });
        this.backToMap();
      }

      this.index++;
    }

    this.index = this.index % this.sorted.length;
    this.time.addEvent({ delay: 1000, callback: this.nextTurn, callbackScope: this });
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
        targetEnemy = randArr(
          this.getSurvivors(this.getEnemyGroup(actor, this.party, this.enemies)),
        );
      } else {
        // 現在のキャラクター主観で味方に使う技
        targetEnemy = randArr(
          this.getSurvivors(this.getGroup(actor, [this.party, this.enemies])),
        );
      }
      const beforeHp = targetEnemy.hp.current;
      // スキル実行
      skill.exe(actor, [targetEnemy]);
      const afterHp = targetEnemy.hp.current;
      // ダイアログ表示
      this.drawSkillDamageMessage(
        actor.name,
        skill.getName(),
        true,
        targetEnemy.name,
        Math.abs(beforeHp - afterHp),
      );
    } else {
      // 全体効果
      let targetGroup: BattleActor[] = [];
      if (forEnemy) {
        targetGroup = this.getEnemyGroup(actor, this.party, this.enemies);
      } else {
        targetGroup = this.getGroup(actor, [this.party, this.enemies]);
      }
      skill.exe(actor, targetGroup);
      // ダイアログ表示
      this.drawSkillDamageMessage(actor.name, skill.getName(), false);
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

  // actorNameが指定されている場合、その者が死んだということ
  resultDialog(alive: boolean, actorName?: string) {
    let text: string;
    if (alive) {
      text = `勝利ーーﾂ！！`;
    } else {
      if (actorName) {
        text = `${actorName}は死んでしまったぁ.....`;
      } else {
        text = `敗北...........（笑）`;
      }
    }
    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelinedata: {
        start: [{ type: 'dialog', text: text }, { type: 'endTimeline' }],
      },
    });
  }

  // 「〜(攻撃者)のー(技)！」、「〜(被害者)にーダメージ(回復)！」
  // 攻撃(回復)対象が全員だったら、targetとdamageは指定しない
  drawSkillDamageMessage(
    attacker: string,
    skill: string,
    isDamage: boolean,
    target?: string,
    damage?: number,
  ) {
    let forTarget: string;
    if (isDamage) {
      // 敵への攻撃
      if (target) {
        forTarget = 'forEnemy';
      } else {
        forTarget = 'forEnemies';
      }
    } else {
      // 味方への回復
      if (target) {
        forTarget = 'forPartyMember';
      } else {
        forTarget = 'forParty';
      }
    }

    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelinedata: {
        start: [{ type: 'dialog', text: `....` }, { type: 'endTimeline' }],
        forEnemy: [
          { type: 'dialog', text: `${attacker}の${skill}！` },
          { type: 'dialog', text: `${target}に ${damage} ダメージ！` },
          { type: 'endTimeline' },
        ],
        forPartyMember: [
          { type: 'dialog', text: `${attacker}の${skill}！` },
          { type: 'dialog', text: `${target}を ${damage} 回復！` },
          { type: 'endTimeline' },
        ],
        forEnemies: [
          { type: 'dialog', text: `${attacker}の${skill}！` },
          { type: 'dialog', text: `敵全員を攻撃！` },
          { type: 'endTimeline' },
        ],
        forParty: [
          { type: 'dialog', text: `${attacker}の${skill}！` },
          { type: 'dialog', text: `仲間全員を回復！` },
          { type: 'endTimeline' },
        ],
      },
      specID: forTarget,
    });
  }
}
