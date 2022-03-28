import { GameObjects, Scene, Types } from 'phaser';
import { characterSize } from './Map.tpl';
import player from '@/assets/characters/dynamic/marc.png';
import gohanBG from '@/images/gohan.jpg';
import curryBG from '@/images/curry.jpg';
import eatBG from '@/images/eat.jpg';
import button from '@/images/button.png';
import buttonOnHover from '@/images/button_onhover.png';
import { randArr } from 'functions/generalPurpose/rand';
import { sceneKeys } from './sceneKeys';

class Preload extends Scene {
  private backgroundColor: string = '#000';
  constructor() {
    super({ key: sceneKeys.preload });
  }

  private fontStyle: Types.GameObjects.Text.TextStyle = {
    color: '#fff',
    fontSize: '70px',
  };

  init() {}

  preload() {
    // 画像を読み込む
    this.load.image('gohan', gohanBG);
    this.load.image('curry', curryBG);
    this.load.image('eat', eatBG);

    this.load.image('button', button);
    this.load.image('button_onhover', buttonOnHover);

    this.load.spritesheet('player', player, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
  }

  create() {
    // 画面の縦横幅を取得
    const { height, width } = this.sys.game.canvas;
    const bg = ['gohan', 'curry', 'eat'];

    // 背景画像を設定
    this.add
      .image(width / 2, height / 2, randArr(bg))
      .setOrigin(0.5)
      .setScale(0.25)
      .setAlpha(0.5);

    // 背景色を設定
    this.cameras.main.setBackgroundColor(this.backgroundColor);

    // 画面中央に文字を表示
    const startMessage: GameObjects.Text = this.add.text(
      width / 2,
      height / 4,
      '🍚🍚🍚',
      this.fontStyle,
    );
    startMessage.setOrigin(0.5);

    // ボタンを設置
    const button: GameObjects.Image = this.add.image(width / 2, height / 2, 'button');
    button.setInteractive();
    // ボタンにカーソルが乗った時
    button.on('pointerover', () => {
      button.setTexture('button_onhover');
    });

    // カーソルがボタンから離れた時
    button.on('pointerout', () => {
      button.setTexture('button');
    });

    // クリックした時
    button.on('pointerdown', () => {
      this.scene.start(sceneKeys.map1);
    });
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      button.setTexture('button_onhover');
      setTimeout(() => {
        this.scene.start(sceneKeys.map1);
      }, 100);
    });
  }
}

export { Preload };
