import { Player } from './Player';
import { ModeMap } from 'scenes/ModeMap';

class System {
  private player: Player;
  private map: ModeMap;

  constructor(player: Player, map: ModeMap) {
    this.player = player;
    this.map = map;
  }
}
