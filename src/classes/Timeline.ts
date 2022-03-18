import { Vector } from 'matter';
import { Choice } from './Choice';

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

type setBackgroundColor = {
  type: 'setBackgroundColor';
  color:string;
}

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

// 関数等を追加したい時のイベント
type MotionEvent = {
  type: 'event';
  event: string;
  many: Array<any>;
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
)[];

export type dialogButton = {
  range: Phaser.GameObjects.Rectangle;
  text: Phaser.GameObjects.Text;
};
