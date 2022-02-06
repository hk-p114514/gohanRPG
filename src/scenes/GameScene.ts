import { Scene } from 'phaser';

export class GameScene extends Scene {
  constructor() {
    super({
      active: false,
      visible: false,
      key: 'Game', //
    });
  }
}
