import { Scene, Tilemaps, Game, Cameras, Input, GameObjects, Types } from 'phaser';
import mapJson from '@/json/map002.json';

export const keys = {
  json: 'mapJson',
  image: 'mapTiles',
  player: 'player',
};

class Test2 extends Scene {
  private tileset?: Tilemaps.Tileset;
  private tileMap?: Tilemaps.Tilemap;
  private tileMapLayer?: Tilemaps.TilemapLayer;
  private controls?: Cameras.Controls.FixedKeyControl;
  public player?: Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super({
      key: 'Test2',
    });
  }

  preload = () => {
    this.load.tilemapTiledJSON(keys.json, mapJson);
  };

  create = () => {
    // enterキーでシーンを切り替え
    const enter = this.input.keyboard.addKey('ENTER');
    enter.on('down', () => {
      this.scene.start('Test3');
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
    this.player = this.physics.add
      .sprite(
        Math.floor(spawnPoint.x || 0) || 1,
        Math.floor(spawnPoint.y || 0) || 1,
        'atlas',
        'misa-front',
      )
      .setSize(40, 40)
      .setOffset(0, 24);

    // プレイヤーの設定
    if (!!this.player) {
      this.physics.add.collider(this.player, this.tileMapLayer);
    }
    const anims = this.anims;
    anims.create({
      key: 'misa-left-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-left-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-right-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-right-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-front-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-front-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    anims.create({
      key: 'misa-back-walk',
      frames: anims.generateFrameNames('atlas', {
        prefix: 'misa-back-walk.',
        start: 0,
        end: 3,
        zeroPad: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // カメラの設定
    this.cameras.main.setBounds(
      0,
      0,
      this.tileMap.widthInPixels,
      this.tileMap.heightInPixels,
    );
    // カメラの位置をプレイヤーの位置に設定
    this.cameras.main.startFollow(this.player);

    this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: '18px monospace',
        color: '#000000',
        padding: { x: 20, y: 10 },
        backgroundColor: 'rgba(255,255,255,0.5)',
      })
      .setScrollFactor(0)
      .setDepth(30);

    // Debug graphics
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

  update = (delta: number) => {
    if (!!this.player) {
      console.log(`x: ${this.player.x}, y: ${this.player.y}`);

      // スピードはタイル1マスあたりのスピード
      const speed = 400;
      const prevVelocity = this.player.body.velocity.clone();
      const cursors = this.input.keyboard.createCursorKeys();

      // Stop any previous movement from the last frame
      this.player.body.setVelocity(0);

      // TODO: キー入力、アニメーション設定を関数化する
      // vertical movement
      if (cursors.left.isDown) {
        this.player.body.setVelocityX(-speed);
      } else if (cursors.right.isDown) {
        this.player.body.setVelocityX(speed);
      }

      // horizontal movement
      if (cursors.up.isDown) {
        this.player.body.setVelocityY(-speed);
      } else if (cursors.down.isDown) {
        this.player.body.setVelocityY(speed);
      }

      // Normalize and scale the velocity so that this.player can't move faster along a diagonal
      this.player.body.velocity.normalize().scale(speed);

      // Update the animation last and give left/right animations precedence over up/down animations
      if (cursors.left.isDown) {
        this.player.anims.play('misa-left-walk', true);
      } else if (cursors.right.isDown) {
        this.player.anims.play('misa-right-walk', true);
      } else if (cursors.up.isDown) {
        this.player.anims.play('misa-back-walk', true);
      } else if (cursors.down.isDown) {
        this.player.anims.play('misa-front-walk', true);
      } else {
        this.player.anims.stop();

        // If we were moving, pick and idle frame to use
        if (prevVelocity.x < 0) this.player.setTexture('atlas', 'misa-left');
        else if (prevVelocity.x > 0) {
          this.player.setTexture('atlas', 'misa-right');
        } else if (prevVelocity.y < 0) {
          this.player.setTexture('atlas', 'misa-back');
        } else if (prevVelocity.y > 0) {
          this.player.setTexture('atlas', 'misa-front');
        }
      }
    }
  };

  public static debug = (scene: Scene, tileMapLayer: Tilemaps.TilemapLayer) => {
    // 衝突判定のデバッグレンダリング
    tileMapLayer.renderDebug(scene.add.graphics(), {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
  };
}

export { Test2 };
