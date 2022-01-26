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

  /**
   * 現在のマップを一つ次のマップに進める
   * @returns {boolean} 現在のマップが一つ次のマップに進んだ場合はtrue、そうでない場合はfalse
   */
  public nextMap(): boolean {
    if (this.current >= this.maps.length - 1) {
      this.current = 0;
      return true;
    } else {
      this.current++;
      return false;
    }
  }

  /**
   * 現在のマップを一つ前のマップに戻す
   * @returns {boolean} 現在のマップが一つ前のマップに戻った場合はtrue、そうでない場合はfalse
   */
  public prevMap(): boolean {
    if (this.current <= 0) {
      this.current = this.maps.length - 1;
      return true;
    } else {
      this.current--;
      return false;
    }
  }
}
