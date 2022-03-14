import { SceneKeys } from './../scenes/sceneKeys';
import { Scene } from 'phaser';
import { BattleActor } from './BattleActor';

export class System {
  public player: BattleActor;
  public map: string;
  static readonly TILE_SIZE: number = 40;

  constructor(initMap: string, playerStatus: BattleActor) {
    this.map = initMap;
    this.player = playerStatus;
  }

  public preload() {}

  public startMap(from: Scene, to: SceneKeys): number {
    if (from.scene.key === to) {
      return 1;
    }
    this.map = to;
    from.scene.start(to);

    return 0;
  }

  public switchMap(from: Scene, to: SceneKeys): number {
    if (from.scene.key === to) {
      return 1;
    }
    this.map = to;
    from.scene.switch(to);

    return 0;
  }
}
