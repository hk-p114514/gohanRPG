import { Scene, Types } from 'phaser';

// 各モードの名前
export type ModeName = 'map' | 'battle' | 'menu';

// モードを管理するシーン
export type Mode = {
  key: ModeName;
  controller: Scene;
};

export class GameSystem {
  // 現在のモード
  private current: Mode;

  // 各モードを管理するシーン
  private modeControllers: Mode[];

  // 十字キーの状態
  private key?: Types.Input.Keyboard.CursorKeys;

  constructor(controllers: Mode[], initialMode: Mode = controllers[0]) {
    this.modeControllers = controllers;
    this.current = initialMode;
  }

  // 現在のモードを変更する
  public switchMode(name: ModeName): boolean {
    const mode: Mode | undefined = this.modeControllers.find((mode) => mode.key === name);

    if (mode) {
      this.current = mode;
    }

    return !!mode;
  }

  update(): void {}
}
