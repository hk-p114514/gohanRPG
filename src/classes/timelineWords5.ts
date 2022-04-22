import { enemy } from 'enemies';
import { mough, pouler, shiden } from 'friends';
import { Timelines } from './Timelines';
import { Direction } from './Direction';
import { castleAnnounce, oceanGotsuji, volcanoGotsuji } from './timelineWords0';
import { buffSkills } from 'skills';

//Stage5
export const explanation5: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは食堂。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: 'マスクと消毒を忘れずに。',
      actorName: '杜松の看板',
    },
    { type: 'endTimeline' },
  ],
};

export const warpAte: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 9, y: 42 } },
    { type: 'endTimeline' },
  ],
};
export const backAte: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 27, y: 31 } },
    { type: 'endTimeline' },
  ],
};
export const goReAte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', contents: { x: 9, y: 40 } },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Shiden', x: 8, y: 40, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Pouler', x: 10, y: 40, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Mough', x: 7, y: 40, timeline: undefined },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.UP },
    },
    { type: 'endTimeline' },
  ],
};
export const startAte: Timelines = {
  start: [
    {
      type: 'event',
      event: 'log',
      contents: { name: 'plyaer', bubbleIndex: 2 },
    },
    { type: 'dialog', actorName: 'エーテ', text: '久しぶりだな！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'お前は、森にいた奴。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '奴とは、失礼な人間だな…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'マルク、\n誰だこのビーテの劣化版みたいな奴は。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '黙れ！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'キレ方も似てるし。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'まあ良い。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    { type: 'dialog', actorName: 'パウラ', text: '良いんだ…。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'マルク', text: 'というか、何でここに。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'エーテ', text: 'OBCの力により蘇ったのだよ。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'さあ、母なる魔王の元へ行きたくば、再びこの私を倒していくがいい！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'その愚かな試み、このエーテが何度でもへし折ってくれるわ！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: '……。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'エーテ', text: '……。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'あれ、バトルは？' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'エーテ', text: 'あの、掛け声を、お願いします。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'dialog', actorName: 'マルク', text: 'あ、ごめん。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: '……。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 1 } },
    { type: 'dialog', actorName: 'エーテ', text: '行くぞ！！' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'dialog', actorName: 'パウラ', text: 'グダグダですね…。' },
    { type: 'endTimeline' },
  ],
};
export const endAte: Timelines = {
  start: [
    { type: 'dialog', actorName: 'エーテ', text: 'ぐっ…だめだったか。' },
    { type: 'dialog', actorName: 'エーテ', text: 'OBCよ、申し訳ありません…。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'お前がいたってことは、もしかして他の奴らも…。',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'ふ、その通りさ。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'お前たちの進行は、我々四天王が必ず止めて見せる。',
    },
    { type: 'event', event: 'break', contents: { name: 'Ate' } },
    { type: 'dialog', actorName: 'エーテ', text: 'バタッ。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'また奴らと闘わなければならないとは…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'めんどくさいな！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'マウ',
      text: '強いやつといっぱい戦える！',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '…とにかく、気を引き締めて頑張りましょう！',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'createBoss', contents: { x: 8, y: 5, name: 'Bte' } },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'beforeAte' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'afterAte' },
    },
    {
      type: 'event',
      event: 'kill',
      contents: {
        xy: [
          { x: 9, y: 8 },
          { x: 10, y: 8 },
          { x: 11, y: 8 },
          { x: 12, y: 8 },
          { x: 13, y: 8 },
          { x: 14, y: 8 },
          { x: 15, y: 8 },
          { x: 16, y: 8 },
          { x: 17, y: 8 },
        ],
      },
    },
    { type: 'endTimeline' },
  ],
};

export const warpBte: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 9, y: 12 } },
    { type: 'endTimeline' },
  ],
};
export const backBte: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 9, y: 31 } },
    { type: 'endTimeline' },
  ],
};
export const goReBte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', contents: { x: 13, y: 9 } },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Shiden', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Pouler', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Mough', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.UP },
    },
    { type: 'endTimeline' },
  ],
};
export const startBte: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'ビーテ', text: '…兄者は倒されたか。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'やはり次はお前か。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '改めて名乗ろう',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'この私こそ、軟弱な兄エーテよりずっとずっと強い、\n四天王ビーテ様だ！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'わー相変わらず言い方が弱そう。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさい！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'シデン', text: '敗北から何も学んでいないようだな。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさい！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マウ', text: '弱そう、残念。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさいうるさい！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'パウラ', text: '皆さん、流石に言い過ぎでは？' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさ…くない。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'ありがとう。' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'それより貴様ら、黙って聞いていれば、\n何度も何度もこのビーテ様を侮辱しおって！',
    },
    { type: 'dialog', actorName: 'パウラ', text: '黙って聞いてはなかったですけど。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさいうるさいうるさい！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'もう許さない。',
    },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '徹底的にぶっ潰してくれる。',
    },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'どぅおるぁぁぁ！！！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'バトル突入セリフだけは進化してるな。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'endTimeline' },
  ],
};
export const endBte: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'ビーテ', text: 'ぐあぁっ、クソっ、またか…。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.LEFT },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.RIGHT },
    },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '結局あの兄者と同じ末路を辿るのか…。',
    },
    { type: 'event', event: 'break', contents: { name: 'Bte' } },
    { type: 'dialog', actorName: 'ビーテ', text: 'バタッ。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'あばよ、ビチョウオンプテ。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'パウラ', text: 'ビチョウオンプテ……。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    { type: 'dialog', actorName: 'パウラ', text: 'あれってそんな読み方したんですね…。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    { type: 'dialog', actorName: 'マウ', text: 'ながくて分かりずらい。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'createBoss', contents: { x: 50, y: 5, name: 'Melcine' } },
    { type: 'event', event: 'reset', contents: { name: 'Shiden' } },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'befoerBte' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'afterBte' },
    },
    {
      type: 'event',
      event: 'kill',
      contents: {
        xy: [
          { x: 7, y: 24 },
          { x: 6, y: 25 },
          { x: 8, y: 25 },
          { x: 7, y: 26 },
        ],
      },
    },
    { type: 'endTimeline' },
  ],
};

export const warpMelcine: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 51, y: 12 } },
    { type: 'endTimeline' },
  ],
};
export const backMelcine: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 9, y: 1 } },
    { type: 'endTimeline' },
  ],
};
export const goReMelcine: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', contents: { x: 13, y: 9 } },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Shiden', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Pouler', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Mough', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.UP },
    },
    { type: 'endTimeline' },
  ],
};
export const startMelcine: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'よくぞ再びおいでくださいました！\nこの四天王一高貴な男、メルシンのもとへ！！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    { type: 'dialog', actorName: 'マルク', text: '…やっぱりこいつ嫌いだわぁ。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'メルシン', text: 'それよりも貴様ら…。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'あの時は、よくも私を無視して進もうとしてくれましたねぇ。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'パウラ', text: 'あっ。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'あの時の恨み、今ここで晴らさせていただきますよ。',
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.RIGHT },
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'このワタクシの全力でねぇ！！',
    },
    { type: 'dialog', actorName: 'パウラ', text: 'やっぱり騒がしい人ですねぇ。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'endTimeline' },
  ],
};
export const endMelcine: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'ばかな…この私がまたしても敗北するなど…。',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 2 } },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: '何故だ、何故なのだぁ！！！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'さ、無視して行こうぜ。',
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.RIGHT },
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.RIGHT },
    },
    { type: 'dialog', actorName: 'シデン', text: 'だな、まだ次がある。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'パウラ', text: '行きましょう。' },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.RIGHT },
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'メルシン', text: '……。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'マウ', text: '……。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'マウ', text: 'お前。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'メルシン', text: '……？' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'マウ', text: 'そこそこ強かったぞ！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'メルシン', text: '……！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'メルシン', text: 'ありがとう！' },
    { type: 'event', event: 'log', contents: { name: 'Pouler', bubbleIndex: 4 } },
    { type: 'event', event: 'break', contents: { name: 'Melcine' } },
    { type: 'dialog', actorName: 'メルシン', text: 'バタッ。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'createBoss', contents: { x: 30, y: 4, name: 'Eleca' } },
    { type: 'event', event: 'reset', contents: { name: 'Shiden' } },
    { type: 'event', event: 'reset', contents: { name: 'Pouler' } },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'goMelcine' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'beforeMelcine' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'afterMelcine' },
    },
    { type: 'endTimeline' },
  ],
};

export const warpEleca: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 31, y: 12 } },
    { type: 'endTimeline' },
  ],
};
export const backEleca: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 51, y: 1 } },
    { type: 'endTimeline' },
  ],
};
export const goReEleca: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', contents: { x: 13, y: 9 } },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Shiden', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Pouler', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Mough', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.UP },
    },
    { type: 'endTimeline' },
  ],
};
export const startEleca: Timelines = {
  start: [
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 5 },
    },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'ここまできましたか。\nやはり男たちは軟弱だったわね。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'せっかくここまで来たんだ。\n倒させてもらうぞ！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'あなたたちの強さは認めるわ。',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'しかし、この先はお母様の間。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '何人たりとも通すわけにはいかない。',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '本気で相手してあげるわ、覚悟しなさい。',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'endTimeline' },
  ],
};
export const endEleca: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'エレカ', text: '申し訳ありません、おかあ…さま…。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '悪いが、俺たちにはやらなきゃならない事があるんでな！',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '…お母様に叩き潰されるその時を、楽しみに待っているわ。',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'あの世でね。',
    },
    { type: 'event', event: 'break', contents: { name: 'Eleca' } },
    { type: 'dialog', actorName: 'エレカ', text: 'バタッ。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '行こう、最後の戦いへ。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 4 },
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'あぁ。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 1 },
    },
    { type: 'dialog', actorName: 'パウラ', text: 'はい。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Mough', bubbleIndex: 5 },
    },
    { type: 'dialog', actorName: 'マウ', text: 'ウオオオオオオ！。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'createBoss', contents: { x: 50, y: 35, name: 'Obc' } },
    { type: 'event', event: 'reset', contents: { name: 'Shiden' } },
    { type: 'event', event: 'reset', contents: { name: 'Pouler' } },
    { type: 'event', event: 'reset', contents: { name: 'Mough' } },
    {
      type: 'event',
      event: 'kill',
      contents: {
        xy: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
        ],
      },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'startEleca' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'endEleca' },
    },
    { type: 'endTimeline' },
  ],
};

export const warpObc: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 48, y: 43 } },
    { type: 'endTimeline' },
  ],
};
export const backObc: Timelines = {
  start: [
    { type: 'event', event: 'warp', contents: { x: 31, y: 1 } },
    { type: 'endTimeline' },
  ],
};
export const goObc: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', contents: { x: 13, y: 9 } },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Shiden', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Pouler', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'set',
      contents: { name: 'Mough', x: 6, y: 23, timeline: undefined },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Shiden', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.UP },
    },
    { type: 'endTimeline' },
  ],
};
export const beforeObcBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'OBC', text: 'おや…まさか本当に来るとはね。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 3 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'おい、貴様がOBCだな。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'いかにも。\n私OBC、すなわち"おばちゃん"の略さ…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'そんな…食堂の乗っ取り騒ぎも何もかも、自作自演だったって言うんですか！？',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'その通りだよ…。\n適当な所で切り上げて全部元通りにしてしまえば、食堂の復活を祝う客が沢山訪れる。',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'お前たちが来なければ、いずれ霧も晴らしてやったというのに…。',
    },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: '正体を知られたからには仕方がない、ここで死んでもらおうか。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Mough', bubbleIndex: 5 },
    },
    { type: 'dialog', actorName: 'マウ', text: '腕試し、できる、ウオオ！' },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.LEFT },
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'パウラ', text: 'マウさん、話聞いてますか…。' },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.UP },
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '…というか、霧によって味付けを濃くしたのも、あなたの仕業なんですか。',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    { type: 'dialog', actorName: 'OBC', text: 'そうだよ、それも私さ。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Pouler', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'どうして…どうしてそんなことをするんですか！',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'そんなことしたら、健康寿命が縮んでしまうじゃないですか！',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 1 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'その方がおいしいし、パワーが出るだろう？',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.LEFT },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Pouler', direction: Direction.LEFT },
    },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'Mough', direction: Direction.RIGHT },
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'ふざけるな…。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 2 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'ふざけるなぁ！！' },
    { type: 'dialog', actorName: 'シデン', text: '俺はな、薄味が好みなんだぁぁ！！' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    { type: 'dialog', actorName: 'OBC', text: 'ならば、濃い味に慣れさせるまでよ！！' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'ここまできたら後にも引けないからね\nこの世界まるごと、私の味で染め上げてくれる！！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'Shiden', bubbleIndex: 2 },
    },
    { type: 'dialog', actorName: 'シデン', text: 'そんなこと、させてたまるかぁぁ！！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: '…俺のセリフは？' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
  ],
};
export const afterObcBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'OBC', text: '…ふん、まさか、本当に倒されるとはね…。' },
    { type: 'dialog', actorName: 'OBC', text: '私も本当に、ここまでのようだ…。' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'おい、お前。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'なんだい…？\n私はもうすぐ力尽きる、文句があるなら今いいな…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    { type: 'dialog', actorName: 'マルク', text: '大盛りご飯。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 1 } },
    { type: 'dialog', actorName: 'OBC', text: '…は？' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 1 },
    },
    { type: 'dialog', actorName: 'マルク', text: '魔王倒したら大盛りご飯無料なんだろ？' },
    { type: 'dialog', actorName: 'マルク', text: '早く出せよ。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'OBC', text: 'ふん、バカだねぇ…。' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'そんな広告、自作自演に決まってるじゃないか…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'はぁ！？じゃあ、食べれねぇってことかよ！？',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'まさかとは思うが、そのために来たのかい…？',
    },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    { type: 'dialog', actorName: 'OBC', text: '…ふふふ…ハハハハハハ！！' },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 2 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'おい！何笑ってんだよ！' },
    { type: 'event', event: 'bosslog', contents: { bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'まさか、私がこんな理由で倒されるなんてね…。',
    },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: '死ぬ前に、とんだ大馬鹿見せてもらって、私は満足だよ…。',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 3 },
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おい！もう死ぬみたいないこと言うんじゃねぇ！！',
    },
    {
      type: 'event',
      event: 'log',
      contents: { name: 'player', bubbleIndex: 4 },
    },
    { type: 'dialog', actorName: 'マルク', text: 'まだ…まだ死ぬなよぉ…。' },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', contents: { name: 'Shiden' } },
    { type: 'event', event: 'reset', contents: { name: 'Pouler' } },
    { type: 'event', event: 'reset', contents: { name: 'Mough' } },
    { type: 'event', event: 'delete', contents: { name: 'goObc' } },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'beforeObc' },
    },
    {
      type: 'event',
      event: 'delete',
      contents: { name: 'afterObc' },
    },
    { type: 'dialog', actorName: 'マルク', text: '腹…減ってんだよ…。' },
    { type: 'dialog', text: '…………。' },
    { type: 'dialog', actorName: '？？？', text: '…きなさい！起きなさい！' },
    { type: 'dialog', actorName: '？？？', text: '起きなさい！マルク！' },
    { type: 'dialog', actorName: 'マルク', text: '…うーん？' },
    {
      type: 'dialog',
      actorName: '？？？',
      text: 'もう！38にもなって1人で起きれないなんて！情けなくないの！',
    },
    { type: 'dialog', actorName: 'マルク', text: 'えぇ〜ママちゃまっち〜。' },
    { type: 'dialog', actorName: 'マルク', text: 'まだ起きたくないでござるよ〜。' },
    {
      type: 'dialog',
      actorName: 'ママちゃまっち',
      text: '定職にも就いてないんだから！生活リズムくらい整えなさい！',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'も〜、ママちゃまっちがそこまで言うならしょうがないでござるな〜。',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'さて、新聞でも呼んで、3チャンでヤトウ叩きでもするでござるか〜。',
    },
    { type: 'dialog', text: 'これは、定職に就かぬ男が、定食を求め旅する物語…' },
    { type: 'dialog', text: '〜 GohanRPG Fin 〜' },
  ],
};
