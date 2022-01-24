import { AUTO, Game, Scale, Types } from 'phaser';

const config: Types.Core.GameConfig = {
  type: AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  pixelArt: true,
  scale: {
    width: 1000,
    height: 1000,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
};
const game = new Game(config);
