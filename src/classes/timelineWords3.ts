import { enemy } from 'enemies';
import { mough, pouler, shiden } from 'friends';
import { Timelines } from './Timelines';
import { Direction } from './Direction';
import { oceanGotsuji, volcanoGotsuji } from './timelineWords0';
//Stage3
export const explanation3: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここはムギムギオーシャン。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: 'これより先、磁場の乱れにより、\n方位磁針が正常に動作しません。',
      actorName: '杜松の看板',
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
    { type: 'event', event: 'set', props: ['Shiden', 3, 2, undefined] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'down'] },
    { type: 'event', event: 'set', props: ['Pouler', 2, 1, undefined] },
    { type: 'event', event: 'chdir', props: ['Pouler', 'down'] },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'パウラ', text: 'あ、あの…。' },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'マルク', text: 'お、どうしたお嬢ちゃん！' },
    { type: 'event', event: 'log', props: ['Pouler', 3] },
    { type: 'dialog', actorName: 'パウラ', text: '私も、連れて行ってもらえませんか…？' },
    { type: 'event', event: 'log', props: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'やめておけ、危険すぎる。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'マルク', text: '俺もシデンに賛成かな、敵も多いし。' },
    { type: 'event', event: 'log', props: ['Pouler', 3] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'でも、お父さんとお母さんを助けたいんです！',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…詳しく聞かせてくれ。' },
    { type: 'event', event: 'log', props: ['Pouler', 4] },
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
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…分かった、着いて来い。' },
    { type: 'event', event: 'log', props: ['Pouler', 3] },
    { type: 'dialog', actorName: 'パウラ', text: '本当ですか！' },
    { type: 'event', event: 'chdir', props: ['Shiden', 'down'] },
    { type: 'event', event: 'log', props: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: 'いいのか！マルク！' },
    { type: 'event', event: 'log', props: ['player', 5] },
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
    { type: 'event', event: 'log', props: ['Pouler', 5] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'あ、ありがとうございます！\n回復魔法が使えるので、一生懸命がんばります！',
    },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'reset', props: ['Shiden'] },
    { type: 'event', event: 'reset', props: ['Pouler'] },
    { type: 'event', event: 'delete', props: ['add3'] },
    { type: 'dialog', text: 'パウラが仲間になった！' },
    { type: 'meetFriend', actor: pouler },
    { type: 'endTimeline' },
  ],
};

export const restart0: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', props: [4, 2] },
    { type: 'endTimeline' },
  ],
};
export const restart1: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', props: [58, 3] },
    { type: 'endTimeline' },
  ],
};
export const restart2: Timelines = {
  start: [
    { type: 'dialog', text: '道を踏み外した！' },
    { type: 'event', event: 'warp', props: [26, 38] },
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
  Yes: [{ type: 'event', event: 'warp', props: [59, 3] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [26, 15] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [31, 30] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [24, 13] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [53, 8] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [9, 34] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [4, 2] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};

export const goMelcine: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', props: [51, 28] },
    { type: 'event', event: 'set', props: ['Shiden', 52, 29, undefined] },
    { type: 'event', event: 'set', props: ['Pouler', 50, 29, undefined] },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', props: ['Pouler', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeMelcineBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', props: [3] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'よくぞおいでくださいました！\nこのワタクシこそが、四天王一高貴な男、メルシンなのでっすぅ！！',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '…俺もうこいつ嫌いかもしんない。' },
    { type: 'event', event: 'bosslog', props: [4] },
    { type: 'dialog', actorName: 'メルシン', text: 'おやおや、それは残念ですねぇ…。' },
    { type: 'event', event: 'bosslog', props: [5] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'この美しき海の守り手の魅力が伝わらないだなんて…オヨヨ…。',
    },
    { type: 'event', event: 'chdir', props: ['Shiden', 'left'] },
    { type: 'event', event: 'chdir', props: ['Pouler', 'right'] },
    { type: 'event', event: 'log', props: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: 'なんだか、騒がしい人ですね。' },
    { type: 'event', event: 'log', props: ['Shiden', 5] },
    { type: 'dialog', actorName: 'シデン', text: 'ビーテとも大して変わらなそうだな。' },
    { type: 'event', event: 'bosslog', props: [3] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', props: ['Pouler', 'up'] },
    { type: 'dialog', actorName: 'メルシン', text: 'おや、聞き捨てなりませんねぇ！' },
    { type: 'event', event: 'relog', props: [] },
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
    { type: 'event', event: 'bosslog', props: [2] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'このワタクシが、四天王の真の恐ろしさ、思い知らせて差し上げましょう！！',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'endTimeline' },
  ],
};
export const afterMelcineBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', props: [3] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'ぬぅ、このワタクシが、敗れるなど…。',
    },
    { type: 'event', event: 'bosslog', props: [2] },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'こんな無様な幕引きなんて、認めません、認めませんよォォォ！！！',
    },
    { type: 'event', event: 'log', props: ['player', 2] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'ごちゃごちゃうるせぇ野郎だな、とっとと行こうぜ。',
    },
    { type: 'event', event: 'chdir', props: ['player', 'right'] },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'right'] },
    { type: 'dialog', actorName: 'シデン', text: 'うむ、付き合うだけ時間の無駄だ。' },
    { type: 'event', event: 'bosslog', props: [3] },
    { type: 'dialog', actorName: 'メルシン', text: 'えっ、ちょ。' },
    { type: 'event', event: 'chdir', props: ['Pouler', 'right'] },
    { type: 'event', event: 'log', props: ['Pouler', 4] },
    { type: 'dialog', actorName: 'パウラ', text: 'えぇ…。' },
    { type: 'event', event: 'relog', props: [] },
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
    { type: 'event', event: 'reset', props: ['Shiden'] },
    { type: 'event', event: 'reset', props: ['Pouler'] },
    { type: 'event', event: 'break', props: ['Melcine'] },
    { type: 'event', event: 'delete', props: ['goMelcine'] },
    { type: 'event', event: 'delete', props: ['beforeMelcine'] },
    { type: 'event', event: 'delete', props: ['afterMelcine'] },
    { type: 'event', event: 'event', props: ['startD', 4, 12, volcanoGotsuji, 'map0'] },
    { type: 'event', event: 'event', props: ['startD', 4, 13, volcanoGotsuji, 'map0'] },
    { type: 'endTimeline' },
  ],
};
