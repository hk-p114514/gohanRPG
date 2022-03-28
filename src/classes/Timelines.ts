import { Scene } from 'phaser';
import { Map } from 'scenes/Map.tpl';
import { Timeline } from './Timeline';

export type Timelines = {
  [timelineID: string]: Timeline;
};

export type SceneTimelines = {
  anotherScene: Map;
  timelinedata: Timelines;
  specID?: string;
};
