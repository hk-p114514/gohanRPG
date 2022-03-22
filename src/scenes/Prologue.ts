import { Scene } from 'phaser';
import { H, W } from 'functions/DOM/windowInfo';
import newsPaper from 'images/newsPaper.jpg' ;
import { TimelinePlayer } from 'classes/TimelinePlayer' ;
import { prologue } from 'classes/timelineWords';
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

    this.add.image(H() / 2, W() / 3, 'newsPaper');

    this.scene.launch(sceneKeys.timelinePlayer, {
      anotherScene: this,
      timelinedata: prologue,
    });
    this.isDialogDisplay = true;
  }

  update() {
    this.scene.start(sceneKeys.title);
  }
}