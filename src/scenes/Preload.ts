import { height, width } from 'index';
import { GameObjects, Scene, Types } from 'phaser';

class Preload extends Scene {
  private backgroundColor: string = '#999';

  constructor() {
    super({ key: 'Preload' });
  }

  private fontStyle: Types.GameObjects.Text.TextStyle = {
    color: '#fff',
    fontSize: '70px',
  };

  init = () => {
    console.log('init');
  };

  preload = () => {
    console.log('preload');
  };

  create = () => {
    this.cameras.main.setBackgroundColor(this.backgroundColor);
    const startMessage: GameObjects.Text = this.add.text(
      width / 2,
      height / 2,
      "'Enter' to start",
      this.fontStyle
    );
    startMessage.setOrigin(0.5);

    // Enterキーでが押されたらGameシーンへ遷移
    const enter = this.input.keyboard.addKey('Enter');
    enter.on('down', () => {
      this.scene.start('Game');
    });
  };
}

export { Preload };
