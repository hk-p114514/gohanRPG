// Phaser
import { Scene, Tilemaps, Cameras, Types } from 'phaser';
// classes
import { Direction } from './../classes/Direction';
import { GridPhysics } from './../classes/GridPhysics';
import { GridControls } from './../classes/GridControls';
import { Player } from './../classes/Player';
// assets
import mapJson from '@/json/map001.json';
import mapTiles from '@/assets/maps/map001.png';
import box1 from '@/assets/items/box1.png';
import player from '@/assets/characters/dynamic/player.png';
import { gameObjectsToObjectPoints } from 'functions/generalPurpose/gameObjectsToObjectPoints';

export const playerAnims: { key: string; frameStart: number; frameEnd: number }[] = [
  { key: 'walkBack', frameStart: 9, frameEnd: 11 },
  { key: 'walkLeft', frameStart: 3, frameEnd: 5 },
  { key: 'walkRight', frameStart: 6, frameEnd: 8 },
  { key: 'walkFront', frameStart: 0, frameEnd: 2 },
];

export const keys = {
  json: 'mapJson',
  image: 'mapTiles',
  player: 'player',
};

export const tileSize: number = 40;
export const characterSize: number = 32;
class Test2 extends Scene {
  private tileset?: Tilemaps.Tileset;
  private tileMap?: Tilemaps.Tilemap;
  private tileMapLayer?: Tilemaps.TilemapLayer;
  private controls?: Cameras.Controls.FixedKeyControl;
  public player?: Player;
  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;
  private boxes?: Types.Physics.Arcade.SpriteWithDynamicBody[];

  constructor() {
    super({
      key: 'Test2',
    });
  }

  preload = () => {
    this.load.image(keys.image, mapTiles);
    this.load.tilemapTiledJSON(keys.json, mapJson);
    this.load.image('mapTiles', mapTiles);

    this.load.spritesheet('player', player, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
    this.load.spritesheet('box1', box1, {
      frameWidth: 32,
      frameHeight: 32,
    });
  };

  create = () => {
    // enterキーでシーンを切り替え
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.scene.start(this);
    });
    this.tileMap = this.make.tilemap({ key: keys.json });
    this.tileset = this.tileMap.addTilesetImage('map001', keys.image);

    // 各レイヤーを紐付ける(地面とか建物とか木とか...)
    this.tileMapLayer = this.tileMap.createLayer('ground', this.tileset, 0, 0);
    this.tileMapLayer = this.tileMap.createLayer('worldLayer', this.tileset, 0, 0);

    // 衝突判定を有効にする
    this.tileMapLayer.setCollisionByProperty({ collides: true });

    // デバッグ用に衝突判定を表示
    // Test2.debug(this, this.tileMapLayer);

    const spawnPoint = this.tileMap.findObject('objects', (obj) => {
      return obj.name === 'spawnPoint';
    });

    // プレイヤーを作成する
    const playerSprite = this.add.sprite(0, 0, 'player');

    // プレイヤーの設定
    if (!!this.player) {
      // this.physics.add.collider(this.player, this.tileMapLayer);
    }

    // カメラの設定
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;
    this.cameras.main.setBounds(
      0,
      0,
      this.tileMap.widthInPixels,
      this.tileMap.heightInPixels,
    );

    // プレイヤーを作成する
    const { x, y } = spawnPoint;
    if (x === undefined || y === undefined) return;
    // タイルの位置を取得
    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);
    this.player = new Player(playerSprite, new Phaser.Math.Vector2(tileX, tileY));

    // グリッドの設定
    this.gridPhysics = new GridPhysics(this.player, this.tileMap);
    this.gridControls = new GridControls(this.input, this.gridPhysics);

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

    this.initBoxes();

    this.printMessage(`Arrow keys to move\nPress "D" to show hitboxes\n`);

    // Debug graphics
    this.enableDebugMode();
  };

  update = (_time: number, delta: number) => {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  };

  private createPlayerAnimation(name: string, startFrame: number, endFrame: number) {
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

  private initBoxes = (): void => {
    const points = this.tileMap?.filterObjects('boxes', (obj) => obj.name === 'boxPoint');
    if (!points) return;
    const boxPoints = gameObjectsToObjectPoints(points);
    this.boxes = boxPoints.map((point) =>
      this.physics.add.sprite(point.x, point.y, 'box1', 2).setScale(1),
    );
    const sprite = this.player?.getSprite();
    if (!sprite) return;
    this.boxes.forEach((box) => {
      this.physics.add.overlap(sprite, box, (obj1, obj2) => {
        obj2.destroy();
        this.cameras.main.flash();
      });
    });
  };

  public printMessage = (message: string) => {
    this.add
      .text(16, 16, message, {
        font: '18px monospace',
        color: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: 'rgba(255,255,255,0.5)',
      })
      .setScrollFactor(0)
      .setDepth(30);
  };

  public static debug = (scene: Scene, tileMapLayer: Tilemaps.TilemapLayer) => {
    // 衝突判定のデバッグレンダリング
    tileMapLayer.renderDebug(scene.add.graphics(), {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
  };

  public enableDebugMode = () => {
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
  };
}

export { Test2 };
