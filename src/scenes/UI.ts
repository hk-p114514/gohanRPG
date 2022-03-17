import { system } from 'index';
import { sceneKeys } from 'scenes/sceneKeys';
import { GameObjects, Scene, Types } from 'phaser';
import { BattleActor } from 'classes/BattleActor';
import { Skill } from 'classes/Skill';

type EnemySprite = {
  sprite: GameObjects.Sprite;
  hpBar: GameObjects.Graphics;
};

type Unit = {
  enemy: BattleActor;
  sprite: EnemySprite;
};

class SkillMenu {
  private target: BattleActor;
  private skills: Skill[];
  private select: Skill;
  private index: number = 0;
  public isDecided: boolean = false;
  constructor(target: BattleActor) {
    this.target = target;
    this.skills = this.target.skills;
    this.select = this.target.skills[this.index];
  }

  selectPrevious() {
    if (this.index < 0) {
      this.index = 0;
    } else if (this.index > this.skills.length - 1) {
      this.index = this.skills.length - 1;
    } else {
      this.index--;
    }
    this.select = this.skills[this.index];
  }

  selectNext() {
    if (this.index < 0) {
      this.index = 0;
    } else if (this.index >= this.skills.length - 1) {
      this.index = this.skills.length - 1;
    } else {
      this.index++;
    }
    this.select = this.skills[this.index];
  }

  getCurrent() {
    return this.select;
  }

  getSkills() {
    return this.skills;
  }

  getIndex() {
    return this.index;
  }

  toggleDecided() {
    this.isDecided != this.isDecided;
  }
}

export class UI extends Scene {
  private graphics?: GameObjects.Graphics;
  private party: BattleActor[] = [];
  private enemies: BattleActor[] = [];
  private units: Unit[] = [];
  private hpBar = { width: 100, height: 10, margin: 20 };
  private fontStyle = {
    fontSize: '20px',
    color: '#ffffff',
  };
  private skillText?: GameObjects.Text;
  private boxMargin: number = 30;
  private menuUI = {
    boxCount: 3,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  };
  private menu?: SkillMenu;

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

    this.menuUI = {
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
    // キー入力イベントを設定する
    this.input.keyboard.on('keydown', this.onKeyInput, this);
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
  }

  update(time: number, delta: number) {
    this.redrawActor();
    // 左のボックスに操作対象のキャラクターのデータを表示する
    this.drawPlayerData();
    const actor = system.battling?.actor;
    if (!actor) return;
    if (system.isBattle && !this.menu) {
      this.menu = new SkillMenu(actor);
    } else if (!system.isBattle && !!this.menu) {
      this.menu = undefined;
    }
    // menuに入っているキャラクターの技を全て中央のボックスに表示する
    this.drawSkills();
    console.log(`isDecided : ${this.menu?.isDecided}`);
    if (this.menu?.isDecided) {
      // 技決定後
      // 右のボックスに効果対象のキャラクターを表示する
      this.menu.getCurrent().exe(actor, this.enemies);
      this.menu.isDecided = false;
      this.scene.run(sceneKeys.battle);
    }
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
    const actor = system.battling?.actor;
    if (actor) {
      let { x, y } = this.menuUI;
      const { current, max } = actor.hp;
      const { current: mp, max: mpMax } = actor.mp;
      const margin = this.boxMargin;
      const data: string[] = [
        `${actor.name}`,
        `HP_: ${current}/${max}`,
        `MP_: ${mp}/${mpMax}`,
        `ATK: ${actor.atk}`,
        `DEF: ${actor.def}`,
        `SPD: ${actor.speed}`,
      ];

      data.forEach((text) => {
        this.add.text(x + margin, y + margin, text, this.fontStyle);
        y += margin;
      });
    }
  }

  drawSkills(): void {
    if (!system.isBattle) return;
    // 中央のボックスに操作対象のキャラクターの技を全て表示
    const skills = this.menu?.getSkills();
    if (skills) {
      let { x, y, width } = this.menuUI;
      x += width;
      const margin = this.boxMargin;
      skills.forEach((skill, i) => {
        let color = 'white';
        const index = this.menu?.getIndex();

        if (i == index) {
          color = 'yellow';
        }

        this.add.text(x + margin, y + margin, `${skill.getName()}`, {
          ...this.fontStyle,
          color: color,
        });
        y += margin;
      });
    }
  }

  onKeyInput(event: KeyboardEvent): void {
    const { key } = event;
    if (key === 'ArrowUp') {
      this.menu?.selectPrevious();
    } else if (key === 'ArrowDown') {
      this.menu?.selectNext();
    } else if (key === 'Enter') {
      if (this.menu) {
        this.menu.isDecided = true;
      }
    }
  }
}
