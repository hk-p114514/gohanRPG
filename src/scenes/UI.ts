import { sceneKeys } from 'scenes/sceneKeys';
import { GameObjects, Scene } from 'phaser';
export class UI extends Scene {
  private graphics?: GameObjects.Graphics;
  constructor() {
    super({ key: sceneKeys.ui });
  }

  preload() {}

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.graphics = this.add.graphics();
    // 画面下に３つの四角形の枠を描画する
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x31f4c, 1);
    const { height, width } = this.sys.canvas;
    const boxHeight = height / 3;
    const boxWidth = width / 3;
    const boxStartX = 0;
    const boxStartY = height - boxHeight;
    // ボックスと枠を3つ描画する
    for (let i = 0; i < 3; i++) {
      this.graphics.fillRect(boxStartX + boxWidth * i, boxStartY, boxWidth, boxHeight);
      this.graphics.strokeRect(boxStartX + boxWidth * i, boxStartY, boxWidth, boxHeight);
    }
  }

  update(time: number, delta: number) {}
}
