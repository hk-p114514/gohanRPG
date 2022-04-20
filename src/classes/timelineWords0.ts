import { enemy } from 'enemies';
import { mough, pouler, shiden } from 'friends';
import { Timelines } from './Timelines';
import { Direction } from './Direction';
import { addShiden } from './timelineWords2';
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
  start: [
    { type: 'judge', scene: 'map5', timelineID: 'final' },
    {
      type: 'dialog',
      text: '食堂は固く閉ざされている。',
    },
    { type: 'endTimeline' },
  ],
  final: [{ type: 'switch', scene: 'map5' }, { type: 'endTimeline' }],
};

export const stoper1: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper2: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper3: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper4: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper5: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper6: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper7: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
    },
    { type: 'endTimeline' },
  ],
};
export const stoper8: Timelines = {
  start: [
    {
      type: 'dialog',
      text: '見えない(?)壁に塞がれている。',
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
  Yes: [
    { type: 'event', event: 'delete', props: ['tutorial1'] },
    { type: 'endTimeline' },
  ],
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

export const explanation: Timelines = {
  start: [
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'notMob', direction: Direction.LEFT },
    },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'ダカフ', text: 'おい、そこの若者！' },
    {
      type: 'event',
      event: 'chdir',
      contents: { name: 'player', direction: Direction.RIGHT },
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 3 } },
    { type: 'dialog', actorName: 'マルク', text: 'ん？なんか用か？爺さん' },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '村の中そんな格好で出てくるとは珍しい\nどこか行くところでもあるのか？',
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'マルク', text: 'あぁ、魔王…' },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '魔王を倒しに食堂に行こうというのか！勇ましいのう！',
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'マルク', text: 'えっと、まだ何も' },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '食堂が魔王に占拠され、ついには魔王城とまで呼ばれるようになり、もう何ヶ月になるかのう…',
    },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 1 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'して若者よ、食堂に行くのになにか策はあるのか？',
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 4 } },
    { type: 'dialog', actorName: 'マルク', text: 'べ' },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 3 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '無策ではいかんなぁ、この間突入した警備隊は、入ることすら叶わなんだ',
    },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'なんでも、入り口には4つの鍵がかかっておったそうじゃ…',
    },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '噂に聞いた話じゃが、その鍵のうちの1つは、\nサバレーフィールドの赤い魔物が持っとるそうじゃな！',
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'サバ',
    },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'サバレーか、懐かしいのぅ、確かこの道を左に行ったところじゃったかのう…',
    },
    { type: 'event', event: 'log', contents: { name: 'notMob', bubbleIndex: 5 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'ワシが若い頃はよく婆さんとピクニックに行ったのぅ…',
    },
    { type: 'event', event: 'log', contents: { name: 'player', bubbleIndex: 4 } },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'あの頃はワシもブイブイ言わしておってな、\n婆さんは魔物を次々に倒すワシの勇姿にほれぼれしててのぅ、\nしかし今ではそんなワシを尻に敷くんじゃから人間わからんもんで…',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'これもうそのまま行っちゃっていいかな…',
    },
    { type: 'event', event: 'relog', contents: { name: 'proto' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper1' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper2' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper3' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper4' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper5' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper6' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper7' } },
    { type: 'event', event: 'reset', contents: { name: 'stoper8' } },
    {
      type: 'event',
      event: 'kill',
      contents: {
        xy: [
          { x: 29, y: 8 },
          { x: 30, y: 8 },
        ],
      },
    },
    { type: 'endTimeline' },
  ],
};

export const afterGotsuji: Timelines = {
  //
  start: [
    { type: 'dialog', actorName: 'ダカフ', text: 'あの頃はよかったの〜！' },
    { type: 'endTimeline' },
  ],
};
export const desertGotsuji: Timelines = {
  start: [
    { type: 'event', event: 'reset', props: ['notMob'] },
    { type: 'event', event: 'set', props: ['notMob2', 6, 22, undefined] },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'おお！帰ったか若者よ！\n街はお主の噂で持ち切りじゃぞ！',
    },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'お主が旅をしていた間、ワシも指をくわえていた訳ではないぞい！',
    },
    { type: 'dialog', actorName: 'マルク', text: 'あの、爺さん誰だっk' },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '次の鍵のありかの噂を嗅ぎ回っていたんじゃ！',
    },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'なんでも、ソースワデザートの青い魔物が怪しいらいいぞい！',
    },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'さぁ、ワシもこうしちゃいられん！次の噂の聞き込みじゃ！',
    },
    { type: 'dialog', actorName: 'マルク', text: '…誰だ、今の爺さん' },
    {
      type: 'event',
      event: 'kill',
      props: [
        [55, 22],
        [55, 23],
        [4, 22],
        [4, 23],
      ],
    },
    { type: 'event', event: 'reset', props: ['notMob2'] },
    { type: 'endTimeline' },
  ],
};
export const oceanGotsuji: Timelines = {
  //sample018.png
  //
  start: [
    { type: 'event', event: 'set', props: ['notMob3', 53, 22, undefined] },
    { type: 'dialog', actorName: 'ダカフ', text: '待ちわびたぞ！若者！' },
    { type: 'dialog', actorName: 'マルク', text: 'なんだいきなr' },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'ワシはもうとっくに次の鍵の情報をつかんでおったというに…',
    },
    { type: 'dialog', actorName: 'ダカフ', text: 'こんな年寄りに負けて悔しくないのか！' },
    { type: 'dialog', actorName: 'マルク', text: '別に競ってはな' },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '次の鍵は、ムギムギオーシャンの白い魔物が持っているそうじゃ！',
    },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'さ、ワシは最後の鍵の噂を探しに行くぞ！善は急げじゃ！',
    },
    {
      type: 'event',
      event: 'kill',
      props: [
        [55, 22],
        [55, 23],
        [4, 12],
        [4, 13],
      ],
    },
    { type: 'event', event: 'reset', props: ['notMob3'] },
    { type: 'endTimeline' },
  ],
};
export const volcanoGotsuji: Timelines = {
  start: [
    { type: 'event', event: 'set', props: ['notMob4', 6, 12, undefined] },
    { type: 'dialog', actorName: 'ダカフ', text: 'さ！最後はキーマボルケーノじゃ！' },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: '分かったら休んどらんでさっさと行けい！じゃあな！',
    },
    {
      type: 'event',
      event: 'kill',
      props: [
        [55, 12],
        [55, 13],
        [4, 12],
        [4, 13],
      ],
    },
    { type: 'event', event: 'reset', props: ['notMob4'] },
    { type: 'endTimeline' },
  ],
};

export const beBijinesuman: Timelines = {
  //sample019.png
  start: [
    {
      type: 'dialog',
      text: '魔王の影響が僕のビジネスにまで及んできた...\n誰か倒してくれないかなぁ。',
      actorName: 'ビジネスマン',
    },
    { type: 'endTimeline' },
  ],
};

export const beJK1: Timelines = {
  //sample018.png
  //
  start: [
    {
      type: 'dialog',
      text: '最近魔王のせいでウチの門限厳しくなってさーマジ最悪ー。',
      actorName: '金髪JK',
    },
    {
      type: 'dialog',
      text: 'わかるー。ウチもそうだよ。どうにかなんないかなぁ。',
      actorName: '黒髪JK',
      //
    },
    { type: 'endTimeline' },
  ],
};
export const beJK2: Timelines = {
  //sample018.png
  start: [
    {
      type: 'dialog',
      text: '最近魔王のせいでウチの門限厳しくなってさーマジ最悪ー。',
      actorName: '金髪JK',
    },
    {
      type: 'dialog',
      text: 'わかるー。ウチもそうだよ。どうにかなんないかなぁ。',
      actorName: '黒髪JK',
      //
    },
    { type: 'endTimeline' },
  ],
};
export const beTyuubou: Timelines = {
  //sample015.png
  start: [
    {
      type: 'dialog',
      text: '魔王なんてオレのこの腕の力で...ブツブツ',
      actorName: '中坊',
    },
    { type: 'endTimeline' },
  ],
};
export const beEruhu: Timelines = {
  //sample005.png
  start: [
    {
      type: 'dialog',
      text: '魔王軍のやつらのせいで僕の家がある森に誰も遊びに来なくなっちゃったよ。\n寂しいな...。',
      actorName: 'エルフ',
    },
    { type: 'endTimeline' },
  ],
};
export const beKisi: Timelines = {
  //sample003.png
  start: [
    {
      type: 'dialog',
      text: 'ふっ魔王軍なんぞ恐るるに足らず！この町は私が守る！',
      actorName: '騎士',
    },
    { type: 'endTimeline' },
  ],
};
export const beMajo: Timelines = {
  //sample006.png
  start: [
    {
      type: 'dialog',
      text: '（小声）クククッ魔除け薬なんてある訳ないじゃないww\n魔除け薬はいかがですかー？',
      actorName: '怪しげな魔女',
    },
    { type: 'endTimeline' },
  ],
};
export const beSyoujo: Timelines = {
  //sample012.png
  start: [
    {
      type: 'dialog',
      text: '私も魔法少女プリラみたいに大きくなったら悪い奴を退治するのー。',
      actorName: '少女',
    },
    { type: 'endTimeline' },
  ],
};
export const beRoujin: Timelines = {
  //sample013.png
  start: [
    {
      type: 'dialog',
      text: 'おぬしのその装備...さては魔王退治じゃな？\nほっほっほっ、頼もしい若者も居たもんじゃ。',
      actorName: '老人',
    },
    { type: 'endTimeline' },
  ],
};

export const afBijinesuman: Timelines = {
  //sample019.png
  start: [
    {
      type: 'dialog',
      text: '魔王軍のやつらが減って僕のビジネスが好調だよ！ありがとう！',
      actorName: 'ビジネスマン',
    },
    { type: 'endTimeline' },
  ],
};
export const afJK1: Timelines = {
  //sample018.png
  start: [
    {
      type: 'dialog',
      text: '門限ちょっとはマシになったけどまだまだキツいわー。',
      actorName: '金髪JK',
    },
    {
      type: 'dialog',
      text: '魔王が倒されたら元に戻るかなぁ。',
      actorName: '黒髪JK',
    },
    { type: 'endTimeline' },
  ],
};
export const afJK2: Timelines = {
  //sample017.png
  start: [
    {
      type: 'dialog',
      text: '門限ちょっとはマシになったけどまだまだキツいわー。',
      actorName: '金髪JK',
    },
    {
      type: 'dialog',
      text: '魔王が倒されたら元に戻るかなぁ。',
      actorName: '黒髪JK',
    },
    { type: 'endTimeline' },
  ],
};
export const afTyuubou: Timelines = {
  //sample015.png
  start: [
    {
      type: 'dialog',
      text: '俺が毎晩行っている儀式が効いているようだな...。\nあとはお前だけだ魔王よ。クククッ...',
      actorName: '中坊',
    },
    { type: 'endTimeline' },
  ],
};
export const afEruhu: Timelines = {
  //sample005.png
  start: [
    {
      type: 'dialog',
      text: '人が森に来てくれるようになって楽しい毎日に戻ったよ、ありがとう！\nあとは魔王だけらしいね、がんばってね！',
      actorName: 'エルフ',
    },
    { type: 'endTimeline' },
  ],
};
export const afKisi: Timelines = {
  //sample003.png
  start: [
    {
      type: 'dialog',
      text: 'この町はこの俺に任せろ！君は魔王にだけに集中しろ！がんばれ！',
      actorName: '騎士',
    },
    { type: 'endTimeline' },
  ],
};
export const afMajo: Timelines = {
  //sample006.png
  start: [
    {
      type: 'dialog',
      text: '（小声）このおこづかい稼ぎも潮時かぁ...。',
      actorName: '怪しげな魔女',
    },
    { type: 'endTimeline' },
  ],
};
export const afSyoujo: Timelines = {
  //sample012.png
  start: [
    {
      type: 'dialog',
      text: '私も大きくなったらあなたみたいに強くなれるかなー？',
      actorName: '少女',
    },
    { type: 'endTimeline' },
  ],
};
export const afRoujin: Timelines = {
  //sample013.png
  start: [
    {
      type: 'dialog',
      text: 'やはりおぬしは頼もしい若者じゃ！平和のためにも、魔王をがんばって倒してくれ！！',
      actorName: '老人',
    },
    { type: 'endTimeline' },
  ],
};

export const stopl: Timelines = {
  start: [
    { type: 'event', event: 'log', props: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'おっと、その先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'move', props: ['left'] },
    { type: 'endTimeline' },
  ],
};
export const stopr: Timelines = {
  start: [
    { type: 'event', event: 'log', props: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ダカフ',
      text: 'おっと、その先はまだ主には危険じゃぞい',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'move', props: ['right'] },
    { type: 'endTimeline' },
  ],
};

export const castleAnnounce: Timelines = {
  start: [
    { type: 'event', event: 'log', props: ['player', 1] },
    {
      type: 'dialog',
      actorName: '？？？',
      text: 'あの世行き前半のグループ、あの世行き前半のグループ。',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: '？？？', text: 'マルク' },
    { type: 'dialog', actorName: '？？？', text: 'シデン' },
    { type: 'dialog', actorName: '？？？', text: 'パウラ' },
    { type: 'dialog', actorName: '？？？', text: 'マウ' },
    { type: 'dialog', actorName: '？？？', text: '食堂の方に移動しなさい。' },
    { type: 'dialog', actorName: '？？？', text: 'マスクの着用を忘れないように。' },
    { type: 'dialog', actorName: '？？？', text: '……ま、もう死ぬから関係ないがね。' },
    { type: 'dialog', actorName: 'マルク', text: '……。' },
    { type: 'event', event: 'relog', props: [] },
    {
      type: 'event',
      event: 'kill',
      props: [
        [55, 12],
        [55, 13],
      ],
    },
    { type: 'event', event: 'reset', props: ['name1'] },
    { type: 'event', event: 'reset', props: ['name2'] },
    { type: 'event', event: 'reset', props: ['name3'] },
    { type: 'event', event: 'reset', props: ['name4'] },
    { type: 'event', event: 'reset', props: ['name5'] },
    { type: 'event', event: 'reset', props: ['name6'] },
    { type: 'event', event: 'reset', props: ['name7'] },
    { type: 'event', event: 'reset', props: ['name8'] },
    { type: 'event', event: 'reset', props: ['name9'] },
    { type: 'event', event: 'set', props: ['name1', 10, 10, afJK1] },
    { type: 'event', event: 'set', props: ['name2', 11, 10, afJK2] },
    { type: 'event', event: 'set', props: ['name3', 12, 10, afBijinesuman] },
    { type: 'event', event: 'set', props: ['name4', 13, 10, afEruhu] },
    { type: 'event', event: 'set', props: ['name5', 14, 10, afKisi] },
    { type: 'event', event: 'set', props: ['name6', 15, 10, afTyuubou] },
    { type: 'event', event: 'set', props: ['name7', 16, 10, afSyoujo] },
    { type: 'event', event: 'set', props: ['name8', 17, 10, afMajo] },
    { type: 'event', event: 'set', props: ['name9', 18, 10, afRoujin] },
    { type: 'endTimeline' },
  ],
};
export const explanation0: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここは町。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: '南西にサバレーフィールド。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: '南東にソースワデザート。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: '北西にムギムギオーシャン。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: '北東にキーマボルケーノ。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: '北に食堂。',
      actorName: '杜松の看板',
    },
    { type: 'endTimeline' },
  ],
};
