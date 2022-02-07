import { tileSize } from './../scenes/Test2';
import { GameScene } from './../scenes/GameScene';
import { Direction } from './Direction';
import { Player } from './Player';
import * as Phaser from 'phaser';

const Vector2 = Phaser.Math.Vector2;
type Vector2 = Phaser.Math.Vector2;

export class GridPhysics {
  private movementDirectionVectors: {
    [key in Direction]?: Vector2;
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  };

  private movementDirection: Direction = Direction.NONE;

  private readonly speedPixelsPerSecond: number = tileSize * 4;
  private tileSizePixelsWalked: number = 0;

  private lastMovementIntent = Direction.NONE;

  constructor(private player: Player, private tileMap: Phaser.Tilemaps.Tilemap) {}

  movePlayer(direction: Direction): void {
    this.lastMovementIntent = direction;
    if (this.isMoving()) return;
    if (this.isBlockingDirection(direction)) {
      this.player.stopAnimation(direction);
    } else {
      this.startMoving(direction);
    }
  }

  update(delta: number) {
    if (this.isMoving()) {
      // 移動中なら移動を更新
      this.updatePlayerPosition(delta);
    }
    // 止まっていたらアニメーションを停止
    this.lastMovementIntent = Direction.NONE;
  }

  private isMoving(): boolean {
    return this.movementDirection != Direction.NONE;
  }

  private startMoving(direction: Direction): void {
    // プレイヤーのアニメーションを開始
    this.player.startAnimation(direction);
    // 移動方向を設定
    this.movementDirection = direction;
    // プレイヤーの位置を更新
    this.updatePlayerTilePos();
  }

  private updatePlayerPosition(delta: number) {
    const pixelsToWalkThisUpdate = this.getPixelsToWalkThisUpdate(delta);

    if (!this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.movePlayerSprite(pixelsToWalkThisUpdate);
    } else if (this.shouldContinueMoving()) {
      this.movePlayerSprite(pixelsToWalkThisUpdate);
      this.updatePlayerTilePos();
    } else {
      this.movePlayerSprite(tileSize - this.tileSizePixelsWalked);
      this.stopMoving();
    }
  }

  private updatePlayerTilePos() {
    const dir = this.movementDirectionVectors[this.movementDirection];

    if (dir !== undefined) {
      this.player.setTilePos(this.player.getTilePos().add(dir));
    }
  }

  private movePlayerSprite(pixelsToMove: number) {
    const dir = this.movementDirectionVectors[this.movementDirection];
    if (dir === undefined) return;
    const directionVec = dir.clone();
    const movementDistance = directionVec.multiply(new Vector2(pixelsToMove));
    const newPlayerPos = this.player.getPosition().add(movementDistance);
    this.player.setPosition(newPlayerPos);

    this.tileSizePixelsWalked += pixelsToMove;
    this.tileSizePixelsWalked %= tileSize;
  }

  private getPixelsToWalkThisUpdate(delta: number): number {
    const deltaInSeconds = delta / 1000;
    return this.speedPixelsPerSecond * deltaInSeconds;
  }

  private stopMoving(): void {
    this.player.stopAnimation(this.movementDirection);
    this.movementDirection = Direction.NONE;
  }

  private willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate: number): boolean {
    return this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= tileSize;
  }

  private shouldContinueMoving(): boolean {
    return (
      this.movementDirection == this.lastMovementIntent &&
      !this.isBlockingDirection(this.lastMovementIntent)
    );
  }

  private isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction));
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    const dir = this.movementDirectionVectors[direction];
    if (dir === undefined) return new Vector2(-1, -1);

    return this.player.getTilePos().add(dir);
  }

  private hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true;
    return this.tileMap.layers.some((layer) => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
      return tile && tile.properties.collides;
    });
  }

  private hasNoTile(pos: Vector2): boolean {
    return !this.tileMap.layers.some((layer) =>
      this.tileMap.hasTileAt(pos.x, pos.y, layer.name),
    );
  }
}
