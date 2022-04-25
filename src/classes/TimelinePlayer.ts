import { dialogButton, Timeline, MotionEventProps } from './Timeline';
import { Choice } from './Choice';
import { DialogBox, DialogBoxConfig } from './DialogBox';
import { Scene } from 'phaser';
import { tileSize } from 'scenes/Map.tpl';
import { H, W } from 'functions/DOM/windowInfo';
import { Timelines } from './Timelines';
import { sceneKeys } from 'scenes/sceneKeys';
import { system } from 'index';
import { Map_TPL } from 'scenes/Map.tpl';
import { allMap } from './Timeline';
import { BattleActor } from './BattleActor';
import { Map2 } from 'scenes/Map2';
import { Map5 } from 'scenes/Map5';
export class TimelinePlayer extends Scene {
  private dialogBox?: DialogBox;
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle = {};
  private backgroundLayer?: Phaser.GameObjects.Container;
  private foregroundLayer?: Phaser.GameObjects.Container;
  private uiLayer?: Phaser.GameObjects.Container;
  private hitArea?: Phaser.GameObjects.Zone;
  private timeline?: Timeline;
  private timelineIndex = 0;
  private isTextShow: boolean = true;
  private anotherScene?: Map_TPL;
  private timelineData?: Timelines;
  private specID?: string;
  constructor() {
    super({ key: sceneKeys.timelinePlayer });
  }

  init(data: { anotherScene: allMap; timelineData: Timelines; specID?: string }) {
    if (!data.anotherScene || !data.timelineData) {
      this.scene.stop();
      return;
    }
    // マップシーンのキー操作を止めるため
    data.anotherScene.scene.pause();

    this.anotherScene = data.anotherScene;
    this.timelineData = data.timelineData;
    this.specID = data.specID;

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

    const { width, height } = this.game.canvas;
    this.hitArea = new Phaser.GameObjects.Zone(
      this,
      width / 2,
      height / 2,
      width,
      height,
    );
    this.hitArea.setInteractive();

    this.hitArea.on('pointerdown', () => {
      this.isTextShow = true;
    });
    this.uiLayer?.add(this.hitArea);

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
    console.log(this.anotherScene);
    console.log(timelineEvent);
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
      case 'event': // イベント追加
        this.startevent(timelineEvent.event, timelineEvent.contents);
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
        this.scene.stop();
        break;
      case 'choice': // 選択肢イベント
        this.setChoiceButtons(timelineEvent.choices);
        break;
      case 'setBackgroundColor':
        this.setBackgroundColor(timelineEvent.color);
        break;
      case 'meetFriend': // 仲間出会いイベント
        this.addFriend(timelineEvent.actor);
        break;
      case 'switch':
        this.dialogBox.clearDialogBox();
        this.timelineIndex = -1;
        // マップシーンのキー操作を受け付けるようにする
        this.anotherScene.scene.resume();
        system.map = timelineEvent.scene;
        console.log(system.map);
        this.anotherScene.scene.switch(timelineEvent.scene);
        this.scene.stop();
        break;
      case 'endTimeline':
        this.dialogBox.clearDialogBox();
        this.timelineIndex = -1;
        // マップシーンのキー操作を受け付けるようにする
        this.anotherScene.scene.resume();
        // timelinePlayerシーンを止める
        this.scene.stop();
        break;
      case 'judge':
        if (
          system.isBossKilled.get('Ate') &&
          system.isBossKilled.get('Bte') &&
          system.isBossKilled.get('Melcine') &&
          system.isBossKilled.get('Eleca')
        ) {
          this.specTimeline({ timelineID: timelineEvent.timelineID });
        }
        break;
      default:
        break;
    }
  }
  private startevent(key: string, contents?: MotionEventProps) {
    console.log(key);
    // if (many !== undefined && contents === undefined) {
    //   let box: MotionEventProps = {};
    //   switch (key) {
    //     case 'kill':
    //       box.xy = many;
    //       if (box.xy === undefined) break;
    //       this.anotherScene?.kill(box.xy);
    //       break;
    //     case 'delete':
    //       box.name = many[0];
    //       if (box.name === undefined) break;
    //       this.anotherScene?.delete(box.name);
    //       break;
    //     case 'event':
    //       box.name = many[0];
    //       box.x = many[1];
    //       box.y = many[2];
    //       box.timeline = many[3];
    //       box.setEventMap = many[4];
    //       if (box.name === undefined) break;
    //       if (box.x === undefined) break;
    //       if (box.y === undefined) break;
    //       if (box.timeline === undefined) break;
    //       this.anotherScene?.event(box.name, box.x, box.y, box.timeline, box.setEventMap);
    //       break;
    //     case 'chdir':
    //       box.name = many[0];
    //       box.direction = many[1];
    //       if (box.name === undefined) break;
    //       if (box.direction === undefined) break;
    //       this.anotherScene?.chdir(box.name, box.direction);
    //       break;
    //     case 'set':
    //       box.name = many[0];
    //       box.x = many[1];
    //       box.y = many[2];
    //       box.timeline = many[3];
    //       if (box.name === undefined) break;
    //       if (box.x === undefined) break;
    //       if (box.y === undefined) break;
    //       if (box.timeline === undefined) break;
    //       this.anotherScene?.set(box.name, box.x, box.y, box.timeline);
    //       break;
    //     case 'reset':
    //       box.name = many[0];
    //       if (box.name === undefined) break;
    //       this.anotherScene?.reset(box.name);
    //       break;
    //     case 'break':
    //       box.name = many[0];
    //       if (box.name === undefined) break;
    //       this.anotherScene?.break(box.name);
    //       break;
    //     case 'move':
    //       box.direction = many[0];
    //       if (box.direction === undefined) break;
    //       this.anotherScene?.move(box.direction);
    //       break;
    //     case 'log':
    //       box.name = many[0];
    //       box.bubbleIndex = many[1];
    //       if (box.name === undefined) break;
    //       if (box.bubbleIndex === undefined) break;
    //       this.anotherScene?.setlog(box.name, box.bubbleIndex);
    //       break;
    //     case 'bosslog':
    //       box.bubbleIndex = many[0];
    //       if (box.bubbleIndex === undefined) break;
    //       this.anotherScene?.bosslog(box.bubbleIndex);
    //       break;
    //     case 'relog':
    //       this.anotherScene?.relog();
    //       break;
    //     case 'warp':
    //       box.x = many[0];
    //       box.y = many[1];
    //       if (box.x === undefined) break;
    //       if (box.y === undefined) break;
    //       this.anotherScene?.warp(box.x, box.y);
    //       break;
    //     case 'battle':
    //       box.battleActor = many[0];
    //       if (box.battleActor === undefined) break;
    //       if (!this.anotherScene?.battle(box.battleActor)) {
    //         this.dialogBox?.clearDialogBox();
    //         this.timelineIndex = -1;
    //         // マップシーンのキー操作を受け付けるようにする
    //         this.anotherScene?.scene.resume();
    //         // timelinePlayerシーンを止める
    //         this.scene.stop();
    //       }
    //       break;
    //     case 'moveBattle':
    //       this.anotherScene?.moveBattle();
    //       break;
    //     case 'zoomUp':
    //       this.anotherScene?.zoomUp();
    //       break;
    //     case 'zoomDown':
    //       this.anotherScene?.zoomDown();
    //       break;
    //   }
    // } else
    // if (contents !== undefined) {
    switch (key) {
      case 'judge':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        this.anotherScene?.judge(contents.name);
      case 'kill':
        if (contents === undefined) break;
        if (contents.xy === undefined) break;
        this.anotherScene?.kill(contents.xy);
        break;
      case 'delete':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        this.anotherScene?.delete(contents.name);
        break;
      case 'event':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.x === undefined) break;
        if (contents.y === undefined) break;
        if (contents.timeline === undefined) break;
        this.anotherScene?.event(
          contents.name,
          contents.x,
          contents.y,
          contents.timeline,
          contents.setEventMap,
        );
        break;
      case 'chdir':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.direction === undefined) break;
        this.anotherScene?.chdir(contents.name, contents.direction);
        break;
      case 'set':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.x === undefined) break;
        if (contents.y === undefined) break;
        this.anotherScene?.set(
          contents.name,
          contents.x,
          contents.y,
          contents.timeline,
          contents.direction,
        );
        break;
      case 'reset':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        this.anotherScene?.reset(contents.name);
        break;
      case 'break':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        this.anotherScene?.break(contents.name);
        break;
      case 'move':
        if (contents === undefined) break;
        if (contents.direction === undefined) break;
        this.anotherScene?.move(contents.direction);
        break;
      case 'log':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.bubbleIndex === undefined) break;
        this.anotherScene?.setlog(contents.name, contents.bubbleIndex);
        break;
      case 'bosslog':
        if (contents === undefined) break;
        if (contents.bubbleIndex === undefined) break;
        this.anotherScene?.bosslog(contents.bubbleIndex);
        break;
      case 'relog':
        this.anotherScene?.relog();
        break;
      case 'warp':
        if (contents === undefined) break;
        if (contents.x === undefined) break;
        if (contents.y === undefined) break;
        this.anotherScene?.warp(contents.x, contents.y);
        break;
      case 'battle':
        if (contents === undefined) break;
        if (contents.battleActor === undefined) break;
        if (!this.anotherScene?.battle(contents.battleActor)) {
          this.dialogBox?.clearDialogBox();
          this.timelineIndex = -1;
          // マップシーンのキー操作を受け付けるようにする
          this.anotherScene?.scene.resume();
          // timelinePlayerシーンを止める
          this.scene.stop();
        }
        break;
      case 'moveBattle':
        this.anotherScene?.moveBattle();
        break;
      case 'zoomUp':
        this.anotherScene?.zoomUp();
        break;
      case 'zoomDown':
        this.anotherScene?.zoomDown();
        break;
      case 'waprStar':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.x === undefined) break;
        if (contents.y === undefined) break;
        if (this.anotherScene instanceof Map2)
          this.anotherScene?.warpStar(contents.name, contents.x, contents.y);
        break;
      case 'createBoss':
        if (contents === undefined) break;
        if (contents.name === undefined) break;
        if (contents.x === undefined) break;
        if (contents.y === undefined) break;
        if (this.anotherScene instanceof Map5)
          this.anotherScene?.createBoss(contents.x, contents.y, contents.name);
        break;
    }
    // }
  }

  private addFriend(actor: BattleActor) {
    if (!system.party.includes(actor)) {
      system.party.push(actor);
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
      this.anotherScene?.scene.resume();
      this.scene.stop();
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

  private setBackgroundColor(color: string) {
    if (!this.backgroundLayer) return;
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

    // hitAreaのクリックを無効化
    this.hitArea?.disableInteractive();

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
        // hitAreaのクリックを有効化
        this.hitArea?.setInteractive();
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
