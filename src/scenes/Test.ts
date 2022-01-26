import { GameObjects, Scene, Tilemaps, Tweens, Types } from 'phaser';
import mapTiles from '@/assets/maps/map1.png';
import player from '@/assets/characters/dynamic/player.png';
import { H, W } from 'functions/DOM/windowInfo';
import { Map } from 'classes/Map';

// 32x32の画像を使用する
export const tileSize: number = 40;
export const characterSize: number = 32;

const height = H();
const width = W();

// マップチップの数 = 画面サイズ / マップチップサイズ
const row: number = Math.floor((height / tileSize) * 1.5);
const col: number = Math.floor((width / tileSize) * 1.5);

type WalkAnimState = 'walkFront' | 'walkBack' | 'walkLeft' | 'walkRight' | '';
type MoveDir = -1 | 0 | 1;

class Test extends Scene {
  private tiles?: Tilemaps.Tileset;
  private map?: Tilemaps.Tilemap;
  private mapGroundLayer?: Phaser.Tilemaps.TilemapLayer;
  private mapGround: Map = new Map(row, col, 3);

  // プレイヤーに関するプロパティ
  private player?: GameObjects.Sprite;
  private playerAnims: { key: string; frameStart: number; frameEnd: number }[] = [
    { key: 'walkFront', frameStart: 0, frameEnd: 2 },
    { key: 'walkLeft', frameStart: 3, frameEnd: 5 },
    { key: 'walkRight', frameStart: 6, frameEnd: 8 },
    { key: 'walkBack', frameStart: 9, frameEnd: 11 },
  ];
  private playerAnimState?: WalkAnimState;
  private playerWalkSpeed: number = tileSize;
  private isPlayerWalking: boolean = false;
  private p: { x: number; y: number };
  // プレイヤーに関するプロパティここまで

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super({ key: 'Game' });
    // マップの真ん中にプレイヤーを配置
    this.p = { x: 0, y: 0 };
  }

  // =================================================================
  init = () => {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerAnimState = '';

    this.isPlayerWalking = false;
    this.p = { x: Math.floor(col / 2), y: Math.floor(row / 2) };
  };

  preload = () => {
    this.load.image('mapTiles', mapTiles);
    this.load.spritesheet('player', player, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
  };

  create = () => {
    // ========= 世界の設定 =============
    this.tweens.timeScale = 2;
    this.time.timeScale = 2;

    // 世界の限界を設定

    // ========= 世界の設定ここまで =============

    // ========= マップ処理 =============
    this.mapGround.fillAll(2);
    this.mapGround.encloseRange(0, 5, 0, 5, 2, 0);

    this.map = this.make.tilemap({
      data: this.mapGround.getTiles(),
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    this.tiles = this.map.addTilesetImage('mapTiles');
    this.mapGroundLayer = this.map.createLayer(0, this.tiles, 0, 0);

    let playerPos: Phaser.Math.Vector2 = this.mapGroundLayer.tileToWorldXY(
      this.p.x,
      this.p.y,
    );
    // ========= マップ処理ここまで =========

    // ========= プレイヤー処理    =========
    this.player = this.add.sprite(playerPos.x, playerPos.y, 'player', 0);
    this.player.setOrigin(0);
    this.player.setDisplaySize(characterSize, characterSize);

    for (const pAnim of this.playerAnims) {
      // ヒーローアニメーションの数だけループ
      if (this.anims.create(this.playerAnimConfig(pAnim)) === false) continue; // もしfalseが戻って来ればこの後何もしない
    }
    this.player.anims.play('walkFront');

    // プレイヤーをマップの中心に固定(カメラに追従させる)
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.mapGroundLayer.width,
      this.mapGroundLayer.height,
    );

    // =========プレイヤー処理ここまで=========
  };

  update = () => {
    if (this.isPlayerWalking) {
      return;
    }

    let dx: MoveDir = 0;
    let dy: MoveDir = 0;

    let playerAnimState: WalkAnimState = ''; // 前回と比較用の状態格納変数

    // 十字キー入力
    const c: Types.Input.Keyboard.CursorKeys | undefined = this.cursors;
    // w a s d キー入力
    const s: boolean = this.input.keyboard.addKey('S').isDown;
    const w: boolean = this.input.keyboard.addKey('W').isDown;
    const a: boolean = this.input.keyboard.addKey('A').isDown;
    const d: boolean = this.input.keyboard.addKey('D').isDown;

    let newP = this.p;

    if (!!c) {
      // ここで状態決定（ローカルな変数に格納）
      if (c.up.isDown || w) {
        playerAnimState = 'walkBack';
        dy = -1;
      } else if (c.down.isDown || s) {
        playerAnimState = 'walkFront';
        dy = 1;
      } else if (c.left.isDown || a) {
        playerAnimState = 'walkLeft';
        dx = -1;
      } else if (c.right.isDown || d) {
        playerAnimState = 'walkRight';
        dx = 1;
      } else {
        this.player?.anims.stop();
        this.playerAnimState = '';
        return;
      }

      // ここでアニメーションに適用 & メンバ変数の状態更新
      if (this.playerAnimState != playerAnimState) {
        this.player?.anims.play(playerAnimState);
        this.playerAnimState = playerAnimState;
      }

      console.log(`x : ${this.p.x} y : ${this.p.y}\nc : ${col} r : ${row}`);

      newP = { x: this.p.x + dx, y: this.p.y + dy };

      // 範囲外に出ないようにする
      const x = newP.x;
      const y = newP.y;
      if (x < 0 || x >= col || y < 0 || y >= row) {
        return;
      }

      // 移動先が壁でなければ移動
      if (this.mapGround.getTileValue(x, y) !== 0) {
        return;
      }

      // プレイヤーの座標を更新
      this.p = newP;

      this.isPlayerWalking = true;
      this.gridWalkTween(this.player, this.playerWalkSpeed, dx, dy, () => {
        this.isPlayerWalking = false;
      });
    }
  };
  // =================================================================
  private playerAnimConfig(config: {
    key: string;
    frameStart: number;
    frameEnd: number;
  }): Phaser.Types.Animations.Animation {
    return {
      key: config.key,
      frames: this.anims.generateFrameNumbers(`player`, {
        start: config.frameStart,
        end: config.frameEnd,
      }),
      frameRate: 8,
      repeat: -1,
    };
  }

  private gridWalkTween(
    target: any,
    baseSpeed: number,
    xDir: MoveDir,
    yDir: MoveDir,
    onComplete: () => void,
  ) {
    if (target.x === false) return;
    if (target.y === false) return;

    let tween: Tweens.Tween = this.add.tween({
      // 対象のオブジェクト
      targets: [target],
      // X座標の移動を設定
      x: {
        getStart: () => target.x,
        getEnd: () => target.x + baseSpeed * xDir,
      },
      // X座標の移動を設定
      y: {
        getStart: () => target.y,
        getEnd: () => target.y + baseSpeed * yDir,
      },
      // アニメーションの時間
      duration: 300,
      // アニメーション終了時に発火するコールバック
      onComplete: () => {
        tween.stop(); // Tweenオブジェクトの削除
        onComplete(); // 引数の関数実行
      },
    });
  }
}

export { Test };
