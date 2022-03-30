import { events } from './exam';
import { Timelines } from './Timelines';

export const timelineData: Timelines = {
  start: [
    // { type: 'startTimeline' },
    { type: 'dialog', text: '・・・・\n・・ ▼' },
    { type: 'dialog', text: 'う、うーん・・・ ▼' },
    { type: 'setBackgroundImage', x: 400, y: 300, key: 'street' },
    { type: 'dialog', text: 'ここは・・・？ ▼' },
    { type: 'addForeground', x: 300, y: 300, key: 'robot' },
    { type: 'dialog', text: '目が覚めましたか ▼', actorName: '???' },
    { type: 'dialog', text: 'アンドロイド・・・？ ▼' },
    { type: 'dialog', text: '私は「ACT-42」 ▼', actorName: '???' },
    { type: 'dialog', text: '早速ですが—— ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'あなたは追われています ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: '一刻も早くここから逃げた方がいい ▼', actorName: 'ACT-42' },
    { type: 'timelineTransition', timelineID: 'choice01' },
  ],
  choice01: [
    { type: 'setBackgroundImage', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '一緒に逃げましょう ▼', actorName: 'ACT-42' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'choice01_a01' },
        { text: 'いいえ', timelineID: 'choice01_a02' },
        { text: 'アンドロイド風情が話しかけるな', timelineID: 'choice01_a03' },
      ],
    },
  ],
  choice01_a01: [
    { type: 'setBackgroundImage', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '事情はつかめないけどとりあえず従っておこう ▼' },
    { type: 'dialog', text: 'よろしい。ではこちらへ来てください ▼', actorName: 'ACT-42' },
    { type: 'clearForeground' },
    { type: 'dialog', text: 'こうして銀河を股にかけた物語が始まるのであった・・・ ▼' },
    // { type: 'sceneTransition', key: 'ending' },
    { type: 'endTimeline' },
  ],
  choice01_a02: [
    { type: 'setBackgroundImage', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '・・・困りましたね ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: '今は事情を話している暇がないんです ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'あなたは捕まるべきではない ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'もう一度聞きますね？ ▼', actorName: 'ACT-42' },
    { type: 'timelineTransition', timelineID: 'choice01' },
  ],
  choice01_a03: [
    { type: 'setBackgroundImage', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '・・・・・・ ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'わかりました。それでは私はこれで ▼', actorName: 'ACT-42' },
    { type: 'clearForeground' },
    { type: 'dialog', text: '・・・・・・ ▼' },
    {
      type: 'dialog',
      text: 'この後俺は謎の組織に捕まり色々されてしまうのだった・・・ ▼',
    },
    // { type: 'sceneTransition', key: 'ending' },
    { type: 'endTimeline' },
  ],
};
export const Took: Timelines = {
  start: [
    // { type: 'startTimeline' },
    { type: 'event', event: 'talk', many: [] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'chdir', many: ['hito2', 'left'] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'warp', many: [12, 12] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'chdir', many: ['player', 'right'] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'set', many: ['hito3', 13, 12, undefined] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'log', many: ['hito3', 3] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'event', event: 'reset', many: ['hito3'] },
    { type: 'dialog', text: 'OK▼' },
    { type: 'switch', scene: 'map2' },
    { type: 'dialog', text: 'OK▼' },
    { type: 'endTimeline' },
  ],
};
//共通
export const select: Timelines = {
  start: [
    {
      type: 'choice',
      choices: [
        { text: 'stage0', timelineID: 'choice01_a00' },
        { text: 'stage1', timelineID: 'choice01_a01' },
        { text: 'stage2', timelineID: 'choice01_a02' },
        { text: 'stage3', timelineID: 'choice01_a03' },
        { text: 'stage4', timelineID: 'choice01_a04' },
        { text: 'stage5', timelineID: 'choice01_a05' },
      ],
    },
  ],
  choice01_a00: [{ type: 'switch', scene: 'map0' }, { type: 'endTimeline' }],
  choice01_a01: [{ type: 'switch', scene: 'map1' }, { type: 'endTimeline' }],
  choice01_a02: [{ type: 'switch', scene: 'map2' }, { type: 'endTimeline' }],
  choice01_a03: [{ type: 'switch', scene: 'map3' }, { type: 'endTimeline' }],
  choice01_a04: [{ type: 'switch', scene: 'map4' }, { type: 'endTimeline' }],
  choice01_a05: [{ type: 'switch', scene: 'map5' }, { type: 'endTimeline' }],
};
export const noComment: Timelines = {
  start: [
    // { type: 'startTimeline' },
    {
      type: 'dialog',
      text: 'ハハッ!\nハハハッ!\nハハハハッ!\n',
      actorName: 'マウスカーソル',
    },
    { type: 'endTimeline' },
  ],
};
export const dummy: Timelines = {
  start: [
    // { type: 'startTimeline' },
    {
      type: 'dialog',
      text: 'ハハッ!\nこの先はまだ未完成なんだ。\nごめんね!',
      actorName: 'マウスカーソル',
    },
    { type: 'endTimeline' },
  ],
};
//Home
export const prologue: Timelines = {
  start: [
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'はぁーあ、最近のヤトウはロクなのがいねぇなぁ…ん？',
    },
    { type: 'dialog', actorName: 'マルク', text: '魔王を倒せたら大盛りご飯無料？？' },
    { type: 'dialog', actorName: 'マルク', text: 'へぇ…腹減ってんだ、ちょうどいい。' },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '魔王でもヤトウでも、俺が倒してやろうじゃねーか！',
    },
    { type: 'endTimeline' },
  ],
};
export const tutorial1: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '主人公の移動は十字keyで行います。',
      actorName: '識者',
    },
    {
      type: 'dialog',
      text: "'Space'keyで人に話しかけたり、\n看板などを調べたりすることができます。",
      actorName: '識者',
    },
    {
      type: 'dialog',
      text: "'Enter'keyかマウスカーソルのクリックで会話を進める事が出来ます。",
      actorName: '識者',
    },
    {
      type: 'dialog',
      text: 'また、会話中に出てくる選択肢はマウスカーソルで選ぶことができます。',
      actorName: '識者',
    },
    {
      type: 'dialog',
      text: '分かりましたか？',
      actorName: '識者',
    },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
        { text: '制作者風情が話しかけるな', timelineID: 'end' },
      ],
    },
    { type: 'endTimeline' },
  ],
  Yes: [{ type: 'event', event: 'delete', many: ['tutorial1'] }, { type: 'endTimeline' }],
  No: [
    { type: 'dialog', text: 'では、もう一度説明します。', actorName: '識者' },
    { type: 'timelineTransition', timelineID: 'start' },
    { type: 'endTimeline' },
  ],
  end: [
    { type: 'dialog', text: '・・・・・・。', actorName: '識者' },
    {
      type: 'dialog',
      text: 'わかりました。それでは私はこれで・・・。',
      actorName: '識者',
    },
    { type: 'dialog', text: '・・・・・・。' },
    {
      type: 'dialog',
      text: 'この後、俺は謎の漫才師に捕まり、\n色々されてしまうのだった・・・。',
      actorName: 'マルク',
    },
    //GameOverにする。
    { type: 'endTimeline' },
  ],
};
export const stoper1: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'ハンバーガー',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper2: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'カッサンド',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper3: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'ギュウド',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper4: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'カツド',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper5: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'ヒャシチユウカ',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper6: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'ウドン',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper7: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'チキンカ',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper8: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'defined',
      actorName: 'ギュウカ',
    },
    { type: 'endTimeline' },
  ],
};
export const explanation: Timelines = {
  start: [
    { type: 'event', event: 'chdir', many: ['notMob', 'left'] },
    { type: 'event', event: 'log', many: ['notMob', 3] },
    { type: 'dialog', actorName: 'ゴツジ', text: 'おい、そこの若者！' },
    { type: 'event', event: 'chdir', many: ['player', 'right'] },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'ん？なんか用か？爺さん' },
    { type: 'event', event: 'log', many: ['notMob', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: '村の中そんな格好で出てくるとは珍しい\nどこか行くところでもあるのか？',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'あぁ、魔王…' },
    { type: 'event', event: 'log', many: ['notMob', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: '魔王を倒しに食堂に行こうというのか！勇ましいのう！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'えっと、まだ何も' },
    { type: 'event', event: 'log', many: ['notMob', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: '食堂が魔王に占拠され、ついには魔王城とまで呼ばれるようになり、もう何ヶ月になるかのう…',
    },
    { type: 'event', event: 'log', many: ['notMob', 1] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'して若者よ、食堂に行くのになにか策はあるのか？',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'べ' },
    { type: 'event', event: 'log', many: ['notMob', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: '無策ではいかんなぁ、この間突入した警備隊は、入ることすら叶わなんだ',
    },
    { type: 'event', event: 'log', many: ['notMob', 4] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'なんでも、入り口には4つの鍵がかかっておったそうじゃ…',
    },
    { type: 'event', event: 'log', many: ['notMob', 4] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: '噂に聞いた話じゃが、その鍵のうちの1つは、\nサバレーフィールドの赤い魔物が持っとるそうじゃな！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'サバ',
    },
    { type: 'event', event: 'log', many: ['notMob', 4] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'サバレーか、懐かしいのぅ、確かこの道を左に行ったところじゃったかのう…',
    },
    { type: 'event', event: 'log', many: ['notMob', 5] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'ワシが若い頃はよく婆さんとピクニックに行ったのぅ…',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'あの頃はワシもブイブイ言わしておってな、\n婆さんは魔物を次々に倒すワシの勇姿にほれぼれしててのぅ、\nしかし今ではそんなワシを尻に敷くんじゃから人間わからんもんで…',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'これもうそのまま行っちゃっていいかな…',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'reset', many: ['stoper1'] },
    { type: 'event', event: 'set', many: ['stoper1', 23, 21, stoper1] },
    { type: 'event', event: 'reset', many: ['stoper2'] },
    { type: 'event', event: 'set', many: ['stoper2', 28, 23, stoper2] },
    { type: 'event', event: 'reset', many: ['stoper3'] },
    { type: 'event', event: 'set', many: ['stoper3', 44, 23, stoper3] },
    { type: 'event', event: 'reset', many: ['stoper4'] },
    { type: 'event', event: 'set', many: ['stoper4', 43, 23, stoper4] },
    { type: 'event', event: 'reset', many: ['stoper5'] },
    { type: 'event', event: 'set', many: ['stoper5', 7, 12, stoper5] },
    { type: 'event', event: 'reset', many: ['stoper6'] },
    { type: 'event', event: 'set', many: ['stoper6', 9, 12, stoper6] },
    { type: 'event', event: 'reset', many: ['stoper7'] },
    { type: 'event', event: 'set', many: ['stoper7', 36, 11, stoper7] },
    { type: 'event', event: 'reset', many: ['stoper8'] },
    { type: 'event', event: 'set', many: ['stoper8', 36, 13, stoper8] },
    {
      type: 'event',
      event: 'kill',
      many: [
        [29, 8],
        [30, 8],
      ],
    },
    { type: 'endTimeline' },
  ],
};
export const stoplu: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'おっと、この先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'move', many: ['left'] },
    { type: 'endTimeline' },
  ],
};
export const stopru: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'おっと、この先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'move', many: ['right'] },
    { type: 'endTimeline' },
  ],
};
export const stopld: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'おっと、この先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'move', many: ['left'] },
    { type: 'endTimeline' },
  ],
};
export const stoprd: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ゴツジ',
      text: 'おっと、この先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'move', many: ['right'] },
    { type: 'endTimeline' },
  ],
};
export const explanation0: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは町。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '南西に森。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '南東にソースワデザート。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '北西にムギムギオーシャン。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '北東に迷路。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '北に食堂。',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const warp0: Timelines = {
  start: [{ type: 'switch', scene: 'map0' }, { type: 'endTimeline' }],
};
export const warp1: Timelines = {
  start: [{ type: 'switch', scene: 'map1' }, { type: 'endTimeline' }],
};
export const warp2: Timelines = {
  start: [{ type: 'switch', scene: 'map2' }, { type: 'endTimeline' }],
};
export const warp3: Timelines = {
  start: [{ type: 'switch', scene: 'map3' }, { type: 'endTimeline' }],
};
export const warp4: Timelines = {
  start: [{ type: 'switch', scene: 'map4' }, { type: 'endTimeline' }],
};
export const warp5: Timelines = {
  start: [{ type: 'switch', scene: 'map5' }, { type: 'endTimeline' }],
};
//Stage1
// export const tutorial2: Timelines = {
//   start: [
//     {
//       type: 'dialog',
//       text: 'バトルのチュートリアル書いといてね',
//       actorName: '識者',
//     },
//     { type: 'endTimeline' },
//   ],
// };
export const hint1: Timelines = {
  start: [
    { type: 'dialog', text: '古びた看板がある。' },
    { type: 'dialog', text: 'かすれた文字で何か書いてある！' },
    {
      type: 'dialog',
      text: 'ガイアミアイガミガアミイ',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: '？？？', actorName: 'マルク' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const explanation1: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは？？？。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: 'ある時期のこの森では、\nケンタウルス座とみなみじゅうじ座がとても見やすいです。',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const stone1: Timelines = {
  start: [
    { type: 'dialog', text: 'かすれた文字で何か書いてある！' },
    { type: 'dialog', text: 'この石碑はガクルックスを祀りしもの' },
    { type: 'dialog', text: '森の...から...上に...' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: '額 looks？\n', actorName: 'マルク' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const stone2: Timelines = {
  start: [
    { type: 'dialog', text: 'かすれた文字で何か書いてある！' },
    { type: 'dialog', text: 'この石碑はアクルックスを祀りしもの' },
    { type: 'dialog', text: 'ギナンに...近い...進んだ...' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: '明くる楠？', actorName: 'マルク' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const stone3: Timelines = {
  start: [
    { type: 'dialog', text: 'かすれた文字で何か書いてある！' },
    { type: 'dialog', text: 'この石碑はミモザを祀りしもの' },
    { type: 'dialog', text: '最も...真っすぐ...地に...' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: 'どんな星座だよ。', actorName: 'マルク' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const stone4: Timelines = {
  start: [
    { type: 'dialog', text: 'かすれた文字で何か書いてある！' },
    { type: 'dialog', text: 'この石碑はイマイを祀りしもの' },
    { type: 'dialog', text: '主は...丸...眠る...' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', text: '誰だよ今井って？', actorName: 'マルク' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const warpA: Timelines = {
  start: [{ type: 'event', event: 'warp', many: [13, 9] }, { type: 'endTimeline' }],
};
export const backA: Timelines = {
  start: [{ type: 'event', event: 'warp', many: [29, 12] }, { type: 'endTimeline' }],
};
export const goAte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [13, 7] },
    { type: 'endTimeline' },
  ],
};
export const beforeAteBattle: Timelines = {
  start: [
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'log', many: ['player', 2] },

    { type: 'dialog', actorName: 'マルク', text: 'おい！食堂への鍵を寄越せ！' },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'ふん、初対面で随分偉そうな口を聞くじゃないか…。',
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'この私が、魔王直属の四天王の一人、エーテ様と知っての言葉ではあるまいな！',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: 'うん、知らんかった。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'エーテ', text: 'あ、そう。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '……。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'エーテ', text: '……。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'なんか、ごめん。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'エーテ', text: 'いいよ、俺もちょっと調子乗ってたし。' },
    { type: 'event', event: 'bosslog', many: [1] },
    { type: 'dialog', actorName: 'エーテ', text: '…雰囲気戻していい？' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: 'お願いします。' },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '母なる魔王の元へ行きたくば、この私を倒していくがいい！',
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '魔王を倒そうなどという愚かな試み、この場でへし折ってくれるわ！',
    },
    { type: 'endTimeline' },
  ],
};
export const afterAteBattle: Timelines = {
  start: [
    { type: 'dialog', actorName: 'エーテ', text: 'ぐっ…こんな、所で…。' },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '俺は、四天王なんだ…こんな所で、倒れる訳にはいかないんだ…！',
    },
    { type: 'dialog', actorName: 'エーテ', text: '俺を生み出しし母、OBCの為に…！' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: 'OBC？なんだそれ？' },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'ふん、覚えておくといい…いずれ貴様を滅ぼす、偉大なる魔王の名だ…。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'event', event: 'break', many: [] },
    { type: 'dialog', actorName: 'エーテ', text: 'バタッ。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…死に際に色々吐いてくれる系四天王だったな…。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: 'エーテはもう倒れたか…。' },
    { type: 'dialog', actorName: '四天王C', text: 'ふん、奴は四天王の中でも最弱…。' },
    { type: 'dialog', actorName: '四天王B', text: 'OBC、次は私にまかせてください。' },
    { type: 'dialog', actorName: '四天王B', text: '兄の責任は私の責任でもあります。' },
    { type: 'dialog', actorName: 'OBC', text: '良かろうビーテ、次は貴様に任せる。' },
    { type: 'dialog', actorName: 'ビーテ', text: '必ずや、止めてみせます故…。' },
    { type: 'event', event: 'delete', many: ['beforeAte'] },
    { type: 'event', event: 'delete', many: ['afterAte'] },
    {
      type: 'event',
      event: 'kill',
      many: [
        [9, 8],
        [10, 8],
        [11, 8],
        [12, 8],
        [13, 8],
        [14, 8],
        [15, 8],
        [16, 8],
        [17, 8],
      ],
    },
    { type: 'endTimeline' },
  ],
};
//Stage2
export const explanation2: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここはソースワデザート。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: 'ここはかつて黄道の王がいた砂漠。',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const meetShiden: Timelines = {
  start: [
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'log', many: ['Shiden', 1] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'このソースワデザートに人が来るとは珍しい…何用だ。',
    },
    { type: 'event', event: 'log', many: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おう、俺はマルク\n魔王を倒すために旅してんだ。',
    },
    { type: 'event', event: 'log', many: ['Shiden', 1] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そのために、砂漠の四天王を倒しに来たと…。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: 'そういうことだ。' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '…まさかとは思うが、魔法も使えないのに1人で行くつもりじゃないだろうな。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'よくそこまで分かったな。' },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '杖も持ってないやつに魔法なんか使えるか。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'お前も杖持って無いじゃん！' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '能ある鷹は杖を隠すんだよ。',
    },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'ここ一体の魔物は、砂塵から身を守るための硬い体を持つものが多い。',
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '物理攻撃だけで突破するのは、正直無謀と言える。',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'なるほどな…そんで、お前魔法使えんの？',
    },
    { type: 'event', event: 'log', many: ['Shiden', 1] },
    { type: 'dialog', actorName: 'シデン', text: '使えると言えば連れて行かれるのか。' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '連れて行くって言ったらどうする？' },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: '断る。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてかない。' },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ魔法使える。' },
    { type: 'event', event: 'log', many: ['player', 5] },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてく。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ話が違う。' },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'event',
      event: 'kill',
      many: [
        [2, 1],
        [3, 1],
        [4, 1],
      ],
    },
    { type: 'endTimeline' },
  ],
};
export const addShiden: Timelines = {
  start: [
    { type: 'event', event: 'set', many: ['Shiden', 3, 4, undefined] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['player', 'down'] },
    { type: 'event', event: 'log', many: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'そんじゃ、俺はこれで。\n世話になったな。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'シデン', text: '…なぁ、俺も連れて行ってくれないか。' },
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おぉ！助かるけど、何か理由でもあるのか？',
    },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '魔王にまつわる黒い噂は知っているな？' },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '知らん。' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全く、倒そうとしているんじゃないのか…。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'シデン', text: 'まぁいい、教えてやるから覚えておけ。' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王の侵略地域、黒い霧が広まっているのは知っているな？',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: 'そうなの？' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '本当に何も知らないんだな…。' },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王に占拠された食堂の周りから、少しずつ黒い霧が広まってるんだよ。',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'へぇ〜、黒い霧に包まれるとどうなるんだ？',
    },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'そこが問題なんだよ！！' },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '急に熱くなるじゃん。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そりゃ熱くもなるさ！なにせ、黒い霧に包まれた場所では…。',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'ゴクリ…。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全ての料理の味付けが、超濃い目になってしまうんだよ！！！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '…はぁ。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: '俺はな、薄味が好みなんだよ！！' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'お、おぅ。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'このまま黒い霧が広まって、世界中を包み込み、\n薄味の食べ物が無くなるなんて論外だ！',
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'その前に俺がこの手で、魔王を打ち倒す！',
    },
    { type: 'event', event: 'log', many: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…まぁ着いてきてくれるならなんでもいいや。',
    },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'event',
      event: 'kill',
      many: [
        [2, 1],
        [3, 1],
      ],
    },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'endTimeline' },
  ],
};
export const Aries: Timelines = {
  start: [{ type: 'dialog', text: 'Aries' }, { type: 'endTimeline' }],
};
export const Taurus: Timelines = {
  start: [{ type: 'dialog', text: 'Taurus' }, { type: 'endTimeline' }],
};
export const Gemini: Timelines = {
  start: [{ type: 'dialog', text: 'Gemini' }, { type: 'endTimeline' }],
};
export const Cancer: Timelines = {
  start: [{ type: 'dialog', text: 'Cancer' }, { type: 'endTimeline' }],
};
export const Leo: Timelines = {
  start: [{ type: 'dialog', text: 'Leo' }, { type: 'endTimeline' }],
};
export const Virgo: Timelines = {
  start: [{ type: 'dialog', text: 'Virgo' }, { type: 'endTimeline' }],
};
export const Libra: Timelines = {
  start: [{ type: 'dialog', text: 'Libra' }, { type: 'endTimeline' }],
};
export const Scorpio: Timelines = {
  start: [{ type: 'dialog', text: 'Scorpio' }, { type: 'endTimeline' }],
};
export const Sagittarius: Timelines = {
  start: [{ type: 'dialog', text: 'Saittarius' }, { type: 'endTimeline' }],
};
export const Capricorn: Timelines = {
  start: [{ type: 'dialog', text: 'Capricorn' }, { type: 'endTimeline' }],
};
export const Aquarius: Timelines = {
  start: [{ type: 'dialog', text: 'Aquarius' }, { type: 'endTimeline' }],
};
export const Pisces: Timelines = {
  start: [{ type: 'dialog', text: 'Pisces' }, { type: 'endTimeline' }],
};
export const Ophiuchus: Timelines = {
  start: [{ type: 'dialog', text: 'Ophiuchus' }, { type: 'endTimeline' }],
};
export const AriesWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Aries', 27, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const TaurusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Taurus', 44, 3] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const GeminiWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Gemini', 16, 2] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const CancerWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Cancer', 29, 21] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const LeoWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Leo', 41, 7] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const VirgoWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Virgo', 56, 26] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const LibraWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Libra', 27, 3] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const ScorpioWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Scorpio', 27, 17] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const SagittariusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Sagittarius', 56, 3] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const CapricornWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Capricorn', 43, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const AquariusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Aquarius', 35, 26] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const PiscesWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Pisces', 17, 26] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reAriesWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Aries', 21, 2] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reTaurusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Taurus', 32, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reGeminiWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Gemini', 50, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reCancerWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Cancer', 11, 2] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reLeoWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Leo', 23, 22] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reVirgoWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Virgo', 56, 26] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reLibraWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Libra', 56, 17] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reScorpioWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Scorpio', 32, 3] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reSagittariusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Sagittarius', 27, 26] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reCapricornWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Capricorn', 56, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const reAquariusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Aquarius', 44, 12] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const rePiscesWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [
    { type: 'event', event: 'warpstar', many: ['Pisces', 50, 22] },
    { type: 'endTimeline' },
  ],
  No: [{ type: 'endTimeline' }],
};
export const OphiuchusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [7, 25] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const reOphiuchusWarp: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [7, 13] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const goBte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeBteBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'ビーテ', text: '…先日は兄者が世話になったようだね。' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '兄者って、草原にいたあいつか？' },
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'そうだ。\nそしてこの私こそ、軟弱な兄エーテよりずっとずっと強い、\n砂漠の四天王ビーテ様だ！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'わー弱そう。' },
    { type: 'event', event: 'bosslog', many: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさい！' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '頭も小さそうだな。' },
    { type: 'event', event: 'bosslog', many: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさい！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '貴様ら、黙って聞いておればビーテ様を侮辱しおって！',
    },
    { type: 'dialog', actorName: 'シデン', text: '黙ってはなかったぞ。' },
    { type: 'event', event: 'bosslog', many: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: '揚げ足ばかり取るなまどろっこしい！！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'どうやら、戦って分からせてやる必要がありそうだな…。',
    },
    { type: 'event', event: 'chdir', many: ['player', 'left'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'right'] },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'うわー脳筋だ。' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '間違いないな。' },
    { type: 'event', event: 'bosslog', many: [2] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'やかましい！！少しは勇者らしいセリフとか吐けんのか！！',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'ほら論点ずらした。' },
    { type: 'event', event: 'bosslog', many: [2] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '言っとくけど現時点でお前らの方が印象悪いからな！',
    },
    { type: 'event', event: 'chdir', many: ['player', 'left'] },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: 'くどい。\n早くバトルしろ。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'bosslog', many: [2] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'お前らのせいで伸びたんだろ！！おらぁ！！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '結局バトル突入セリフおらぁかよ。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const afterBteBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'ビーテ', text: 'ぐあぁっ、クソっ、こんな所で…。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'chdir', many: ['player', 'left'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'right'] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '大口叩いてた割には、って感じだったな。',
    },
    { type: 'dialog', actorName: 'シデン', text: '同感だ。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'これじゃ、あの兄者と一緒じゃないかぁ…。',
    },
    { type: 'dialog', actorName: 'ビーテ', text: 'ーテ兄弟の名に泥を塗ってしまった…。' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '名前の区切りビ・ーテだったんだな。' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '…ーテってなんて読むのこれ。' },
    { type: 'event', event: 'bosslog', many: [5] },
    { type: 'dialog', actorName: 'ビーテ', text: 'ちょうおんぷて、だよ…。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'ビーテ', text: '俺の名はビチョウオンプテ、だ…。' },
    { type: 'event', event: 'break', many: [] },
    { type: 'dialog', actorName: 'ビーテ', text: 'バタッ。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '『ー』って、長音符って言うんだ…。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: 'チョウオンプテ兄弟はやられたか。' },
    { type: 'dialog', actorName: '四天王C', text: '全く、情けないですねぇ…。' },
    {
      type: 'dialog',
      actorName: '四天王C',
      text: '我々四天王の名を汚してもらっては困るのですよ。',
    },
    {
      type: 'dialog',
      actorName: '四天王C',
      text: '…という訳でOBC、次はワタクシが奴らを仕留めて参りましょう。',
    },
    { type: 'dialog', actorName: 'OBC', text: 'エレカ、異存はないな。' },
    { type: 'dialog', actorName: 'エレカ', text: 'お母様の御心のままに。' },
    { type: 'dialog', actorName: 'OBC', text: 'しくじるんじゃないよ、メルシン。' },
    { type: 'dialog', actorName: 'メルシン', text: 'ワタクシに、全てお任せあれ…。' },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'delete', many: ['beforeBte'] },
    { type: 'event', event: 'delete', many: ['afterBte'] },
    { type: 'event', event: 'event', many: ['add2-1', 2, 1, addShiden] },
    { type: 'event', event: 'event', many: ['add2-2', 3, 1, addShiden] },
    {
      type: 'event',
      event: 'kill',
      many: [
        [7, 24],
        [6, 25],
        [8, 25],
        [7, 26],
      ],
    },
    { type: 'endTimeline' },
  ],
};
//Stage3
export const explanation3: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここはムギムギオーシャン。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: 'これより先、磁場の乱れにより、\n方位磁針が正常に動作しません。',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const dir1: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは太陽が沈みし場所。',
    },
    {
      type: 'dialog',
      text: '勇気ある者は崩れた石橋より、\n東に12、北に18、西に11、北に4、東に11進め。',
    },
    { type: 'endTimeline' },
  ],
};
export const dir2: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは太陽が頂きまで昇りし場所。',
    },
    {
      type: 'dialog',
      text: '勇気ある者は崩れた石橋より、\n北に22、西に9、南に2、東に2、南に4、西に2、南に2、\n東に4、南に2、西に2、南に5、東に2、南に4進め。',
    },
    { type: 'endTimeline' },
  ],
};
export const dir3: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは太陽が昇らざる場所。',
    },
    {
      type: 'dialog',
      text: '勇気ある者は崩れた石橋より、\n南に12、東に2、北に10、東に2、南に4、東に1、南に2、西に1、南に3、東に2、\n北に1、東に1、北に5、東に4、南に3、東に2、南に2、東に2、北に8、西に12進め。',
    },
    { type: 'endTimeline' },
  ],
};
export const addPouler: Timelines = {
  start: [
    { type: 'event', event: 'set', many: ['Shiden', 3, 2, undefined] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'down'] },
    { type: 'event', event: 'set', many: ['Pouler', 2, 1, undefined] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'down'] },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'パウラ', text: 'あ、あの…。' },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: 'お、どうしたお嬢ちゃん！' },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
    { type: 'dialog', actorName: 'パウラ', text: '私も、連れて行ってもらえませんか…？' },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'やめておけ、危険すぎる。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: '俺もシデンに賛成かな、敵も多いし。' },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'でも、お父さんとお母さんを助けたいんです！',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…詳しく聞かせてくれ。' },
    { type: 'event', event: 'log', many: ['Pouler', 4] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '最近、このムギムギオーシャンの一帯にも黒い霧の影響が出始めてるんです。',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'そのせいで水分が足りず、両親が渇きを訴えていて…。',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '水を飲めば一時的には治りますが、食事もままならなくなってしまい…。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…分かった、着いて来い。' },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
    { type: 'dialog', actorName: 'パウラ', text: '本当ですか！' },
    { type: 'event', event: 'chdir', many: ['Shiden', 'down'] },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'いいのか！マルク！' },
    { type: 'event', event: 'log', many: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '食事もままならない状況じゃ、放っておいてもこの子は飢え死にするかもしれねぇだろ。',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'なら、連れて行って魔王倒して、一緒に両親も救った方がいいだろ。',
    },
    { type: 'event', event: 'log', many: ['Pouler', 5] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'あ、ありがとうございます！\n回復魔法が使えるので、一生懸命がんばります！',
    },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'reset', many: ['Pouler'] },
    { type: 'event', event: 'delete', many: ['add3'] },
    { type: 'endTimeline' },
  ],
};
export const restart0: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', many: [4, 2] },
    { type: 'endTimeline' },
  ],
};
export const restart1: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', many: [58, 3] },
    { type: 'endTimeline' },
  ],
};
export const restart2: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', many: [26, 38] },
    { type: 'endTimeline' },
  ],
};
export const II: Timelines = {
  start: [
    { type: 'dialog', text: 'この渦に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [59, 3] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const III: Timelines = {
  start: [
    { type: 'dialog', text: 'この渦に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [26, 15] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const IV: Timelines = {
  start: [
    { type: 'dialog', text: 'この渦に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [31, 30] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const reI: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [24, 13] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const reII: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [53, 8] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const reIII: Timelines = {
  start: [
    { type: 'dialog', text: 'この穴に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [9, 34] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const warpstart: Timelines = {
  start: [
    { type: 'dialog', text: 'この渦に入りますか？' },
    {
      type: 'choice',
      choices: [
        { text: 'はい', timelineID: 'Yes' },
        { text: 'いいえ', timelineID: 'No' },
      ],
    },
  ],
  Yes: [{ type: 'event', event: 'warp', many: [4, 2] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const goMelcine: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [51, 28] },
    { type: 'event', event: 'set', many: ['Shiden', 52, 29, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 50, 29, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeMelcineBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [3] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'よくぞおいでくださいました！\nこのワタクシこそが、四天王一高貴な男、メルシンなのでっすぅ！！',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…俺もうこいつ嫌いかもしんない。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'メルシン', text: 'おやおや、それは残念ですねぇ…。' },
    { type: 'event', event: 'bosslog', many: [5] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'この美しき海の守り手の魅力が伝わらないだなんて…オヨヨ…。',
    },
    { type: 'event', event: 'chdir', many: ['Shiden', 'left'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'right'] },
    { type: 'event', event: 'log', many: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: 'なんだか、騒がしい人ですね。' },
    { type: 'event', event: 'log', many: ['Shiden', 5] },
    { type: 'dialog', actorName: 'シデン', text: 'ビーテとも大して変わらなそうだな。' },
    { type: 'event', event: 'bosslog', many: [3] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'dialog', actorName: 'メルシン', text: 'おや、聞き捨てなりませんねぇ！' },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'この高貴なワタクシを、あんな力押しの兄弟と一緒にされては困るのですよ！',
    },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'やつらは四天王の面汚しに過ぎません…。',
    },
    { type: 'event', event: 'bosslog', many: [2] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'このワタクシが、四天王の真の恐ろしさ、思い知らせて差し上げましょう！！',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const afterMelcineBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [3] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'ぬぅ、このワタクシが、敗れるなど…。',
    },
    { type: 'event', event: 'bosslog', many: [2] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'こんな無様な幕引きなんて、認めません、認めませんよォォォ！！！',
    },
    { type: 'event', event: 'log', many: ['player', 2] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'ごちゃごちゃうるせぇ野郎だな、とっとと行こうぜ。',
    },
    { type: 'event', event: 'chdir', many: ['player', 'right'] },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'right'] },
    { type: 'dialog', actorName: 'シデン', text: 'うむ、付き合うだけ時間の無駄だ。' },
    { type: 'event', event: 'bosslog', many: [3] },
    { type: 'dialog', actorName: 'メルシン', text: 'えっ、ちょ。' },
    { type: 'event', event: 'chdir', many: ['Pouler', 'right'] },
    { type: 'event', event: 'log', many: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: 'えぇ…。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: '…結局あんた以外、皆やられちまったよ。' },
    { type: 'dialog', actorName: 'エレカ', text: '当然よ、男は皆軟弱者だもの。' },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'ふん、言うじゃないか…。\n言わずもがな、次はお前の番さ。',
    },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '分かっているわ。\nお母様の元へは、虫けら1匹通しはしない…。',
    },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'reset', many: ['Pouler'] },
    { type: 'event', event: 'break', many: [] },
    { type: 'event', event: 'delete', many: ['goMelcine'] },
    { type: 'event', event: 'delete', many: ['beforeMelcine'] },
    { type: 'event', event: 'delete', many: ['afterMelcine'] },
    { type: 'endTimeline' },
  ],
};
//Stage4
export const explanation4: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここはどこなんだろう。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '溶岩石で出来た自然の迷宮',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const addMough: Timelines = {
  start: [
    { type: 'event', event: 'set', many: ['Shiden', 3, 2, undefined] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'down'] },
    { type: 'event', event: 'set', many: ['Pouler', 2, 1, undefined] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'down'] },
    { type: 'event', event: 'set', many: ['Mough', 2, 1, undefined] },
    { type: 'event', event: 'chdir', many: ['Mough', 'down'] },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: 'なぁ…なんか、着いてきてね？' },
    { type: 'event', event: 'log', many: ['Shiden', 1] },
    { type: 'dialog', actorName: 'シデン', text: 'なんか、ではない。' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '逆にこんな大男が着いてきていてなぜ今まで気付かなかった。',
    },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'なんの用だ、大男。' },
    { type: 'event', event: 'log', many: ['Mough', 3] },
    { type: 'dialog', actorName: 'マウ', text: '…おで？' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: '貴様以外に誰がいる。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マウ', text: 'お前ら、食堂、行く。' },
    { type: 'dialog', actorName: 'マルク', text: 'そうだな。' },
    { type: 'dialog', actorName: 'マウ', text: '食堂、魔王、居る。' },
    { type: 'dialog', actorName: 'パウラ', text: 'そうですね。' },
    { type: 'dialog', actorName: 'マウ', text: '魔王、強い。' },
    { type: 'dialog', actorName: 'シデン', text: 'その通りだ。' },
    { type: 'event', event: 'log', many: ['Mough', 3] },
    { type: 'dialog', actorName: 'マウ', text: 'マウも、強い。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'それは知らん。' },
    { type: 'event', event: 'log', many: ['Mough', 5] },
    { type: 'dialog', actorName: 'マウ', text: '腕試し、する。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '…それで着いてきてるのか。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'マルク', text: 'まぁ、力強そうだし。' },
    { type: 'event', event: 'log', many: ['player', 6] },
    { type: 'dialog', actorName: 'マルク', text: 'いいんじゃない？' },
    { type: 'event', event: 'log', many: ['Shiden', 5] },
    { type: 'dialog', actorName: 'シデン', text: 'いいな。' },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
    { type: 'dialog', actorName: 'パウラ', text: 'いいんですか！？' },
    { type: 'event', event: 'log', many: ['Mough', 5] },
    { type: 'dialog', actorName: 'マウ', text: 'マウ、強い、守る。' },
    { type: 'event', event: 'log', many: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: '確かに頼もしくはありますけど…。' },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'reset', many: ['Pouler'] },
    { type: 'event', event: 'reset', many: ['Mough'] },
    { type: 'event', event: 'delete', many: ['add4'] },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const goEleca: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeElecaBattle: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'どうせここの四天王も、威勢だけなんだろうなぁ。',
    },
    { type: 'event', event: 'log', many: ['Mough', 3] },
    { type: 'dialog', actorName: 'マウ', text: '待て。' },
    { type: 'event', event: 'chdir', many: ['Pouler', 'left'] },
    { type: 'event', event: 'log', many: ['Pouler', 1] },
    { type: 'dialog', actorName: 'パウラ', text: 'どうしたんですか？マウさん。' },
    { type: 'event', event: 'log', many: ['Mough', 4] },
    { type: 'dialog', actorName: 'マウ', text: 'こいつ、強い…。' },
    { type: 'event', event: 'bosslog', many: [5] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'あら、なかなか見る目がある仲間を連れてるじゃない。',
    },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'なんだこいつ…今までのとは気迫が違う…。',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…あれ？もしかしてピンと来てないの俺だけ？',
    },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'あの3人と同じだと思ってかかると痛い目に合うわよ。',
    },
    { type: 'event', event: 'bosslog', many: [5] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: 'ま、ここに足を踏み入れた時点で命は無いと思うことね。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '言ってくれるじゃねぇか、こっちは4人だぜ。',
    },
    { type: 'event', event: 'bosslog', many: [4] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '何人いたって関係ないわ。',
    },
    { type: 'event', event: 'bosslog', many: [3] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '全員まとめて叩き潰す。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const afterElecaBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'エレカ', text: 'うぐっ…おかあ…さま…。' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'はぁ…はぁ…流石に歯応えあったな…。' },
    { type: 'event', event: 'bosslog', many: [4] },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '…お母様は、私の比にならない強さよ、\nせいぜい…覚悟…しておきなさい…。',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'break', many: [] },
    { type: 'dialog', actorName: 'エレカ', text: 'バタッ。' },
    { type: 'event', event: 'chdir', many: ['player', 'down'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'down'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'left'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'right'] },
    { type: 'event', event: 'log', many: ['Pouler', 1] },
    { type: 'dialog', actorName: 'パウラ', text: '皆さん、お怪我は大丈夫ですか…？' },
    { type: 'event', event: 'log', many: ['Mough', 5] },
    { type: 'dialog', actorName: 'マウ', text: 'マウ、丈夫、マウ、平気。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'dialog', actorName: 'パウラ', text: '良かったです…。' },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'あいつの話によれば、OBCはこれの比にならない強さらしいな。',
    },
    { type: 'event', event: 'log', many: ['player', 1] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'ああ、折角ここまで来たんだ。\nもっと強くなって、魔王ぶっとばしてやろうぜ！',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'reset', many: ['Pouler'] },
    { type: 'event', event: 'reset', many: ['Mough'] },
    { type: 'event', event: 'delete', many: ['goEleca'] },
    { type: 'event', event: 'delete', many: ['beforeEleca'] },
    { type: 'event', event: 'delete', many: ['afterEleca'] },
    { type: 'endTimeline' },
  ],
};
//Stage5
export const explanation5: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは食堂。',
      actorName: '社松の看板',
    },
    {
      type: 'dialog',
      text: '何かヒント。',
      actorName: '社松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const castleAnnounce: Timelines = {
  start: [
    { type: 'event', event: 'log', many: ['player', 1] },
    {
      type: 'dialog',
      actorName: '？？？',
      text: 'あの世行き前半のグループ、あの世行き前半のグループ。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: '？？？', text: 'マルク' },
    { type: 'dialog', actorName: '？？？', text: 'シデン' },
    { type: 'dialog', actorName: '？？？', text: 'パウラ' },
    { type: 'dialog', actorName: '？？？', text: 'マウ' },
    { type: 'dialog', actorName: '？？？', text: '食堂の方に移動しなさい。' },
    { type: 'dialog', actorName: '？？？', text: 'マスクの着用を忘れないように。' },
    { type: 'dialog', actorName: '？？？', text: '……ま、もう死ぬから関係ないがね。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'endTimeline' },
  ],
};
export const goReAte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const goReBte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const goReMelcine: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const goReEleca: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const goObc: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', many: [8, 23] },
    { type: 'event', event: 'set', many: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Pouler', 6, 23, undefined] },
    { type: 'event', event: 'set', many: ['Mough', 6, 23, undefined] },
    { type: 'event', event: 'chdir', many: ['player', 'up'] },
    { type: 'event', event: 'chdir', many: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeObcBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'OBC', text: 'おや…まさか本当に来るとはね。' },
    { type: 'event', event: 'log', many: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'おい、貴様がOBCだな。' },
    { type: 'event', event: 'bosslog', many: [5] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'いかにも。\n私OBC、すなわち"おばちゃん"の略さ…。',
    },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'そんな…食堂の乗っ取り騒ぎも何もかも、自作自演だったって言うんですか！？',
    },
    { type: 'event', event: 'bosslog', many: [5] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'その通りだよ…。\n適当な所で切り上げて全部元通りにしてしまえば、食堂の復活を祝う客が沢山訪れる。',
    },
    { type: 'event', event: 'bosslog', many: [4] },
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
    { type: 'event', event: 'log', many: ['Mough', 5] },
    { type: 'dialog', actorName: 'マウ', text: '腕試し、できる、ウオオ！' },
    { type: 'event', event: 'chdir', many: ['Pouler', 'left'] },
    { type: 'event', event: 'log', many: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: 'マウさん、話聞いてますか…。' },
    { type: 'event', event: 'chdir', many: ['Pouler', 'up'] },
    { type: 'event', event: 'relog', many: [] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '…というか、霧によって味付けを濃くしたのも、あなたの仕業なんですか。',
    },
    { type: 'event', event: 'bosslog', many: [5] },
    { type: 'dialog', actorName: 'OBC', text: 'そうだよ、それも私さ。' },
    { type: 'event', event: 'log', many: ['Pouler', 3] },
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
    { type: 'event', event: 'bosslog', many: [1] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'その方がおいしいし、パワーが出るだろう？',
    },
    { type: 'event', event: 'relog', many: [] },
    { type: 'event', event: 'chdir', many: ['player', 'left'] },
    { type: 'event', event: 'chdir', many: ['Pouler', 'left'] },
    { type: 'event', event: 'chdir', many: ['Mough', 'right'] },
    { type: 'event', event: 'log', many: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: 'ふざけるな…。' },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'ふざけるなぁ！！' },
    { type: 'dialog', actorName: 'シデン', text: '俺はな、薄味が好みなんだぁぁ！！' },
    { type: 'event', event: 'bosslog', many: [5] },
    { type: 'dialog', actorName: 'OBC', text: 'ならば、濃い味に慣れさせるまでよ！！' },
    { type: 'event', event: 'bosslog', many: [4] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'ここまできたら後にも引けないからね\nこの世界まるごと、私の味で染め上げてくれる！！',
    },
    { type: 'event', event: 'log', many: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'そんなこと、させてたまるかぁぁ！！' },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '…俺のセリフは？' },
    { type: 'event', event: 'relog', many: [] },
  ],
};
export const afterObcBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'OBC', text: '…ふん、まさか、本当に倒されるとはね…。' },
    { type: 'dialog', actorName: 'OBC', text: '私も本当に、ここまでのようだ…。' },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'おい、お前。' },
    { type: 'event', event: 'bosslog', many: [4] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'なんだい…？\n私はもうすぐ力尽きる、文句があるなら今いいな…。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '大盛りご飯。' },
    { type: 'event', event: 'bosslog', many: [1] },
    { type: 'dialog', actorName: 'OBC', text: '…は？' },
    { type: 'event', event: 'log', many: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '魔王倒したら大盛りご飯無料なんだろ？' },
    { type: 'dialog', actorName: 'マルク', text: '早く出せよ。' },
    { type: 'event', event: 'bosslog', many: [4] },
    { type: 'dialog', actorName: 'OBC', text: 'ふん、バカだねぇ…。' },
    { type: 'event', event: 'bosslog', many: [5] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'そんな広告、自作自演に決まってるじゃないか…。',
    },
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'はぁ！？じゃあ、食べれねぇってことかよ！？',
    },
    { type: 'event', event: 'bosslog', many: [4] },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'まさかとは思うが、そのために来たのかい…？',
    },
    { type: 'event', event: 'bosslog', many: [5] },
    { type: 'dialog', actorName: 'OBC', text: '…ふふふ…ハハハハハハ！！' },
    { type: 'event', event: 'log', many: ['player', 2] },
    { type: 'dialog', actorName: 'マルク', text: 'おい！何笑ってんだよ！' },
    { type: 'event', event: 'bosslog', many: [5] },
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
    { type: 'event', event: 'log', many: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おい！もう死ぬみたいないこと言うんじゃねぇ！！',
    },
    { type: 'event', event: 'log', many: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'まだ…まだ死ぬなよぉ…。' },
    { type: 'event', event: 'relog', many: [] },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', many: ['Shiden'] },
    { type: 'event', event: 'reset', many: ['Pouler'] },
    { type: 'event', event: 'reset', many: ['Mough'] },
    { type: 'event', event: 'delete', many: ['goObc'] },
    { type: 'event', event: 'delete', many: ['beforeObc'] },
    { type: 'event', event: 'delete', many: ['afterObc'] },
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
