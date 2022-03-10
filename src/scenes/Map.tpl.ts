// assets
import player from '@/assets/characters/dynamic/player.png';
import mapImg from '@/assets/maps/map001.png';
import { getEnemies } from 'battleActors';
import { BattleActor } from 'classes/BattleActor';
// classes
import { Direction } from 'classes/Direction';
import { GridControls } from 'classes/GridControls';
import { GridPhysics } from 'classes/GridPhysics';
import { Player } from 'classes/Player';
import { Cameras, Scene, Tilemaps } from 'phaser';
import { DialogBox, DialogBoxConfig } from 'classes/DialogBox';
import { W, H } from 'functions/DOM/windowInfo';
import { TimelinePlayer } from 'classes/TimelinePlayer';
import { Timeline } from 'classes/Timeline';
import { timelineData } from 'classes/timelineWords';

import { system } from 'index';
import { Types } from 'phaser';
import { playerAnims } from 'playerAnims';
import { sceneKeys } from './sceneKeys';
// values
export const tileSize: number = 40;
export const characterSize: number = 32;
export const assetKeys = {
  mapImg: 'mapImg',
  player: 'player',
};

export class Map extends Scene {
  public tileset?: Tilemaps.Tileset;
  public tileMap?: Tilemaps.Tilemap;
  public tileMapLayer?: Tilemaps.TilemapLayer;
  public player?: Player;
  public enemies: BattleActor[];
  private eventPoints?: Types.Tilemaps.TiledObject[];
  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;
  private dialogBox?: DialogBox;
  private timelinePlayer?: TimelinePlayer;
  private timeline?: Timeline;
  private mapName: string;

  constructor(private json: string, public name: string) {
    super({ key: name });
    this.enemies = getEnemies(name);
    this.mapName = name;
  }

  public preload() {
    this.load.image(assetKeys.mapImg, mapImg);
    this.load.tilemapTiledJSON(this.name, this.json);
    this.load.image('mapTiles', mapImg);

    this.load.spritesheet('player', player, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
  }

  init(data: any) {
    // this.scene.restart()の第1引数もしくは
    // this.scene.start()の第2引数に指定されたオブジェクトがdataに渡される
    const timelineID = data.timelineID || 'start';

    if (!(timelineID in timelineData)) {
      console.error(`[ERROR] タイムラインID[${timelineID}]は登録されていません`);
      // 登録されていないタイムラインIDが指定されていたらタイトルシーンに遷移する
      this.scene.start('title');
      return;
    }
    this.timeline = timelineData[timelineID];
  }

  public create() {
    const space = this.input.keyboard.addKey('SPACE');
    space.on('down', () => {
      console.log(system.player);
      system.player.levelUp();
    });
    const B = this.input.keyboard.addKey('B');
    // Bキーでバトルシーンに移行(現在のシーンは破棄せずにストップさせるだけにして、バトルシーンから戻ったら再開する)
    B.on('down', () => {
      this.cameras.main.shake(500);
      this.scene.switch(sceneKeys.battle);
    });

    // マップを作成
    this.tileMap = this.make.tilemap({ key: this.name });
    this.tileset = this.tileMap.addTilesetImage('map001', assetKeys.mapImg);

    // 各レイヤーを紐付ける(地面とか建物とか木とか...)
    this.tileMapLayer = this.tileMap.createLayer('ground', this.tileset, 0, 0);
    this.tileMapLayer = this.tileMap.createLayer('worldLayer', this.tileset, 0, 0);

    // 衝突判定を有効にする
    // this.tileMapLayer.setCollisionByProperty({ collides: true });

    // プレイヤーの初期位置を取得
    const spawnPoint = this.tileMap.findObject('objects', (obj) => {
      return obj.name === 'spawnPoint';
    });

    // イベントの位置を取得
    this.eventPoints = this.tileMap.filterObjects('objects', (obj) => {
      return obj.name === 'event';
    });
    console.log(this.eventPoints);

    // プレイヤーを作成する
    const playerSprite = this.add.sprite(0, 0, 'player');

    // カメラの設定
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    this.cameras.main.setBounds(
      0,
      0,
      this.tileMap.widthInPixels,
      this.tileMap.heightInPixels,
    );
    this.tileMap.width;

    const { x, y } = spawnPoint;
    if (!x || !y) return;
    // タイルの位置を取得
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    this.player = new Player(playerSprite, new Phaser.Math.Vector2(tileX, tileY));

    // グリッドの設定
    if (this.player) {
      this.gridPhysics = new GridPhysics(this.player, this.tileMap);
      this.gridControls = new GridControls(this.input, this.gridPhysics);
    }

    this.createAnim();

    // Debug graphics
    this.enableDebugMode();

    //Dialog==================================================================

    // 設定
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
    this.dialogBox = new DialogBox(this, dialogBoxConfig);
    this.timelinePlayer = new TimelinePlayer(this, this.dialogBox, textStyle);
    //Dialog==================================================================
  }

  public update(_time: number, delta: number) {
    if (!!this.eventPoints) {
      this.eventPoints.forEach((event) => {
        const { x, y } = event;
        if (!x || !y) return;
        if (!this.dialogBox) return;
        if (!this.timelinePlayer || !this.timeline) return;
        // プレイヤーの位置とタイルのイベントの位置が同じだったら...
        if (
          this.player?.getTilePos().x === x / tileSize &&
          this.player?.getTilePos().y === y / tileSize
        ) {
          this.dialogBox.x = this.cameras.main.scrollX + W() / 2;
          this.dialogBox.y =
            this.cameras.main.scrollY + H() - this.dialogBox.height / 2 - tileSize;
          this.timelinePlayer.start(this.timeline);
        }
      });
    }

    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }

  public createPlayerAnimation(name: string, startFrame: number, endFrame: number) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers('player', {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  public createAnim() {
    // プレイヤーのアニメーション
    this.createPlayerAnimation(
      Direction.UP,
      playerAnims[0].frameStart,
      playerAnims[0].frameEnd,
    );
    this.createPlayerAnimation(
      Direction.LEFT,
      playerAnims[1].frameStart,
      playerAnims[1].frameEnd,
    );
    this.createPlayerAnimation(
      Direction.RIGHT,
      playerAnims[2].frameStart,
      playerAnims[2].frameEnd,
    );
    this.createPlayerAnimation(
      Direction.DOWN,
      playerAnims[3].frameStart,
      playerAnims[3].frameEnd,
    );
  }

  public enableDebugMode() {
    this.input.keyboard.once('keydown-D', () => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      this.tileMapLayer?.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    });
  }

  startMap(to: string): void {
    system.map = to;
    console.log(system.map);
    this.scene.start(to);
  }

  switchMap(to: string): void {
    system.map = to;
    console.log(system.map);
    this.scene.switch(to);
  }
}
