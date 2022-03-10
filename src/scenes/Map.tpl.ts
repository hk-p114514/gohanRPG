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
import { system } from 'index';
import { Scene, Tilemaps, Types } from 'phaser';
import { playerAnims } from 'playerAnims';
import {charas} from 'classes/Characters';
import {NPC,map} from 'classes/exam'
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
  public flag:number=-1;
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
  public npcs=new Array();
  public cn:number=0;
  public makeNPC(char:number,x:number,y:number,took:Array<string>,eve?:Function){
    this.load.spritesheet(system.map+','+'npc'+this.cn,charas[char], {
      frameWidth: characterSize,
      frameHeight: characterSize,
    });
    this.npcs.push([x,y,took.concat(),(eve===undefined?()=>{}:eve)]);
    ++this.cn;
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
      // this.cameras.main.shake(500);
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
    const shift = this.input.keyboard.addKey('SHIFT');
    shift.on('down', () => {
      if(!!this.player){
        let xy=this.player.getTilePos();
        let z=this.player.getdir();
        xy.x+=map.get(z).x;
        xy.y+=map.get(z).y;
        if(this.flag!=-1){
          let n=map.get(system.map+','+xy.x+","+xy.y);
          if(n.took.length<=this.flag){
            this.flag=-1;
            n.event();
          }else{
            console.log(n.took[this.flag]);
            ++this.flag;
          }
        }else if(!!map.has(system.map+','+xy.x+","+xy.y)){
          let n=map.get(system.map+','+xy.x+","+xy.y);
          if(n.object=='npc'){
            switch(z){
              case "up":n.changedir("NDOWN");break;
              case "down":n.changedir("NUP");break;
              case "left":n.changedir("NRIGHT");break;
              case "right":n.changedir("NLEFT");break;
            }
          }else if(n.object=='box'){

          }
          console.log(n.took[0]);
          this.flag=1;
        }else{
          console.log("?");
        }
        console.log(system.map+','+xy.x+","+xy.y);
      }
    });
    for(let i=0;i<this.cn;++i){
      //console.log(system.map);
      let l=this.add.sprite(0, 0, system.map+','+'npc'+i);
      map.set(system.map+','+this.npcs[i][0]+','+this.npcs[i][1],
      new NPC(i,l, new Phaser.Math.Vector2(
        this.npcs[i][0],this.npcs[i][1]),
        this.npcs[i][2],this.npcs[i][3]));
        this.tileMap.putTileAt(this.tileMap.getTileAt(0,0, false,'worldLayer'),this.npcs[i][0],this.npcs[i][1],false,'worldLayer');
        console.log(system.map+','+this.npcs[i][0]+','+this.npcs[i][1]);
    }

    // Debug graphics
    this.enableDebugMode();
  }

  public update(_time: number, delta: number) {
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
