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
import npc from '@/assets/characters/dynamic/sample013.png';
import { characterSize } from './Test2';
import { tileSize } from './../index';
import {GameObjects } from 'phaser';
import { GameScene } from './../scenes/GameScene';
import { playerAnims } from './../scenes/Test2';
type Vector2 = Phaser.Math.Vector2;
export class NPC{
  constructor(
    /* parameter properties */
    private sprite: GameObjects.Sprite,
    private tilePos: Vector2,
    private took:Array<string>,
  ) {
    const offsetX = tileSize/2;
    const offsetY = tileSize/2;
    this.sprite.setPosition(
      tilePos.x * tileSize + offsetX,
      tilePos.y * tileSize + offsetY,
    );
    this.sprite.setFrame(1);
  }

  getPosition(): Vector2 {
    return this.sprite.getBottomCenter();
  }

  setPosition(position: Vector2): void {
    this.sprite.setPosition(position.x, position.y);
  }

  stopAnimation(direction: string) {
    const animationManager = this.sprite.anims.animationManager;
    const standingFrame = animationManager.get(direction).frames[1].frame.name;
    this.sprite.anims.stop();
    this.sprite.setFrame(standingFrame);
  }

  startAnimation(direction:string) {
    this.sprite.anims.play(direction);
  }

  getTilePos(): Vector2 {
    return this.tilePos.clone();
  }

  setTilePos(tilePosition: Vector2): void {
    this.tilePos = tilePosition.clone();
  }

  getSprite(): GameObjects.Sprite {
    return this.sprite;
  }
}

export let map=new Map();
map.set("left",new Phaser.Math.Vector2(-1,0));
map.set("right",new Phaser.Math.Vector2(1,0));
map.set("up",new Phaser.Math.Vector2(0,-1));
map.set("down",new Phaser.Math.Vector2(0,1));