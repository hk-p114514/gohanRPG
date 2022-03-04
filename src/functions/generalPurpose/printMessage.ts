import { Scene } from 'phaser';

export const printMessage = (scene: Scene, message: string) => {
  scene.add
    .text(16, 16, message, {
      font: '18px monospace',
      color: '#000000',
      padding: { x: 20, y: 10 },
      backgroundColor: 'rgba(255,255,255,0.5)',
    })
    .setScrollFactor(0)
    .setDepth(30);
};
