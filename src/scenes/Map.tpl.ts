// assets
import player from '@/assets/characters/dynamic/player.png';
import mapImg from '@/assets/maps/map001.png';
import { BattleActor } from 'classes/BattleActor';
import log1 from '@/assets/items/hatena.png';
import log2 from '@/assets/items/ikari.png';
import log3 from '@/assets/items/kantanhu.png';
import log4 from '@/assets/items/mugon.png';
// classes
import { GridControls } from 'classes/GridControls';
import { GridPhysics } from 'classes/GridPhysics';
import { Player } from 'classes/Player';
import { Scene, Tilemaps, Types } from 'phaser';
import { Timelines } from 'classes/Timelines';
import { select } from 'classes/timelineWords';
// values
import { timelineData } from 'classes/timelineWords';
import { system } from 'index';
import { charas } from 'classes/Characters';
import { map, events, hints, npcs, funcs, names } from 'classes/exam';
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
    this.load.image('log1', log1);
    this.load.image('log2', log2);
    this.load.image('log3', log3);
    this.load.image('log4', log4);
  }
  //各MapClassのloadで使うnpcの姿を決める関数
  //name=npcName,n=npcImage(Charas参照)
  public setnpcimage(name: Array<string>, n: number) {
    for (let i = 0; i < name.length; ++i) {
      this.load.spritesheet(name[i], charas[n], {
        frameWidth: characterSize,
        frameHeight: characterSize,
      }); //console.log(system.map);
    }
  }
  //各MapClassのcreateで使うnpcを配置する関数
  //name=npcName,took=npcとの会話イベント(timelineWords参照)
  public makeNPC(name: string, took: Timelines) {
    for (let i = 0; !!this.npcPoints && i < this.npcPoints.length; ++i) {
      let e = this.npcPoints[i];
      if (name === e.name && e.x !== undefined && e.y !== undefined) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        hints.set(system.map + ',' + x + ',' + y, took);
        let l = this.add.sprite(0, 0, name, 1);
        let hito = new Player(l, new Phaser.Math.Vector2(x, y), name);
        npcs.set(system.map + ',' + x + ',' + y, hito);
        names.set(system.map + name, system.map + ',' + x + ',' + y);
        console.log(system.map + ',' + x + ',' + y);
      }
    }
  }
  //各MapClassのcreateで使うふむタイプのイベントを配置する関数
  //name=eventName,took=イベント内容(timelineWords参照)
  public setEvent(name: string, took: Timelines) {
    for (let i = 0; !!this.eventPoints && i < this.eventPoints.length; ++i) {
      let e = this.eventPoints[i];
      if (name === e.name && e.x !== undefined && e.y !== undefined) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        names.set(system.map + name, system.map + ',' + x + ',' + y);
        events.set(system.map + ',' + x + ',' + y, took);
      }
    }
  }
  //各MapClassのcreateで使う調べるタイプのイベントを配置する関数
  //name=eventName,took=イベント内容(timelineWords参照)
  public setHint(name: string, took: Timelines) {
    for (let i = 0; !!this.hintPoints && i < this.hintPoints.length; ++i) {
      let e = this.hintPoints[i];
      if (name === e.name && e.x !== undefined && e.y !== undefined) {
        let x = Math.floor(e.x / tileSize),
          y = Math.floor(e.y / tileSize);
        hints.set(system.map + ',' + x + ',' + y, took);
      }
    }
  }

  public create() {
    //話しかけるor調べるkey
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

    const shift = this.input.keyboard.addKey('SHIFT').on('down', () => {
      this.scene.launch(sceneKeys.timelinePlayer, {
        anotherScene: this,
        timelinedata: select,
      });
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

    // 踏むイベントの位置を取得
    this.eventPoints = this.tileMap.filterObjects('objects', (obj) => {
      return obj.type === 'event';
    });
    console.log(this.eventPoints);
    // 調べるイベントの位置を取得
    this.hintPoints = this.tileMap.filterObjects('objects', (obj) => {
      return obj.type === 'hint';
    });
    console.log(this.hintPoints);
    // npcの位置を取得
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
    if (x !== undefined && y !== undefined) {
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
    // Debug graphics
    this.enableDebugMode();
    // //Dialog==================================================================
    // const push = this.input.keyboard.addKey('SHIFT').on('down', () => {
    //   this.scene.launch(sceneKeys.timelinePlayer, {
    //     anotherScene: this,
    //     timelinedata: timelineData,
    //   });
    // });
    // //Dialog==================================================================
  }
  public xy: Phaser.Math.Vector2 = new Phaser.Math.Vector2(-1, -1);
  public update(_time: number, delta: number) {
    if (!this.gridPhysics?.isMoving()) {
      if (!!this.player) {
        let nxy = this.player.getTilePos();
        if (this.xy.x !== nxy.x || this.xy.y !== nxy.y) {
          this.xy = this.player.getTilePos();
          //踏むイベントの確認
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
  public log?: Phaser.GameObjects.Sprite;
  //話しかけた奴が振り向くイベント
  public createEvents() {
    // funcs.set(this.name + ',flash', (s: any[]) => {
    //   this.cameras.main.fadeIn(10);
    //   //this.cameras.main.fadeOut();
    // });
    // funcs.set(this.name + ',open', (s: any[]) => {});
    // funcs.set(this.name + ',delete', (s: any[]) => {
    //   system.bossflag.set(s[0], false);
    // });
    funcs.set(this.name + ',delete', (s: any[]) => {
      if (names.has(this.name + s[0])) {
        events.delete(names.get(this.name + s[0]));
        names.delete(this.name + s[0]);
      }
    });
    funcs.set(this.name + ',event', (s: any[]) => {
      events.set(this.name + ',' + s[1] + ',' + s[2], s[3]);
      names.set(s[0], this.name + ',' + s[1] + ',' + s[2]);
    });
    funcs.set(this.name + ',talk', () => {
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
    //誰かが振り向くイベント
    funcs.set(this.name + ',chdir', (s: any[]) => {
      if (names.has(system.map + s[0])) {
        let a = names.get(system.map + s[0]);
        let b = npcs.get(a);
        b.changedir(s[1]);
      } else if (s[0] === 'player') {
        this.player?.changedir(s[1]);
      }
    });
    //誰かを配置するイベント
    funcs.set(this.name + ',set', (s: any[]) => {
      hints.set(system.map + ',' + s[1] + ',' + s[2], s[3]);
      let l = this.add.sprite(0, 0, s[0], 1);
      let hito = new Player(l, new Phaser.Math.Vector2(s[1], s[2]), s[0]);
      npcs.set(system.map + ',' + s[1] + ',' + s[2], hito);
      names.set(s[0], system.map + ',' + s[1] + ',' + s[2]);
      console.log(system.map + ',' + s[1] + ',' + s[2]);
    });
    //誰かを消し去るイベント
    funcs.set(this.name + ',reset', (s: any[]) => {
      if (names.has(system.map + s[0])) {
        let a = names.get(system.map + s[0]);
        let b = npcs.get(a);
        b.destroy();
        npcs.delete(a);
        names.delete(system.map + s[0]);
      }
    });
    //プレイヤーを一マス動かすイベント
    funcs.set(this.name + ',move', (s: any[]) => {
      this.gridPhysics?.movePlayer(s[0]);
    });
    //誰かが呟くイベント
    funcs.set(this.name + ',log', (s: any[]) => {
      if (names.has(system.map + s[0])) {
        let a = names.get(system.map + s[0]);
        let b = npcs.get(a);
        let c = b.getPosition();
        c.y -= tileSize;
        this.log?.destroy();
        this.log = this.add.sprite(c.x, c.y, 'log' + s[1]);
      } else if (s[0] === 'player') {
        if (this.player) {
          let c = this.player.getPosition();
          c.y -= tileSize;
          this.log?.destroy();
          this.log = this.add.sprite(c.x, c.y, 'log' + s[1]);
        }
      }
    });
    //誰かの呟きを消し去るイベント
    funcs.set(this.name + ',relog', (s: any[]) => {
      this.log?.destroy();
    });
    //プレイヤーをどこかに飛ばすイベント
    funcs.set(this.name + ',warp', (s: any[]) => {
      this.player?.moveTilePos(s[0], s[1]);
    });
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
}
