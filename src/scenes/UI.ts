import { system } from 'index';
import { sceneKeys } from 'scenes/sceneKeys';
import { GameObjects, Scene } from 'phaser';
import { BattleActor } from 'classes/BattleActor';
import { Battle } from './Battle';
import { Skill } from 'classes/Skill';
import { randArr } from 'functions/generalPurpose/rand';

type EnemySprite = {
  sprite: GameObjects.Sprite;
  hpBar: GameObjects.Graphics;
};

type Unit = {
  enemy: BattleActor;
  sprite: EnemySprite;
};

export class UI extends Scene {
  private graphics?: GameObjects.Graphics;
  private playerData: string[] = [`name`, `hp/max`, `mp/max`, `atk`, `def`, `spd`];
  private playerTexts: GameObjects.Text[] = [];
  private playerSkills: GameObjects.Text[] = [];
  private targetActors: Phaser.GameObjects.Text[] = [];
  private playerShowUi?: BattleActor = system.battling?.actor;
  private isTurnActor: boolean = true;
  private battleScene?: Scene;
  private party: BattleActor[] = [];
  private enemies: BattleActor[] = [];
  private units: Unit[] = [];
  private hpBar = { width: 100, height: 10, margin: 20 };
  private fontStyle = {
    fontSize: '20px',
    color: '#ffffff',
  };
  private boxMargin: number = 30;
  private menuUI = {
    boxCount: 3,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };

  constructor() {
    super({ key: sceneKeys.ui });
  }

  init(data: { actors: BattleActor[][]; battleScene: Scene }) {
    this.playerTexts = [];
    this.playerSkills = [];
    this.targetActors = [];
    this.isTurnActor = true;
    // 配列をそのまま代入しているので、参照先が同じになる。
    // そのため、バトルシーンでキャラクターが死んで配列に変更があった場合、
    // UIシーンでは配列に何もしなくても変更後の配列を操作できる
    this.party = data.actors[0];
    this.enemies = data.actors[1];
    this.battleScene = data.battleScene;

    const { height, width } = this.sys.canvas;
    const boxCount = 3;
    const boxHeight = height / 2.5;

    this.menuUI = {
      x: 0,
      y: height - boxHeight,
      height: boxHeight,
      width: width / boxCount,
      boxCount: boxCount,
    };
  }

  preload() {
    console.log('START UI SCENE');

    // 敵キャラクターのスプライト画像を読み込む(enemies[n].spriteSrc)
    this.enemies.forEach((enemy) => {
      this.load.image(enemy.name, enemy.spriteSrc);
    });
  }

  create() {
    // 背景色を黒に変更
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)');
    const { height } = this.game.canvas;
    const boxCount = this.menuUI.boxCount;
    const boxHeight = this.menuUI.height;
    const boxWidth = this.menuUI.width;

    const boxStartX = this.menuUI.x;
    const boxStartY = this.menuUI.y;

    // ボックスと枠を3つ描画する
    for (let i = 0; i < boxCount; i++) {
      this.drawBox(boxStartX + boxWidth * i, boxStartY, boxWidth, boxHeight);
    }

    // 敵キャラクターを表示
    this.drawActors(boxHeight);

    // プレイヤーキャラクターのデータを表示するテキストを作成する
    let { x, y } = this.menuUI;
    const margin = this.boxMargin;
    this.playerData.forEach((data) => {
      const text = this.add.text(x + margin, y + margin, data, this.fontStyle);
      this.playerTexts.push(text);
      y += margin;
    });
  }

  update(time: number, delta: number) {
    this.redrawActor();

    // 左のボックスに操作対象のキャラクターのデータを表示する
    this.drawPlayerData();

    // 真ん中のボックスにプレイヤーの技、右のボックスに攻撃対象を表示する
    this.drawPlayerAttack();

    const actor = system.battling?.actor;
    if (!actor) return;
  }

  drawBox(
    x: number,
    y: number,
    width: number,
    height: number,
    { line = 0xffffff, fill = 0x31f4c } = {},
  ): void {
    this.graphics = this.add.graphics();
    // 画面下に３つの四角形の枠を描画する
    this.graphics.lineStyle(1, line);
    this.graphics.fillStyle(fill, 1);

    this.graphics.fillRect(x, y, width, height);
    this.graphics.strokeRect(x, y, width, height);
  }

  drawActors(marginBottom: number): void {
    const { height, width } = this.game.canvas;
    const enemyCount = this.enemies.length;
    this.enemies.forEach((enemy, i) => {
      const x = (width * (i + 1)) / (enemyCount + 1);
      const y = (height - marginBottom) / 2;
      const sprite = this.add.sprite(x, y, enemy.name);
      sprite.setOrigin(0.5, 0.5);
      sprite.setScale(0.5);
      // 敵キャラクターのHPバーを描画する
      {
        const hpBar = this.add.graphics();
        hpBar.fillStyle(0xff0000, 1);
        const { width, height, margin } = this.hpBar;
        hpBar.fillRect(x - margin, y, width, height);
        this.units.push({ enemy: enemy, sprite: { sprite, hpBar } });
      }
    });
  }

  redrawActor(fill: number = 0x00ff00, line: number = 0x0000ff): void {
    this.units.forEach((unit) => {
      if (unit.enemy.isDead()) {
        unit.sprite.sprite.destroy();
        unit.sprite.hpBar.destroy();
      } else {
        // 敵キャラクターのHPバーを更新する
        unit.sprite.hpBar.clear();
        unit.sprite.hpBar.fillStyle(fill, 1);
        const { height, width, margin } = this.hpBar;
        const x = unit.sprite.sprite.x - margin;
        const y = unit.sprite.sprite.y;
        unit.sprite.hpBar.fillRect(
          x,
          y,
          (width * unit.enemy.hp.current) / unit.enemy.hp.max,
          height,
        );
        // 青色で枠を描画する
        unit.sprite.hpBar.lineStyle(2, line);
        unit.sprite.hpBar.strokeRect(x, y, width, height);
      }
    });
  }

  drawPlayerData(): void {
    // 作ったボックスの一番左に操作対象のキャラクターのステータスを表示する
    if (this.playerShowUi) {
      const { current, max } = this.playerShowUi.hp;
      const { current: mp, max: mpMax } = this.playerShowUi.mp;
      const data: string[] = [
        `${this.playerShowUi.name}`,
        `HP_: ${current}/${max}`,
        `MP_: ${mp}/${mpMax}`,
        `ATK: ${this.playerShowUi.atk}`,
        `DEF: ${this.playerShowUi.def}`,
      ];

      // playerTextsの中身を更新する
      this.playerTexts.forEach((text, i) => {
        text.setText(data[i]);
      });
    }
  }

  drawPlayerAttack() {
    const actor = system.battling?.actor;
    const { x, y } = this.menuUI;
    const margin = this.boxMargin;
    const boxWidth = this.menuUI.width;
    const boxHeight = this.menuUI.height;
    const textPadding = { left: 20, top: 5, right: 20, bottom: 5 };
    if (this.playerShowUi !== actor) {
      this.isTurnActor = true;
    }
    if (actor && this.isTurnActor) {
      let playerSkillX = x + margin + boxWidth * 1 - textPadding.left;
      let playerSkillY = y + margin - textPadding.top;
      const skills = new Set<Skill>();
      if (Battle.availableSkillCount < actor.skills.length) {
        // 技の候補が沢山ありすぎる -> 抽選
        while (skills.size < Battle.availableSkillCount) {
          skills.add(randArr(actor.skills));
        }
      } else {
        // 候補がそんなにない -> 全部出す
        actor.skills.forEach((skill) => {
          skills.add(skill);
        });
      }

      actor.skills.forEach((skill) => {
        const skillText = this.add
          .text(playerSkillX, playerSkillY, skill.getName(), this.fontStyle)
          .setInteractive({
            useHandCursor: true,
          })
          .setPadding(textPadding);
        skillText.on('pointerdown', () => {
          this.targetActors.forEach((text) => {
            text.destroy();
          });
          const { forAllTargets, forEnemy } = skill.getSkillInfo();
          // バトルシーンの関数を使うため↓
          const battleScene = this.scene.get(sceneKeys.battle) as Battle;
          if (!forAllTargets) {
            // 単体効果
            let targetActorX = x + margin + boxWidth * 2 - textPadding.left;
            let targetActorY = y + margin - textPadding.top;
            let targetGroup: BattleActor[];
            // 対象のグループを格納
            if (forEnemy) {
              targetGroup = this.enemies;
            } else {
              targetGroup = this.party;
            }
            targetGroup.forEach((member) => {
              // hpが0だと攻撃不可能。ただし味方の場合、hpが0でも「蘇生なら」可能、
              if (member.hp.current === 0) return;
              const targetText = this.add
                .text(targetActorX, targetActorY, member.name, this.fontStyle)
                .setInteractive({
                  useHandCursor: true,
                })
                .setPadding(textPadding);
              targetText.on('pointerdown', () => {
                // 攻撃対象のテキストの削除
                this.targetActors.forEach((text) => {
                  text.destroy();
                });
                // スキルのテキストの削除
                this.playerSkills.forEach((text) => {
                  text.destroy();
                });
                const beforeHp: number = member.hp.current;
                // スキルの実行
                skill.exe(actor, [member]);
                const afterHp: number = member.hp.current;
                battleScene.drawSkillDamageMessage(
                  actor.name,
                  skill.getName(),
                  forAllTargets,
                  forEnemy,
                  member.name,
                  Math.abs(beforeHp - afterHp),
                );
                // バトルシーンを再開させる
                this.battleScene?.scene.resume();
              });
              targetText.on('pointerover', () => {
                targetText.setFill('#ff0000');
              });
              targetText.on('pointerout', () => {
                targetText.setFill('#ffffff');
              });
              this.targetActors.push(targetText);
              targetActorY += margin;
            });
          } else {
            // 全体効果
            if (forEnemy) {
              skill.exe(actor, this.enemies);
            } else {
              skill.exe(actor, this.party);
            }
            battleScene.drawSkillDamageMessage(
              actor.name,
              skill.getName(),
              forAllTargets,
              forEnemy,
            );
            // スキルのテキストの削除
            this.playerSkills.forEach((text) => {
              text.destroy();
            });
            // バトルシーンを再開させる
            this.battleScene?.scene.resume();
          }
        });
        // マウスオーバーで色が変わるように設定
        skillText.on('pointerover', () => {
          skillText.setFill('#ff0000');
        });
        skillText.on('pointerout', () => {
          skillText.setFill('#ffffff');
        });
        this.playerSkills.push(skillText);
        playerSkillY += margin;
      });
      this.playerShowUi = actor;
      this.isTurnActor = false;
    }
  }
}
