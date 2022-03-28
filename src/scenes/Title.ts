import { Scene } from 'phaser';
import { H, W } from 'functions/DOM/windowInfo';
import logo from 'images/logo.png';
import { sceneKeys } from 'scenes/sceneKeys';
import { hints } from 'classes/exam';

export class Title extends Scene {
  private backgroundColor: string = '#300000';
  private backgroundColor2: string = '#BDBDFD';
  private span: number = 1;
  private flash: number = 1;

  constructor() {
    super({ key: sceneKeys.title });
  }

  preload() {
    this.load.image('logo', logo);
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.cameras.main.setBackgroundColor(this.backgroundColor);

    this.add
      .image(W() / 2, H() / 2, 'logo')
      .setScale(0.8)
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.scene.start(sceneKeys.preload);
      },
      callbackScope: this,
    });
  }

  // update() {
  //   this.flash++;
  //   if (this.flash % 2 == 0) {
  //     this.cameras.main.setBackgroundColor(this.backgroundColor);
  //   } else {
  //     this.cameras.main.setBackgroundColor(this.backgroundColor2);
  //   }
  // }
}
