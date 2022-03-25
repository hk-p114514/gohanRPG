import { Scene } from 'phaser';
import { H, W } from 'functions/DOM/windowInfo';
import logo from 'images/kimetsumesi.jpg';
import background from 'images/gotsu.jpg';
import { sceneKeys } from 'scenes/sceneKeys';

export class Title extends Scene {
  private backgroundColor: string = '#336';

  constructor() {
    super({ key: sceneKeys.title });
  }

  preload() {
    this.load.image('logo', logo);
    this.load.image('background', background);
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.cameras.main.setBackgroundColor(this.backgroundColor);

    this.add
      .image(W() / 2, H() / 3, 'logo')
      .setScale(0.8)
      .setOrigin(0.5)

    this.time.addEvent({delay: 5000, callback: () => {this.scene.start(sceneKeys.preload)}, callbackScope: this})
  }
}