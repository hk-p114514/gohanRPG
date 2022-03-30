import { GameObjects, Scene } from 'phaser';
import { H, W } from 'functions/DOM/windowInfo';
import { sceneKeys } from 'scenes/sceneKeys';
import { hints } from 'classes/exam';
import logo from 'images/logo.png';
import button from '@/images/button.png';
import buttonOnHover from '@/images/button_onhover.png';

export class Title extends Scene {
  private backgroundColor: string = '#300000';
  private backgroundColor2: string = '#BDBDFD';
  private span: number = 1;
  private flash: number = 1;
  private button?: GameObjects.Image;

  constructor() {
    super({ key: sceneKeys.title });
  }

  preload() {
    this.load.image('logo', logo);
    this.load.image('button', button);
    this.load.image('button_onhover', buttonOnHover);
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    const { height, width } = this.sys.game.canvas;

    this.cameras.main.setBackgroundColor(this.backgroundColor);

    this.add
      .image(W() / 2, H() / 2, 'logo')
      .setScale(0.8)
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 3000,
      callback: () => {
        // this.add.rectangle(0, height - height / 2, width * 10, height, 0x000);
        this.add.rectangle(0, height, width * 2, 150, 0x000);
        // 座標の中心を指定
        this.button = this.add.image(0, 0, 'button');
        this.button.setPosition(
          width - this.button.width,
          height - this.button.height / 2,
        );
        this.button?.setInteractive();
        // ボタンにカーソルが乗った時
        this.button?.on('pointerover', () => {
          this.button?.setTexture('button_onhover');
        });

        // カーソルがボタンから離れた時
        this.button?.on('pointerout', () => {
          this.button?.setTexture('button');
        });

        // クリックした時
        this.button?.on('pointerdown', () => {
          this.scene.start(sceneKeys.map0);
        });

        const enter = this.input.keyboard.addKey('ENTER');
        enter.on('down', () => {
          this.button?.setTexture('button_onhover');
          setTimeout(() => {
            this.scene.start(sceneKeys.map0);
          }, 100);
        });
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
