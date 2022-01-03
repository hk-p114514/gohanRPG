import { AUTO, Game, Scale, Types } from 'phaser';

const config: Types.Core.GameConfig = {
  type: AUTO,
  parent: 'game',
  backgroundColor: '#000000',
  scale: {
    width: 800,
    height: 800,
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
};

const game = new Game(config);
