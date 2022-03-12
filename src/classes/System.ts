import { SceneKeys } from './../scenes/sceneKeys';
import { Scene } from 'phaser';
import { BattleActor } from './BattleActor';

export class System {
  static readonly TILE_SIZE: number = 40;
  public map: string;
  public party: BattleActor[] = [];

  constructor(initMap: string, party: BattleActor[]) {
    this.map = initMap;
    this.party = party;
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
