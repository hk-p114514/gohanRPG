import { Scene } from 'phaser';
import { Timeline } from './Timeline';

export type Timelines = {
  [timelineID: string]: Timeline;
};

export type SceneTimelines = {
  anotherScene: Scene;
  timelinedata: Timelines;
  specID?: string;
};
