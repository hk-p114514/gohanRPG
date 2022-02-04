import { Scene } from 'phaser';
import { Player } from './Player';

export class System {
  private player: Player;
  static readonly TILE_SIZE: number = 40;

  constructor(player: Player) {
    this.player = player;
  }
}
