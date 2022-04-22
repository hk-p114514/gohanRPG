import { Direction } from 'classes/Direction';
import { Vector } from 'matter';
import { Map_TPL } from 'scenes/Map.tpl';
import { Map0 } from 'scenes/Map0';
import { Map1 } from 'scenes/Map1';
import { Map2 } from 'scenes/Map2';
import { Map3 } from 'scenes/Map3';
import { Map4 } from 'scenes/Map4';
import { Map5 } from 'scenes/Map5';
import { BattleActor } from './BattleActor';
import { Choice } from './Choice';
import { Timelines } from './Timelines';

// ダイアログ表示イベント
type DialogEvent = {
  type: 'dialog';
  text: string;
  actorName?: string;
};

// 背景設定イベント
type SetBackgroundEvent = {
  type: 'setBackgroundImage';
  x: number;
  y: number;
  key: string;
};

// 前景追加イベント
type AddForegroundEvent = {
  type: 'addForeground';
  x: number;
  y: number;
  key: string;
};

// 前景クリアイベント
type ClearForegroundEvent = {
  type: 'clearForeground';
};

// タイムライン遷移イベント
type TimelineTransitionEvent = {
  type: 'timelineTransition';
  timelineID: string;
};

// シーン遷移イベント
type SceneTransitionEvent = {
  type: 'sceneTransition';
  key: string;
  data?: object;
};

// 選択肢イベント
type ChoiceEvent = {
  type: 'choice';
  choices: Choice[];
};

type Judge = {
  type: 'judge';
  scene: string;
  timelineID: string;
};

type setBackgroundColor = {
  type: 'setBackgroundColor';
  color: string;
};

type meetFriend = {
  type: 'meetFriend';
  actor: BattleActor;
};

/*======タイムラインIDの最初と最後に必ず付ける！====== */
// ダイアログが始まる時のイベント
type StartTimeline = {
  type: 'startTimeline';
};

// ダイアログが終わる時のイベント
type EndTimeline = {
  type: 'endTimeline';
};
/*=================================================== */
export type allMap = Map_TPL | Map0 | Map1 | Map2 | Map3 | Map4 | Map5;
export type MotionEventProps = {
  x?: number;
  y?: number;
  name?: string;
  direction?: Direction;
  bubbleIndex?: number;
  timeline?: Timelines;
  setEventMap?: string;
  battleActor?: BattleActor;
  xy?: { x: number; y: number }[];
};
// 関数等を追加したい時のイベント
type MotionEvent = {
  type: 'event';
  event: string;
  props?: Array<any>;
  contents?: MotionEventProps;
};

type Switch = {
  type: 'switch';
  scene: string;
};
// Timelineはイベントの配列
export type Timeline = (
  | DialogEvent
  | SetBackgroundEvent
  | AddForegroundEvent
  | ClearForegroundEvent
  | TimelineTransitionEvent
  | SceneTransitionEvent
  | ChoiceEvent
  | setBackgroundColor
  | StartTimeline
  | EndTimeline
  | MotionEvent
  | Switch
  | Judge
  | meetFriend
)[];

export type dialogButton = {
  range: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
};
