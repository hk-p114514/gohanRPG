import { Scene, GameObjects, Types } from 'phaser'
import { system } from 'index'
import { H, W } from 'functions/DOM/windowInfo';
import { sceneKeys } from './sceneKeys';

export class GameOver extends Scene {
  private gameOverStyle: Types.GameObjects.Text.TextStyle = {
    color: '#fff', 
    fontSize: '80px' 
  };
  private backgroundColor: string = '#000';
  private retryStyle: Types.GameObjects.Text.TextStyle = {
    color: '#000', 
    fontSize: '60px', 
    backgroundColor: '#f00'
  }

  constructor() {
    super({ key: sceneKeys.gameover });
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.cameras.main.setBackgroundColor(this.backgroundColor);

    const gameOverText: GameObjects.Text = this.add.text(
      W() / 2, 
      H() / 3, 
      'Game Over', 
      this.gameOverStyle
    );
    gameOverText.setOrigin(0.5);

    const retryButton: GameObjects.Text = this.add.text(
      W() / 2, 
      H() / 3 * 2 + H() / 12, 
      'Retry', 
      this.retryStyle
    )
    .setOrigin(0.5)
    .setPadding(100, 16)
    .setInteractive({useHandCursor: true})
    .on(
      'pointerdown', 
      () => {
        system.startMap(this, system.map);
      }
    )
  }
}