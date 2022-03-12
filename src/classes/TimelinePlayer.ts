import { Timeline } from './Timeline';
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
  private timelineIndex = 0;
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
  private createDialogBox() {
    // ダイアログボックスの設定
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily:
        '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',
      fontSize: '24px',
    };
    const dialogBoxConfig: DialogBoxConfig = {
      x: 0,
      y: 0,
      width: W() - tileSize * 2,
      height: H() / 3,
      padding: 0,
      margin: 0,
      textStyle: textStyle,
      backGroundColor: 0x000000,
      frameColor: 0xff0000,
    };
    this.dialogBox = new DialogBox(this.scene, dialogBoxConfig);
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
  }

  // タイムラインの初期化
  public initTimeline(specID?: string) {
    this.scene.input.keyboard.enabled = false;
    this.createDialogBox();
    if (!this.dialogBox) return;
    this.specTimeline({ timelineID: specID });
    this.dialogBox.x = this.scene.cameras.main.scrollX + W() / 2;
    this.dialogBox.y =
      this.scene.cameras.main.scrollY + H() - this.dialogBox.height / 2 - tileSize;
    // ダイアログの表示
    this.scene.add.existing(this.dialogBox);
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
    this.hitArea.disableInteractive(); // hitAreaのクリックを無効化

    // ボタンを中央に配置するようにボタングループのY原点を計算
    const buttonHeight = 40;
    const buttonMargin = 40;
    const { width, height } = this.scene.game.canvas;
    const buttonGroupHeight =
      buttonHeight * choices.length + buttonMargin * (choices.length - 1);
    const buttonGroupOriginY = height / 2 - buttonGroupHeight / 2;

    choices.forEach((choice, index) => {
      const y = buttonGroupOriginY + buttonHeight * (index + 0.5) + buttonMargin * index;

      // Rectangleでボタンを作成
      const button = new Phaser.GameObjects.Rectangle(
        this.scene,
        width / 2,
        y,
        width - buttonMargin * 2,
        buttonHeight,
        0x000000,
      ).setStrokeStyle(1, 0xffffff);
      button.setInteractive({
        useHandCursor: true,
      });

      // マウスオーバーで色が変わるように設定
      button.on('pointerover', () => {
        button.setFillStyle(0x333333);
      });
      button.on('pointerout', () => {
        button.setFillStyle(0x000000);
      });

      // ボタンクリックでシーンをリスタートし、指定のタイムラインを実行する
      button.on('pointerdown', () => {
        // restart()の引数がシーンのinit()の引数に渡される
        this.scene.scene.restart({ timelineID: choice.timelineID });
      });

      // ボタンをUIレイヤーに追加
      this.uiLayer.add(button);

      // ボタンテキストを作成
      const buttonText = new Phaser.GameObjects.Text(
        this.scene,
        width / 2,
        y,
        choice.text,
        this.textStyle,
      ).setOrigin(0.5);

      // ボタンテキストをUIレイヤーに追加
      this.uiLayer.add(buttonText);
    });
  }

  // 次のタイムラインを実行
  public updateTimeline(specID?: string): void {
    // ここをthis.timelineIndexではなくてべつのものにしなければ！
    if (this.timelineIndex === 0) {
      this.initTimeline(specID);
    }
    if (!this.timeline) {
      return;
    }
    if (!this.dialogBox) return;
    if (this.timelineIndex >= this.timeline.length) {
      // this.dialogBox.clearDialogBox();
      // this.timelineIndex = 0;
      return;
    }
    // 文字があるなら、キーが押されるまで待つ
    if (!this.isText) {
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
        this.dialogBox.setText(timelineEvent.text);
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
        return;
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
        this.timelineIndex = 0;
        return;
      default:
        break;
    }
  }
}
