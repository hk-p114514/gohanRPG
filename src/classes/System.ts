import { SceneKeys, sceneKeys } from './../scenes/sceneKeys';
import { Scene, Textures } from 'phaser';
import { Player } from './Player';

export class System extends Scene {
  public player?: Player;
  private playerSprite: string;
  public map: string;
  static readonly TILE_SIZE: number = 40;

  constructor(playerSprite: string, map: string) {
    super({ key: sceneKeys.system });
    this.map = map;
    this.playerSprite = playerSprite;
  }

  public preload() {}

  public createPlayer(scene: Scene, texture: string | Textures.Texture) {
    scene.add.sprite(0, 0, texture);
  }

  public moveMap(from: Scene, to: SceneKeys): number {
    if (from.scene.key === to) {
      return 1;
    }
    this.scene.start(to);

    return 0;
  }
}
