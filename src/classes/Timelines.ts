import { Scene } from 'phaser';
import { Map_TPL } from 'scenes/Map.tpl';
import { Timeline } from './Timeline';

export type Timelines = {
  [timelineID: string]: Timeline;
};

export type SceneTimelines = {
  anotherScene: Map_TPL;
  timelinedata: Timelines;
  specID?: string;
};
