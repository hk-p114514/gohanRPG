import { initArray } from './../functions/generalPurpose/initArray';
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

  public getTileValue(x: number, y: number): number {
    return this.tiles[y][x];
  }

  // 指定した座標のtilesの内容を書き換える
  public setTile(row: number, col: number, value: number): void {
    this.tiles[row][col] = value;
  }

  // 指定した行を指定した値で埋める
  public fillRow(row: number, value: number): void {
    this.tiles[row] = initArray(this.col, value);
  }

  // 指定した列を指定した値で埋める
  public fillCol(col: number, value: number): void {
    for (let i = 0; i < this.row; i++) {
      this.tiles[i][col] = value;
    }
  }

  // 指定した範囲を指定した値で埋める
  public fillRange(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    value: number
  ): void {
    for (let i = rowStart; i < rowEnd; i++) {
      for (let j = colStart; j < colEnd; j++) {
        this.tiles[i][j] = value;
      }
    }
  }

  // 指定した範囲を指定した値で囲う
  public encloseRange(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    value: number
  ): void {
    this.fillRange(rowStart, rowEnd, colStart, colEnd, value);
    this.fillRange(rowStart, rowEnd, colStart, colStart, value);
    this.fillRange(rowStart, rowEnd, colEnd, colEnd, value);
    this.fillRange(rowStart, rowStart, colStart, colEnd, value);
    this.fillRange(rowEnd, rowEnd, colStart, colEnd, value);
  }

  // マップの四方を指定した値で埋める
  public fillAll(value: number): void {
    this.fillRow(0, value);
    this.fillRow(this.row - 1, value);
    this.fillCol(0, value);
    this.fillCol(this.col - 1, value);
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
