import { init2DArray } from 'functions/generalPurpose/init2DArray';
import { randI } from './../functions/generalPurpose/rand';

export class Map {
  private row: number;
  private col: number;

  // マップを表す2次元配列
  private tiles: number[][];

  // tilesの内容の種類数
  private tileTypes: number;

  constructor(row: number, col: number, tileTypes: number) {
    this.tiles = init2DArray(row, col, 0);
    this.tileTypes = tileTypes;
    this.row = row;
    this.col = col;
  }

  // マップを表す2次元配列を返す
  public getTiles(): number[][] {
    return this.tiles;
  }

  // 指定した座標のtilesの内容を書き換える
  public setTile(row: number, col: number, value: number): void {
    this.tiles[row][col] = value;
  }

  // 指定した枚数のランダムな値をtilesに設定する
  public setRandomTiles(count: number): void {
    for (let i = 0; i < count; i++) {
      const row: number = randI(this.row);
      const col: number = randI(this.col);
      const value: number = randI(this.tileTypes);
      this.setTile(row, col, value);
    }
  }

  // 完全にランダムにマップを書き換える
  public setRandomMap(): void {
    const changeTiles: number = randI(this.row * this.col);
    this.setRandomTiles(changeTiles);
  }
}
