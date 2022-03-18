import { dialogButton, Timeline } from './Timeline';
import { Choice } from './Choice';
import { DialogBox, DialogBoxConfig } from './DialogBox';
import { Scene } from 'phaser';
import { tileSize } from 'scenes/Map.tpl';
import { H, W } from 'functions/DOM/windowInfo';
import { SceneTimelines, Timelines } from './Timelines';
import { sceneKeys } from 'scenes/sceneKeys';
import { npcs, funcs } from './exam';
import { Map } from 'scenes/Map.tpl';
import { keys } from 'lodash';
export class TimelinePlayer extends Scene {
  private dialogBox?: DialogBox;
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {};
  private backgroundLayer?: Phaser.GameObjects.Container;
  private foregroundLayer?: Phaser.GameObjects.Container;
  private uiLayer?: Phaser.GameObjects.Container;
  private timeline?: Timeline;
  private timelineIndex = 0;
  private isTextShow: boolean = true;
  private anotherScene?: Scene;
  private timelineData?: Timelines;
  private specID?: string;
  constructor() {
    super({ key: sceneKeys.timelinePlayer });
  }

  init({ anotherScene, timelinedata, specID }: SceneTimelines) {
    if (!anotherScene || !timelinedata) {
      this.scene.stop();
      return;
    }
    // マップシーンのキー操作を止めるため
    anotherScene.scene.pause();

    this.anotherScene = anotherScene;
    this.timelineData = timelinedata;
    this.specID = specID;

    // 背景レイヤー・前景レイヤー・UIレイヤーをコンテナを使って表現
    this.backgroundLayer = this.add.container(0, 0);
    this.foregroundLayer = this.add.container(0, 0);
    this.uiLayer = this.add.container(0, 0);
  }

  preload() {}
  create() {
    const enter = this.scene.scene.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.isTextShow = true;
    });

    this.createDialogBox(
      this.cameras.main.scrollX + W() / 2,
      this.cameras.main.scrollY + H() - H() / 3 / 2 - tileSize,
      W() - tileSize * 2,
      H() / 3,
    );
    if (!this.dialogBox) return;
    // ダイアログの表示
    this.add.existing(this.dialogBox);

    this.specTimeline({ timelineID: this.specID });
    this.timelineIndex = 0;
  }

  update() {
    if (!this.timeline) return;
    if (!this.dialogBox) return;
    if (!this.anotherScene) return;
    if (this.timelineIndex >= this.timeline.length) {
      return;
    }
    // 文字があるなら、キーが押されるまで待つ
    if (!this.isTextShow) {
      return;
    }
    // タイムラインのイベントを取得してから、timelineIndexをインクリメント
    const timelineEvent = this.timeline[this.timelineIndex++];

    switch (timelineEvent.type) {
      case 'dialog': // ダイアログイベント
        if (timelineEvent.actorName) {
          // actorNameが設定されていたら名前を表示
          this.dialogBox.setActorNameText(timelineEvent.actorName);
        } else {
          // actorNameが設定されていなかったら名前を非表示
          this.dialogBox.clearActorNameText();
        }
        this.dialogBox.setText(timelineEvent.text, true);
        this.isTextShow = false;
        break;

      case 'setBackgroundImage': // 背景設定イベント
        this.setBackgroundImage(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        break;

      case 'addForeground': // 前景追加イベント
        this.addForeground(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        break;

      case 'clearForeground': // 前景クリアイベント
        this.clearForeground();
        break;

      case 'timelineTransition': // タイムライン遷移イベント
        //指定のタイムラインを実行する
        this.specTimeline({ timelineID: timelineEvent.timelineID });
        break;

      case 'sceneTransition': // シーン遷移イベント
        // 指定のシーンに遷移する
        this.dialogBox.clearDialogBox();
        this.timelineIndex = -1;
        this.anotherScene.scene.switch(timelineEvent.key);
        break;

      case 'choice': // 選択肢イベント
        this.setChoiceButtons(timelineEvent.choices);
        break;
      case 'setBackgroundColor':
        this.setBackgroundColor(timelineEvent.color);
        break;
      case 'event': // イベント追加
        this.startevent(timelineEvent.event);
        break;
      case 'endTimeline':
        this.dialogBox.clearDialogBox();
        this.timelineIndex = -1;
        // マップシーンのキー操作を受け付けるようにする
        this.anotherScene.scene.resume();
        // timelinePlayerシーンを止める
        this.scene.stop();
        break;
      default:
        break;
    }
  }
  private startevent(key: string) {
    // switch (key) {
    //   case 'cd':
    //     //this.anotherScene?.
    //     //output();
    //     break;
    //   default:
    // }
    if (funcs.has(key)) {
      funcs.get(key)();
    }
  }
  // ダイアログの作成
  private createDialogBox(x: number, y: number, width: number, height: number) {
    // ダイアログボックスの設定
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: '24px',
    };
    const dialogBoxConfig: DialogBoxConfig = {
      x: 0,
      y: 0,
      width: width,
      height: height,
      padding: 0,
      margin: 0,
      textStyle: textStyle,
      backGroundColor: 0x000000,
      frameColor: 0xffffff,
    };
    this.dialogBox = new DialogBox(this, dialogBoxConfig);
    this.dialogBox.x = x;
    this.dialogBox.y = y;
  }

  private specTimeline(data: any) {
    // this.scene.restart()の第1引数もしくは
    // this.scene.start()の第2引数に指定されたオブジェクトがdataに渡される
    const timelineID = data.timelineID || 'start';

    if (!this.timelineData) return;
    if (!(timelineID in this.timelineData)) {
      console.error(`[ERROR] タイムラインID[${timelineID}]は登録されていません`);
      // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
      return;
    }
    // タイムラインの指定
    this.timeline = this.timelineData[timelineID];
    this.timelineIndex = 0;
  }

  // 背景画像をセット
  private setBackgroundImage(x: number, y: number, texture: string) {
    if (!this.backgroundLayer) return;
    // 背景レイヤーの子を全て削除
    this.backgroundLayer.removeAll();
    // 背景画像のオブジェクトを作成
    const backgroundImage = new Phaser.GameObjects.Image(this, x, y, texture);
    // 背景レイヤーに画像オブジェクトを配置
    this.backgroundLayer.add(backgroundImage);
  }

  private setBackgroundColor(color:string){
    if(!this.backgroundLayer) return;
    // 背景レイヤーの子を全て削除
    this.backgroundLayer.removeAll();
    this.cameras.main.setBackgroundColor(color);
  }

  // 前景画像を追加
  private addForeground(x: number, y: number, texture: string) {
    if (!this.foregroundLayer) return;
    // 前景画像のオブジェクトを作成
    const foregroundImage = new Phaser.GameObjects.Image(this, x, y, texture);
    // 前景レイヤーに画像オブジェクトを配置
    this.foregroundLayer.add(foregroundImage);
  }

  // 前景をクリア
  private clearForeground() {
    if (!this.foregroundLayer) return;
    // 前景レイヤーの子を全て削除
    this.foregroundLayer.removeAll();
  }

  // 選択肢ボタンをセット
  private setChoiceButtons(choices: Choice[]) {
    if (choices.length === 0) {
      return;
    }
    if (!this.dialogBox) return;

    // ボタンを中央に配置するようにボタングループのY原点を計算
    const buttonHeight = 40;
    const buttonWidth = 400;
    const buttonMargin = 0;
    const buttonGroupHeight =
      buttonHeight * choices.length + buttonMargin * (choices.length - 1); // 選択ボタンの高さ
    const buttonGroupOriginY =
      this.dialogBox.y - this.dialogBox.height / 2 - buttonGroupHeight; // 選択ボタングループの上側Y座標

    const choiceButton: Array<dialogButton> = [];
    choices.forEach((choice, index: number) => {
      if (!this.dialogBox) return;
      const y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * index;
      choiceButton[index] = {
        // Rectangleでボタンを作成
        range: new Phaser.GameObjects.Rectangle(
          this,
          this.dialogBox.x + this.dialogBox.width / 2 - buttonWidth / 2,
          y,
          buttonWidth,
          buttonHeight,
          0x000000,
        ).setStrokeStyle(1, 0xffffff),
        // ボタンテキストを追加
        text: new Phaser.GameObjects.Text(
          this,
          this.dialogBox.x + this.dialogBox.width / 2 - buttonWidth / 2,
          y,
          choice.text,
          this.textStyle,
        ).setOrigin(0.5),
      };
      choiceButton[index].range.setInteractive({
        useHandCursor: true,
      });

      // マウスオーバーで色が変わるように設定
      choiceButton[index].range.on('pointerover', () => {
        choiceButton[index].range.setFillStyle(0x333333);
      });
      choiceButton[index].range.on('pointerout', () => {
        choiceButton[index].range.setFillStyle(0x000000);
      });

      // ボタンクリックで、指定のタイムラインを実行する
      choiceButton[index].range.on('pointerdown', () => {
        // 選択ボタンをクリアする
        clearButton(choiceButton);
        this.specTimeline({ timelineID: choice.timelineID });
      });

      if (!this.uiLayer) return;
      // ボタンをUIレイヤーに追加
      this.uiLayer.add(choiceButton[index].range);
      // ボタンテキストをUIレイヤーに追加
      this.uiLayer.add(choiceButton[index].text);
    });
    const clearButton = (allbutton: dialogButton[]) => {
      allbutton.forEach((button) => {
        button.range.destroy();
        button.text.destroy();
      });
    };
  }
}
