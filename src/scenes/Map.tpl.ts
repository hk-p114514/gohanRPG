// assets
import player from '@/assets/characters/dynamic/player.png';
import mapImg from '@/assets/maps/map001.png';
import { BattleActor } from 'classes/BattleActor';
// classes
import { GridControls } from 'classes/GridControls';
import { GridPhysics } from 'classes/GridPhysics';
import { Player } from 'classes/Player';
import { Scene, Tilemaps, Types } from 'phaser';
import { Timelines } from 'classes/Timelines';

// values
import { timelineData } from 'classes/timelineWords';
import { system } from 'index';
import { charas } from 'classes/Characters';
import { NPC, map, events, hints, npcs, funcs, names } from 'classes/exam';
import { sceneKeys } from './sceneKeys';

// functions
import { getEnemies } from 'functions/generalPurpose/getEnemies';

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
  private hintPoints?: Types.Tilemaps.TiledObject[];
  private npcPoints?: Types.Tilemaps.TiledObject[];
  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;
  public flag: number = -1;
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
  public setNpcImage(s: Array<string>, n: number) {
    for (let i = 0; i < s.length; ++i) {
      this.load.spritesheet(s[i], charas[n], {
        frameWidth: characterSize,
        frameHeight: characterSize,
      }); //console.log(system.map);
    }
  }
  public makeNPC(name: string, took: Timelines) {
    for (let i = 0; !!this.npcPoints && i < this.npcPoints.length; ++i) {
      let e = this.npcPoints[i];
      if (name === e.name && !!e.x && !!e.y) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        hints.set(system.map + ',' + x + ',' + y, took);
        let l = this.add.sprite(0, 0, name, 1);
        let hito = new NPC(name, l, new Phaser.Math.Vector2(x, y));
        npcs.set(system.map + ',' + x + ',' + y, hito);
        names.set(name, hito);
        console.log(system.map + ',' + x + ',' + y);
      }
    }
  }
  public setEvent(name: string, took: Timelines) {
    for (let i = 0; !!this.eventPoints && i < this.eventPoints.length; ++i) {
      let e = this.eventPoints[i];
      if (name === e.name && !!e.x && !!e.y) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        events.set(system.map + ',' + x + ',' + y, took);
      }
    }
  }
  public setHint(name: string, took: Timelines) {
    for (let i = 0; !!this.hintPoints && i < this.hintPoints.length; ++i) {
      let e = this.hintPoints[i];
      if (name === e.name && !!e.x && !!e.y) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        hints.set(system.map + ',' + x + ',' + y, took);
      }
    }
  }

  public create() {
    const space = this.input.keyboard.addKey('SPACE').on('down', () => {
      console.log(this.player);
      if (this.gridPhysics?.isMoving()) return;
      if (!!this.player) {
        let xy = this.player.getTilePos();
        let z = this.player.getdir();
        xy.x += map.get(z).x;
        xy.y += map.get(z).y;
        if (!!hints.has(system.map + ',' + xy.x + ',' + xy.y)) {
          let n = hints.get(system.map + ',' + xy.x + ',' + xy.y);
          this.scene.launch(sceneKeys.timelinePlayer, {
            anotherScene: this,
            timelinedata: n,
          });
        } else {
          console.log('?');
        }
        console.log(system.map + ',' + xy.x + ',' + xy.y);
      }
    });
    // Bキーでバトルシーンに移行(現在のシーンは破棄せずにストップさせるだけにして、バトルシーンから戻ったら再開する)
    const B = this.input.keyboard.addKey('B').on('down', () => {
      this.moveBattle();
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
      return obj.type === 'event';
    });
    console.log(this.eventPoints);
    this.hintPoints = this.tileMap.filterObjects('objects', (obj) => {
      return obj.type === 'hint';
    });
    console.log(this.hintPoints);
    this.npcPoints = this.tileMap.filterObjects('objects', (obj) => {
      return obj.type === 'npc';
    });
    console.log(this.npcPoints);
    // イベントを作成する
    this.createEvents();
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

    const { x, y } = spawnPoint;
    if (x && y) {
      // タイルの位置を取得
      const tileX = Math.floor(x / tileSize);
      const tileY = Math.floor(y / tileSize);
      this.player = new Player(playerSprite, new Phaser.Math.Vector2(tileX, tileY));
    }

    // グリッドの設定
    if (this.player) {
      this.gridPhysics = new GridPhysics(this.player, this.tileMap);
      this.gridControls = new GridControls(this.input, this.gridPhysics);
    }
    const shift = this.input.keyboard.addKey('SHIFT').on('down', () => {});

    // Debug graphics
    this.enableDebugMode();
    //Dialog==================================================================
    const push = this.input.keyboard.addKey('SHIFT');
    push.on('down', () => {
      this.scene.launch(sceneKeys.timelinePlayer, {
        anotherScene: this,
        timelinedata: timelineData,
      });
    });
    //Dialog==================================================================
  }
  public xy: Phaser.Math.Vector2 = new Phaser.Math.Vector2(-1, -1);
  public update(_time: number, delta: number) {
    if (!this.gridPhysics?.isMoving()) {
      if (!!this.player) {
        let nxy = this.player.getTilePos();
        if (this.xy.x !== nxy.x || this.xy.y !== nxy.y) {
          this.xy = this.player.getTilePos();
          if (!!events.has(system.map + ',' + this.xy.x + ',' + this.xy.y)) {
            let n = events.get(system.map + ',' + this.xy.x + ',' + this.xy.y);
            this.scene.launch(sceneKeys.timelinePlayer, {
              anotherScene: this,
              timelinedata: n,
            });
          } else if (this.tileMap?.hasTileAt(this.xy.x, this.xy.y, 'www')) {
            console.log('?');
          }
        } else {
          this.gridControls?.update();
          //console.log(this.player.getSprite());
        }
        //console.log(system.map + ',' + xy.x + ',' + xy.y);
      }
      //console.log(this.player?.getTilePos());
    }
    this.gridPhysics?.update(delta);
  }

  public createEvents() {
    funcs.set('talk', () => {
      if (!!this.player) {
        let xy = this.player.getTilePos();
        let z = this.player.getdir();
        xy.x += map.get(z).x;
        xy.y += map.get(z).y;
        if (!!npcs.has(system.map + ',' + xy.x + ',' + xy.y)) {
          let n = npcs.get(system.map + ',' + xy.x + ',' + xy.y);
          n.changedir(this.player.getredir());
        } else {
          console.log('?');
        }
        console.log(system.map + ',' + xy.x + ',' + xy.y);
      }
      console.log('dekitawa');
    });
    funcs.set('chdir', () => {});
    funcs.set('move', () => {});
    funcs.set('log', () => {});
    funcs.set('warp', () => {});
  }

  moveBattle() {
    const effectsTime = 500;
    this.cameras.main.shake(effectsTime);
    this.cameras.main.flash(effectsTime);
    // カメラのシェイクを終了するまで待つ
    this.time.delayedCall(effectsTime, () => {
      // switch -> sleep + start
      this.scene.switch(sceneKeys.battle);
    });
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
