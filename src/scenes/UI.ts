import { system } from 'index';
import { sceneKeys } from 'scenes/sceneKeys';
import { GameObjects, Scene, Types } from 'phaser';
import { BattleActor } from 'classes/BattleActor';

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
  private party: BattleActor[] = [];
  private enemies: BattleActor[] = [];
  private units: Unit[] = [];
  private hpBar = { width: 100, height: 10, margin: 20 };
  private menu = {
    boxCount: 3,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };
  constructor() {
    super({ key: sceneKeys.ui });
  }

  init(data: BattleActor[][]) {
    // 配列をそのまま代入しているので、参照先が同じになる。
    // そのため、バトルシーンでキャラクターが死んで配列に変更があった場合、
    // UIシーンでは配列に何もしなくても変更後の配列を操作できる
    this.party = data[0];
    this.enemies = data[1];

    const { height, width } = this.sys.canvas;
    const boxCount = 3;
    const boxHeight = height / 2.5;

    this.menu = {
      x: 0,
      y: height - boxHeight,
      height: boxHeight,
      width: width / boxCount,
      boxCount: boxCount,
    };
  }

  preload() {
    // 敵キャラクターのスプライト画像を読み込む(enemies[n].spriteSrc)
    this.enemies.forEach((enemy) => {
      this.load.image(enemy.name, enemy.spriteSrc);
    });
  }

  create() {
    // 背景色を黒に変更
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)');
    const { height } = this.game.canvas;
    const boxCount = this.menu.boxCount;
    const boxHeight = this.menu.height;
    const boxWidth = this.menu.width;

    const boxStartX = this.menu.x;
    const boxStartY = this.menu.y;

    // ボックスと枠を3つ描画する
    for (let i = 0; i < boxCount; i++) {
      this.drawBox(boxStartX + boxWidth * i, boxStartY, boxWidth, boxHeight);
    }

    // 敵キャラクターを表示
    this.drawActors(boxHeight);
  }

  update(time: number, delta: number) {
    this.redrawActor();
    // 左のボックスに操作対象のキャラクターのデータを表示する
    this.drawPlayerData();
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
    const actor = system.isBattling?.actor;
    if (actor) {
      const style: Types.GameObjects.Text.TextStyle = {
        fontSize: '20px',
        color: '#ffffff',
      };
      let { x, y } = this.menu;
      const { current, max } = actor.hp;
      const { current: mp, max: mpMax } = actor.mp;
      const margin = 30;
      const data: string[] = [
        `${actor.name}`,
        `HP_: ${current}/${max}`,
        `MP_: ${mp}/${mpMax}`,
        `ATK: ${actor.atk}`,
        `DEF: ${actor.def}`,
        `SPD: ${actor.speed}`,
      ];

      data.forEach((text, i) => {
        this.add.text(x + margin, y + margin, text, style);
        y += margin;
      });
    }
  }
}
