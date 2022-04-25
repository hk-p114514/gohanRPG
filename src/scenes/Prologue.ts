import { Scene } from 'phaser';
import { H, W } from 'functions/DOM/windowInfo';
import newsPaper from 'images/newsPaper.jpg';
import { TimelinePlayer } from 'classes/TimelinePlayer';
import { prologue } from 'timelineWords/timelineWords';
import { sceneKeys } from 'scenes/sceneKeys';

export class Prologue extends Scene {
  private backgroundColor: string = '#003';
  private timelinePlayer?: TimelinePlayer;
  private isDialogDisplay: boolean = false;
  private isDialogEnd: boolean = true;

  constructor() {
    super({ key: sceneKeys.prologue });
  }

  preload() {
    this.load.image('newsPaper', newsPaper);
  }

  create() {
    this.cameras.main.setBackgroundColor(this.backgroundColor);

    this.add.image(W() / 2, H() / 3, 'newsPaper').setOrigin(0.5);

    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelineData: prologue,
    });
    this.isDialogDisplay = true;
  }

  update() {
    this.scene.start(sceneKeys.map0);
  }
}
