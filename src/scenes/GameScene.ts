import { GridPhysics } from './../classes/GridPhysics';
import { GridControls } from './../classes/GridControls';
import { Scene } from 'phaser';
import { Player } from 'classes/Player';
import { Direction } from 'classes/Direction';

export class GameScene extends Scene {
  static readonly TILE_SIZE = 40;
  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;
  constructor() {
    super({
      active: false,
      visible: false,
      key: 'Game', //
    });
  }

  public preload() {}

  public create() {
    // タイルマップを作成、画像と紐付け
    const tilemap = this.make.tilemap({ key: 'cloud-city-map' });
    tilemap.addTilesetImage('Cloud City', 'tiles');

    // 各レイヤーを作成
    for (let i = 0; i < tilemap.layers.length; i++) {
      const layer = tilemap.createLayer(i, 'Cloud City', 0, 0);
      layer.setDepth(i);
      layer.scale = 3;
    }

    // プレイヤーのスプライトを作成
    const playerSprite = this.add.sprite(0, 0, 'player');
    playerSprite.setDepth(2);
    playerSprite.scale = 3;

    // カメラをプレイヤーに追従させる
    this.cameras.main.startFollow(playerSprite);
    this.cameras.main.roundPixels = true;

    // プレイヤーを作成
    const player = new Player(
      playerSprite,
      new Phaser.Math.Vector2(6, 6), // プレイヤーの初期位置
    );

    this.gridPhysics = new GridPhysics(player, tilemap);
    this.gridControls = new GridControls(this.input, this.gridPhysics);

    // 4方向のアニメーションを作成
    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
  }

  public update(_time: number, delta: number) {
    this.gridControls?.update();
    this.gridPhysics?.update(delta);
  }

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
}
