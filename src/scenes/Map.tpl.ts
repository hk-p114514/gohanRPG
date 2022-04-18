import { probabilityToDenominator } from 'functions/generalPurpose/probabilityToDenominator';
// assets
// import marc from '@/assets/characters/dynamic/marc.png';
import mapImg from '@/assets/maps/map001.png';
import { BattleActor } from 'classes/BattleActor';
import log1 from '@/assets/items/hatena.png';
import log2 from '@/assets/items/ikari.png';
import log3 from '@/assets/items/kantanhu.png';
import log4 from '@/assets/items/mugon.png';
import log5 from '@/assets/items/onpu.png';
// classes
import { GridControls } from 'classes/GridControls';
import { GridPhysics } from 'classes/GridPhysics';
import { Player } from 'classes/Player';
import { Scene, Tilemaps, Types } from 'phaser';
import { Timelines } from 'classes/Timelines';
import { select } from 'classes/timelineWords';
// values
import { system } from 'index';
import { charas } from 'classes/Characters';
import { map, events, hints, npcs, funcs, names } from 'classes/exam';
import { sceneKeys } from './sceneKeys';

// functions
import { getEnemies } from 'functions/generalPurpose/getEnemies';
import { marc } from 'friends';
import { randI } from 'functions/generalPurpose/rand';

export const tileSize: number = 40;
export const characterSize: number = 32;
export const assetKeys = {
  mapImg: 'mapImg',
  player: 'player',
};
export class Map_TPL extends Scene {
  public static readonly PROBABILITY_OF_BATTLE = 5; // パーセント
  public tileset?: Tilemaps.Tileset;
  public tileMap?: Tilemaps.Tilemap;
  public tileMapLayer?: Tilemaps.TilemapLayer;
  public player?: Player;
  public enemies: BattleActor[];
  private eventPoints?: Types.Tilemaps.TiledObject[];
  private hintPoints?: Types.Tilemaps.TiledObject[];
  public npcPoints?: Types.Tilemaps.TiledObject[];
  private gridControls?: GridControls;
  private gridPhysics?: GridPhysics;
  public flag: number = -1;
  public xy: Phaser.Math.Vector2 = new Phaser.Math.Vector2(-1, -1);
  private mapName: string;
  public battleFlag: boolean = true;
  public log?: Phaser.GameObjects.Sprite;
  public boss?: Phaser.GameObjects.Sprite;

  constructor(private json: string, public name: string) {
    super({ key: name });
    this.enemies = getEnemies(name);
    this.mapName = name;
  }
  public preload() {
    this.load.image(assetKeys.mapImg, mapImg);
    this.load.tilemapTiledJSON(this.name, this.json);
    this.load.image('mapTiles', mapImg);

    this.load.spritesheet('player', marc.spriteSrc, {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
    this.load.image('log1', log1);
    this.load.image('log2', log2);
    this.load.image('log3', log3);
    this.load.image('log4', log4);
    this.load.image('log5', log5);
  }
  public loadBossimage(name: string, tex: string) {
    this.load.image(name, tex);
  }
  //各MapClassのloadで使うnpcの姿を決める関数
  //name=npcName,n=npcImage(Charas参照)
  public setnpcimage(name: string, n: number, src: string = '') {
    if (src !== '') {
      this.load.spritesheet(name, src, {
        frameWidth: characterSize,
        frameHeight: characterSize,
      });
    } else {
      this.load.spritesheet(name, charas[n], {
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
            timelineData: n,
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
        timelineData: select,
      });
    });
    // Bキーでバトルシーンに移行(現在のシーンは破棄せずにストップさせるだけにして、バトルシーンから戻ったら再開する)
    const B = this.input.keyboard.addKey('B').on('down', () => {
      this.moveBattle();
    });

    const G = this.input.keyboard.addKey('g').on('down', () => {
      system.collidesFlag = !system.collidesFlag;
    });
    const F = this.input.keyboard.addKey('F').on('down', () => {
      system.battleFlag = !system.battleFlag;
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
      this.xy = new Phaser.Math.Vector2(tileX, tileY);
      this.player = new Player(playerSprite, new Phaser.Math.Vector2(tileX, tileY));
    }

    // グリッドの設定
    if (this.player) {
      this.gridPhysics = new GridPhysics(this.player, this.tileMap);
      this.gridControls = new GridControls(this.input, this.gridPhysics);
    }
  }

  public update(_time: number, delta: number) {
    if (this.battleFlag) {
      if (!this.gridPhysics?.isMoving()) {
        if (!!this.player) {
          let nxy = this.player.getTilePos();
          const { x, y } = this.xy;
          if (x === undefined || y === undefined) return;
          if (x !== nxy.x || y !== nxy.y) {
            this.xy = this.player.getTilePos();
            //踏むイベントの確認
            const denominator = probabilityToDenominator(Map_TPL.PROBABILITY_OF_BATTLE);
            console.log(`1 / ${denominator}の確率でバトル`);
            if (!!events.has(system.map + ',' + this.xy.x + ',' + this.xy.y)) {
              let n = events.get(system.map + ',' + this.xy.x + ',' + this.xy.y);
              this.scene.launch(sceneKeys.timelinePlayer, {
                anotherScene: this,
                timelineData: n,
              });
            } else if (!randI(denominator)) {
              this.moveBattle();
            }
          } else {
            this.gridControls?.update();
          }
        }
      }
      this.gridPhysics?.update(delta);
    }
  }

  public setBoss(x: number, y: number, boss: string, scale = 0.5) {
    this.boss = this.add
      .sprite(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, boss)
      .setScale(scale);
  }

  // 座標からオブジェクトを削除
  public createEvents() {
    funcs.set(this.name + ',kill', (s: any[]) => {
      for (let i = 0; i < s.length; ++i) {
        events.delete(this.name + ',' + s[i][0] + ',' + s[i][1]);
      }
    });

    // 名前からオブジェクトを削除
    funcs.set(this.name + ',delete', (s: any[]) => {
      if (names.has(this.name + s[0])) {
        events.delete(names.get(this.name + s[0]));
        names.delete(this.name + s[0]);
      }
    });

    funcs.set(this.name + ',event', (s: any[]) => {
      if (s[4] === undefined) {
        // events.set(this.name + ',' + s[1] + ',' + s[2], s[3]);
        // names.set(s[0], this.name + ',' + s[1] + ',' + s[2]);
        // template literalに書き換える
        events.set(`${this.name},${s[1]},${s[2]}`, s[3]);
        names.set(s[0], `${this.name},${s[1]},${s[2]}`);
      } else {
        // events.set(s[4] + ',' + s[1] + ',' + s[2], s[3]);
        // names.set(s[0], s[4] + ',' + s[1] + ',' + s[2]);
        // template literalに書き換える
        events.set(`${s[4]},${s[1]},${s[2]}`, s[3]);
        names.set(s[0], `${s[4]},${s[1]},${s[2]}`);
      }
    });

    //誰かが振り向くイベント
    funcs.set(this.name + ',chdir', (s: any[]) => {
      if (names.has(system.map + s[0])) {
        let a = names.get(system.map + s[0]);
        let b = npcs.get(a);
        b.changedir(s[1]);
      } else if (s[0] === 'player') {
        this.player?.changedir(s[1]);
      } else {
        console.log('not found');
      }
    });

    //誰かを配置するイベント
    funcs.set(this.name + ',set', (s: any[]) => {
      hints.set(system.map + ',' + s[1] + ',' + s[2], s[3]);
      let l = this.add.sprite(0, 0, s[0], 1);
      let hito = new Player(l, new Phaser.Math.Vector2(s[1], s[2]), s[0]);
      npcs.set(system.map + ',' + s[1] + ',' + s[2], hito);
      names.set(system.map + s[0], system.map + ',' + s[1] + ',' + s[2]);
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
      } else {
        console.log('not found');
      }
    });

    //bossを消し去るイベント
    funcs.set(this.name + ',break', (s: any[]) => {
      this.boss?.destroy();
      system.isBossKilled.set(s[0], true);
    });

    //プレイヤーを一マス動かすイベント
    funcs.set(this.name + ',move', (s: any[]) => {
      this.gridPhysics?.movePlayer(s[0]);
    });

    // 誰かが呟くアイコンを表示するイベント
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
      } else {
        console.log('not found');
      }
    });

    funcs.set(this.name + ',bosslog', (s: any[]) => {
      let x = this.boss?.x;
      let y = this.boss?.y;
      if (x !== undefined && y !== undefined) {
        y -= tileSize;
        this.log?.destroy();
        this.log = this.add.sprite(x, y, 'log' + s[0]);
      } else {
        console.log('humei');
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

    funcs.set(this.name + ',battle', (s: any[]) => {
      system.isBossBattle = true;
      system.boss = s[0];
      return this.moveBattle();
    });
  }

  moveBattle() {
    if (!getEnemies(system.map).length) return;
    this.battleFlag = false;
    const effectsTime = 500;
    this.cameras.main.flash(effectsTime);
    this.scene.switch(sceneKeys.battle);
    this.battleFlag = true;
  }

  zoomUp() {
    this.cameras.main.zoomTo(2, 1000);
  }

  zoomDown() {
    this.cameras.main.zoomTo(1, 1000);
  }
}
