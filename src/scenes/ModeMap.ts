import { Map } from 'classes/Map';

export class ModeMap {
  private maps: Map[];
  private current: number = 0;
  constructor(maps: Map[]) {
    this.maps = maps;
  }

  public getCurrentMap(): Map {
    return this.maps[this.current];
  }

  public setCurrentMap(newMapIndex: number): void {
    this.current = newMapIndex;
  }
}
