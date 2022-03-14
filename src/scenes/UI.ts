import { sceneKeys } from 'scenes/sceneKeys';
import { GameObjects, Scene } from 'phaser';
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
  private enemies: BattleActor[] = [];
  private units: Unit[] = [];
  private hpBar = { width: 100, height: 10, margin: 20 };
  constructor() {
    super({ key: sceneKeys.ui });
  }

  init(data: BattleActor[]) {
    this.enemies = data;
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

    const { height, width } = this.sys.canvas;
    const boxHeight = height / 2.5;
    const boxCount = 3;
    const boxWidth = width / boxCount;
    const boxStartX = 0;
    const boxStartY = height - boxHeight;

    // ボックスと枠を3つ描画する
    for (let i = 0; i < boxCount; i++) {
      this.drawBox(boxStartX + boxWidth * i, boxStartY, boxWidth, boxHeight);
    }

    // 敵キャラクターを表示
    this.drawActors(boxHeight);
  }

  update(time: number, delta: number) {
    this.redrawActor();
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
        hpBar.fillRect(x - margin, y - margin, width, height);
        this.units.push({ enemy: enemy, sprite: { sprite, hpBar } });
      }
    });
  }

  redrawActor(fill: number = 0x00ff00): void {
    this.units.forEach((unit) => {
      if (unit.enemy.isDead()) {
        unit.sprite.sprite.destroy();
        unit.sprite.hpBar.destroy();
      } else {
        // 敵キャラクターのHPバーを更新する
        unit.sprite.hpBar.clear();
        unit.sprite.hpBar.fillStyle(fill, 1);
        const { height, width, margin } = this.hpBar;
        unit.sprite.hpBar.fillRect(
          unit.sprite.sprite.x - margin,
          unit.sprite.sprite.y - margin,
          (width * unit.enemy.hp.current) / unit.enemy.hp.max,
          height,
        );
      }
    });
  }
}
