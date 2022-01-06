import { GameObjects, Scene, Tilemaps, Tweens } from 'phaser';
import mapTiles from '@/assets/maps/simpleMap.png';
import player from '@/assets/characters/player.png';
import { H, W } from 'functions/DOM/windowInfo';
import { Map } from 'classes/Map';

// 32x32の画像を使用する
const tileSize: number = 32;

const height = H();
const width = W();

// マップチップの数 = 画面サイズ / マップチップサイズ
const row: number = Math.floor(height / tileSize) - 3;
const col: number = Math.floor(width / tileSize);

type WalkAnimState = 'walkFront' | 'walkBack' | 'walkLeft' | 'walkRight' | '';
type MoveDir = -1 | 0 | 1;

class Game extends Scene {
  private map?: Tilemaps.Tilemap;
  private tiles?: Tilemaps.Tileset;
  private mapGroundLayer?: Phaser.Tilemaps.TilemapLayer;
  private player?: GameObjects.Sprite;
  private mapGround: Map = new Map(row, col, 3);
  private playerAnims: { key: string; frameStart: number; frameEnd: number }[] = [
    { key: 'walkFront', frameStart: 0, frameEnd: 2 },
    { key: 'walkLeft', frameStart: 3, frameEnd: 5 },
    { key: 'walkRight', frameStart: 6, frameEnd: 8 },
    { key: 'walkBack', frameStart: 9, frameEnd: 11 },
  ];
  private playerAnimState?: WalkAnimState;
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private isPlayerWalking: boolean = false;
  private playerWalkSpeed: number = tileSize;
  private p: { x: number; y: number };

  constructor() {
    super({ key: 'Game' });
    // マップの真ん中にプレイヤーを配置
    this.p = { x: col / 2, y: row / 2 };
  }

  // =================================================================
  init = () => {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.playerAnimState = '';

    this.isPlayerWalking = false;
  };

  preload = () => {
    this.load.image('mapTiles', mapTiles);
    this.load.spritesheet('player', player, {
      frameWidth: tileSize,
      frameHeight: tileSize,
    });
  };

  create = () => {
    let playerPos: Phaser.Math.Vector2;

    // マップのタイルをランダムに設定
    this.mapGround.setRandomMap();
    console.log(this.mapGround.getTiles());
    this.map = this.make.tilemap({
      data: this.mapGround.getTiles(),
      tileWidth: tileSize,
      tileHeight: tileSize,
    });
    this.tiles = this.map.addTilesetImage('mapTiles');
    this.mapGroundLayer = this.map.createLayer(0, this.tiles, 0, 0);

    playerPos = this.mapGroundLayer.tileToWorldXY(this.p.x, this.p.y);
    this.player = this.add.sprite(playerPos.x, playerPos.y, 'player', 0);
    this.player.setOrigin(0);
    this.player.setDisplaySize(tileSize, tileSize);

    for (let pAnim of this.playerAnims) {
      // ヒーローアニメーションの数だけループ
      if (this.anims.create(this.playerAnimConfig(pAnim)) === false) continue; // もしfalseが戻って来ればこの後何もしない
    }
    this.player.anims.play('walkFront');
  };

  update = () => {
    if (this.isPlayerWalking) {
      return;
    }

    let dx: MoveDir = 0;
    let dy: MoveDir = 0;

    let playerAnimState: WalkAnimState = ''; // 前回と比較用の状態格納変数
    const c: Phaser.Types.Input.Keyboard.CursorKeys | undefined = this.cursors;

    if (!!c) {
      // ここで状態決定（ローカルな変数に格納）
      if (c.up.isDown) {
        playerAnimState = 'walkBack';
        dy = -1;
      } else if (c.down.isDown) {
        playerAnimState = 'walkFront';
        dy = 1;
      } else if (c.left.isDown) {
        playerAnimState = 'walkLeft';
        dx = -1;
      } else if (c.right.isDown) {
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
    onComplete: () => void
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

export { Game };
