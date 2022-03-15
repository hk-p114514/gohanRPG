import { dialogButton, Timeline } from './Timeline';
import { Choice } from './Choice';
import { DialogBox, DialogBoxConfig } from './DialogBox';
import { Physics, Scene } from 'phaser';
import { tileSize } from 'scenes/Map.tpl';
import { H, W } from 'functions/DOM/windowInfo';
import { Timelines } from './Timelines';

export class TimelinePlayer {
  private dialogBox?: DialogBox;
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {};
  private backgroundLayer: Phaser.GameObjects.Container;
  private foregroundLayer: Phaser.GameObjects.Container;
  private uiLayer: Phaser.GameObjects.Container;
  private hitArea: Phaser.GameObjects.Zone;
  private timeline?: Timeline;
  private timelineIndex = -1;
  private isText: boolean = true;

  constructor(
    private scene: Phaser.Scene, // private dialogBox: DialogBox,
    private timelineData: Timelines, // private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {},
  ) {
    // 背景レイヤー・前景レイヤー・UIレイヤーをコンテナを使って表現
    this.backgroundLayer = this.scene.add.container(0, 0);
    this.foregroundLayer = this.scene.add.container(0, 0);
    // this.scene.add.existing(this.dialogBox); // ダイアログボックスは前景レイヤーとUIレイヤーの間に配置
    this.uiLayer = this.scene.add.container(0, 0);

    // クリック領域(hitArea)を画面全体に設定
    const { width, height } = this.scene.game.canvas;
    this.hitArea = new Phaser.GameObjects.Zone(
      this.scene,
      width / 2,
      height / 2,
      width,
      height,
    );
    this.hitArea.setInteractive({
      useHandCursor: true,
    });

    // hitAreaをクリックしたらnext()を実行
    this.hitArea.on('pointerdown', () => {
      this.isText = true;
    });

    // hitAreaをUIレイヤーに追加
    this.uiLayer.add(this.hitArea);
  }

  // ダイアログの作成
  public createDialogBox(x: number, y: number, width: number, height: number) {
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
    this.dialogBox = new DialogBox(this.scene, dialogBoxConfig);
    this.dialogBox.x = x;
    this.dialogBox.y = y;
  }

  private specTimeline(data: any) {
    // this.scene.restart()の第1引数もしくは
    // this.scene.start()の第2引数に指定されたオブジェクトがdataに渡される
    const timelineID = data.timelineID || 'start';

    if (!(timelineID in this.timelineData)) {
      console.error(`[ERROR] タイムラインID[${timelineID}]は登録されていません`);
      // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
      // this.scene.start('title');
      return;
    }
    // タイムラインの指定
    this.timeline = this.timelineData[timelineID];
    this.timelineIndex = 0;
  }

  // タイムラインの初期化
  public initTimeline(specID?: string) {
    this.scene.input.keyboard.enabled = false;
    this.createDialogBox(
      this.scene.cameras.main.scrollX + W() / 2,
      this.scene.cameras.main.scrollY + H() - H() / 3 / 2 - tileSize,
      W() - tileSize * 2,
      H() / 3,
    );
    if (!this.dialogBox) return;
    // ダイアログの表示
    this.scene.add.existing(this.dialogBox);
    this.specTimeline({ timelineID: specID });
    this.timelineIndex = 0;
  }

  // 背景画像をセット
  private setBackground(x: number, y: number, texture: string) {
    // 背景レイヤーの子を全て削除
    this.backgroundLayer.removeAll();
    // 背景画像のオブジェクトを作成
    const backgroundImage = new Phaser.GameObjects.Image(this.scene, x, y, texture);
    // 背景レイヤーに画像オブジェクトを配置
    this.backgroundLayer.add(backgroundImage);
  }

  // 前景画像を追加
  private addForeground(x: number, y: number, texture: string) {
    // 前景画像のオブジェクトを作成
    const foregroundImage = new Phaser.GameObjects.Image(this.scene, x, y, texture);
    // 前景レイヤーに画像オブジェクトを配置
    this.foregroundLayer.add(foregroundImage);
  }

  // 前景をクリア
  private clearForeground() {
    // 前景レイヤーの子を全て削除
    this.foregroundLayer.removeAll();
  }

  // 選択肢ボタンをセット
  private setChoiceButtons(choices: Choice[]) {
    if (choices.length === 0) {
      return;
    }
    if (!this.dialogBox) return;
    this.hitArea.disableInteractive(); // hitAreaのクリックを無効化

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
          this.scene,
          this.dialogBox.x + this.dialogBox.width / 2 - buttonWidth / 2,
          y,
          buttonWidth,
          buttonHeight,
          0x000000,
        ).setStrokeStyle(1, 0xffffff),
        // ボタンテキストを追加
        text: new Phaser.GameObjects.Text(
          this.scene,
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

      // ボタンクリックでシーンをリスタートし、指定のタイムラインを実行する
      choiceButton[index].range.on('pointerdown', () => {
        // restart()の引数がシーンのinit()の引数に渡される
        // this.scene.scene.restart({ timelineID: choice.timelineID });
        this.hitArea.setInteractive({
          useHandCursor: true,
        });
        clearButton(choiceButton);
        this.specTimeline({ timelineID: choice.timelineID });
      });

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

  // 次のタイムラインを実行
  public updateTimeline(specID?: string): boolean {
    // this.timelineIndex === -1はダイアログが呼び出される最初のこと
    if (this.timelineIndex === -1) {
      this.initTimeline(specID);
    }
    if (!this.timeline) {
      return true;
    }
    if (!this.dialogBox) return true;
    if (this.timelineIndex >= this.timeline.length) {
      return true;
    }
    // 文字があるなら、キーが押されるまで待つ
    if (!this.isText) {
      return true;
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
        this.isText = false;
        break;

      case 'setBackground': // 背景設定イベント
        this.setBackground(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        break;

      case 'addForeground': // 前景追加イベント
        this.addForeground(timelineEvent.x, timelineEvent.y, timelineEvent.key);
        break;

      case 'clearForeground': // 前景クリアイベント
        this.clearForeground();
        break;

      case 'timelineTransition': // タイムライン遷移イベント
        // シーンをリスタートし、指定のタイムラインを実行する
        // restart()の引数がシーンのinit()の引数に渡される
        this.specTimeline({ timelineID: timelineEvent.timelineID });
        // this.scene.scene.restart({ timelineID: timelineEvent.timelineID });
        break;

      case 'sceneTransition': // シーン遷移イベント
        // 指定のシーンに遷移する
        // start()の第2引数がシーンのinit()の引数に渡される
        // this.dialogBox.clearDialogBox();
        // this.timelineIndex = 0;
        this.scene.scene.switch(timelineEvent.key);
        // return;
        // this.scene.scene.start(timelineEvent.key, timelineEvent.data);
        break;

      case 'choice': // 選択肢イベント
        this.setChoiceButtons(timelineEvent.choices);
        break;
      case 'startTimeline':
        this.initTimeline(specID);
        break;
      case 'endTimeline':
        this.dialogBox.clearDialogBox();
        this.timelineIndex = -1;
        this.scene.input.keyboard.enabled = true;
        return false;
      default:
        break;
    }
    return true;
  }
}
