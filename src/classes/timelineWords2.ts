import { enemy } from 'enemies';
import { mough, pouler, shiden } from 'friends';
import { Timelines } from './Timelines';
import { Direction } from './Direction';
import { oceanGotsuji } from './timelineWords0';
//Stage2
export const explanation2: Timelines = {
  start: [
    {
      type: 'dialog',
      text: 'ここはソースワデザート。',
      actorName: '杜松の看板',
    },
    {
      type: 'dialog',
      text: 'ここはかつて黄道の王がいた砂漠。',
      actorName: '杜松の看板',
    },
    { type: 'endTimeline' },
  ],
};
export const meetShiden: Timelines = {
  start: [
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'event', event: 'log', props: ['Shiden', 1] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'このソースワデザートに人が来るとは珍しい…何用だ。',
    },
    { type: 'event', event: 'log', props: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おう、俺はマルク\n魔王を倒すために旅してんだ。',
    },
    { type: 'event', event: 'log', props: ['Shiden', 1] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そのために、砂漠の四天王を倒しに来たと…。',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'マルク', text: 'そういうことだ。' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '…まさかとは思うが、魔法も使えないのに1人で行くつもりじゃないだろうな。',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'よくそこまで分かったな。' },
    { type: 'event', event: 'log', props: ['Shiden', 3] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '杖も持ってないやつに魔法なんか使えるか。',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'お前も杖持って無いじゃん！' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '能ある鷹は杖を隠すんだよ。',
    },
    { type: 'event', event: 'relog', props: [] },
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
    { type: 'event', event: 'log', props: ['player', 4] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'なるほどな…そんで、お前魔法使えんの？',
    },
    { type: 'event', event: 'log', props: ['Shiden', 1] },
    { type: 'dialog', actorName: 'シデン', text: '使えると言えば連れて行かれるのか。' },
    { type: 'event', event: 'log', props: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '連れて行くって言ったらどうする？' },
    { type: 'event', event: 'log', props: ['Shiden', 3] },
    { type: 'dialog', actorName: 'シデン', text: '断る。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてかない。' },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ魔法使える。' },
    { type: 'event', event: 'log', props: ['player', 5] },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてく。' },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ話が違う。' },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'reset', props: ['Shiden'] },
    { type: 'event', event: 'relog', props: [] },
    {
      type: 'event',
      event: 'kill',
      props: [
        [2, 1],
        [3, 1],
        [4, 1],
      ],
    },
    { type: 'dialog', text: 'シデンを半ば強引に連れて行くことにした！' },
    { type: 'meetFriend', actor: shiden },
    { type: 'endTimeline' },
  ],
};
export const addShiden: Timelines = {
  start: [
    { type: 'event', event: 'set', props: ['Shiden', 3, 4, undefined] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'event', event: 'chdir', props: ['player', 'down'] },
    { type: 'event', event: 'log', props: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'そんじゃ、俺はこれで。\n世話になったな。',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'シデン', text: '…なぁ、俺も連れて行ってくれないか。' },
    { type: 'event', event: 'log', props: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おぉ！助かるけど、何か理由でもあるのか？',
    },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '魔王にまつわる黒い噂は知っているな？' },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '知らん。' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全く、倒そうとしているんじゃないのか…。',
    },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'シデン', text: 'まぁいい、教えてやるから覚えておけ。' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王の侵略地域、黒い霧が広まっているのは知っているな？',
    },
    { type: 'event', event: 'log', props: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: 'そうなの？' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '本当に何も知らないんだな…。' },
    { type: 'event', event: 'relog', props: [] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王に占拠された食堂の周りから、少しずつ黒い霧が広まってるんだよ。',
    },
    { type: 'event', event: 'log', props: ['player', 1] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'へぇ〜、黒い霧に包まれるとどうなるんだ？',
    },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: 'そこが問題なんだよ！！' },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: '急に熱くなるじゃん。' },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そりゃ熱くもなるさ！なにせ、黒い霧に包まれた場所では…。',
    },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'ゴクリ…。' },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全ての料理の味付けが、超濃い目になってしまうんだよ！！！',
    },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '…はぁ。' },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
    { type: 'dialog', actorName: 'シデン', text: '俺はな、薄味が好みなんだよ！！' },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'お、おぅ。' },
    { type: 'event', event: 'log', props: ['Shiden', 2] },
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
    { type: 'event', event: 'log', props: ['player', 5] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…まぁ着いてきてくれるならなんでもいいや。',
    },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'event', props: ['startC', 4, 22, oceanGotsuji, 'map0'] },
    { type: 'event', event: 'event', props: ['startC', 4, 23, oceanGotsuji, 'map0'] },
    {
      type: 'event',
      event: 'kill',
      props: [
        [2, 1],
        [3, 1],
      ],
    },
    { type: 'event', event: 'reset', props: ['Shiden'] },
    { type: 'dialog', text: 'シデンが仲間になった！' },
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
    { type: 'event', event: 'warpstar', props: ['Aries', 27, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Taurus', 44, 3] },
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
    { type: 'event', event: 'warpstar', props: ['Gemini', 16, 2] },
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
    { type: 'event', event: 'warpstar', props: ['Cancer', 29, 21] },
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
    { type: 'event', event: 'warpstar', props: ['Leo', 41, 7] },
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
    { type: 'event', event: 'warpstar', props: ['Virgo', 56, 26] },
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
    { type: 'event', event: 'warpstar', props: ['Libra', 27, 3] },
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
    { type: 'event', event: 'warpstar', props: ['Scorpio', 27, 17] },
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
    { type: 'event', event: 'warpstar', props: ['Sagittarius', 56, 3] },
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
    { type: 'event', event: 'warpstar', props: ['Capricorn', 43, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Aquarius', 35, 26] },
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
    { type: 'event', event: 'warpstar', props: ['Pisces', 17, 26] },
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
    { type: 'event', event: 'warpstar', props: ['Aries', 21, 2] },
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
    { type: 'event', event: 'warpstar', props: ['Taurus', 32, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Gemini', 50, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Cancer', 11, 2] },
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
    { type: 'event', event: 'warpstar', props: ['Leo', 23, 22] },
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
    { type: 'event', event: 'warpstar', props: ['Virgo', 56, 26] },
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
    { type: 'event', event: 'warpstar', props: ['Libra', 56, 17] },
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
    { type: 'event', event: 'warpstar', props: ['Scorpio', 32, 3] },
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
    { type: 'event', event: 'warpstar', props: ['Sagittarius', 27, 26] },
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
    { type: 'event', event: 'warpstar', props: ['Capricorn', 56, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Aquarius', 44, 12] },
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
    { type: 'event', event: 'warpstar', props: ['Pisces', 50, 22] },
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
  Yes: [{ type: 'event', event: 'warp', props: [7, 25] }, { type: 'endTimeline' }],
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
  Yes: [{ type: 'event', event: 'warp', props: [7, 13] }, { type: 'endTimeline' }],
  No: [{ type: 'endTimeline' }],
};
export const goBte: Timelines = {
  start: [
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'event', event: 'warp', props: [8, 23] },
    { type: 'event', event: 'set', props: ['Shiden', 6, 23, undefined] },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    { type: 'endTimeline' },
  ],
};
export const beforeBteBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', props: [4] },
    { type: 'dialog', actorName: 'ビーテ', text: '…先日は兄者が世話になったようだね。' },
    { type: 'event', event: 'log', props: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '兄者って、草原にいたあいつか？' },
    { type: 'event', event: 'log', props: ['player', 3] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'そうだ。\nそしてこの私こそ、軟弱な兄エーテよりずっとずっと強い、\n砂漠の四天王ビーテ様だ！',
    },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'わー弱そう。' },
    { type: 'event', event: 'bosslog', props: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさい！' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '頭も小さそうだな。' },
    { type: 'event', event: 'bosslog', props: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさい！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '貴様ら、黙って聞いておればビーテ様を侮辱しおって！',
    },
    { type: 'dialog', actorName: 'シデン', text: '黙ってはなかったぞ。' },
    { type: 'event', event: 'bosslog', props: [2] },
    { type: 'dialog', actorName: 'ビーテ', text: '揚げ足ばかり取るなまどろっこしい！！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'どうやら、戦って分からせてやる必要がありそうだな…。',
    },
    { type: 'event', event: 'chdir', props: ['player', 'left'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'right'] },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: 'うわー脳筋だ。' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '間違いないな。' },
    { type: 'event', event: 'bosslog', props: [2] },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'やかましい！！少しは勇者らしいセリフとか吐けんのか！！',
    },
    { type: 'event', event: 'log', props: ['player', 3] },
    { type: 'dialog', actorName: 'マルク', text: 'ほら論点ずらした。' },
    { type: 'event', event: 'bosslog', props: [2] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '言っとくけど現時点でお前らの方が印象悪いからな！',
    },
    { type: 'event', event: 'chdir', props: ['player', 'left'] },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: 'くどい。\n早くバトルしろ。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'bosslog', props: [2] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'お前らのせいで伸びたんだろ！！おらぁ！！',
    },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '結局バトル突入セリフおらぁかよ。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'battle', props: [enemy.bte] },
    { type: 'endTimeline' },
  ],
};
export const afterBteBattle: Timelines = {
  start: [
    { type: 'event', event: 'bosslog', props: [4] },
    { type: 'dialog', actorName: 'ビーテ', text: 'ぐあぁっ、クソっ、こんな所で…。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'event', event: 'chdir', props: ['player', 'left'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'right'] },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '大口叩いてた割には、って感じだったな。',
    },
    { type: 'dialog', actorName: 'シデン', text: '同感だ。' },
    { type: 'event', event: 'bosslog', props: [4] },
    { type: 'event', event: 'chdir', props: ['player', 'up'] },
    { type: 'event', event: 'chdir', props: ['Shiden', 'up'] },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'これじゃ、あの兄者と一緒じゃないかぁ…。',
    },
    { type: 'dialog', actorName: 'ビーテ', text: 'ーテ兄弟の名に泥を塗ってしまった…。' },
    { type: 'event', event: 'log', props: ['Shiden', 4] },
    { type: 'dialog', actorName: 'シデン', text: '名前の区切りビ・ーテだったんだな。' },
    { type: 'event', event: 'log', props: ['player', 1] },
    { type: 'dialog', actorName: 'マルク', text: '…ーテってなんて読むのこれ。' },
    { type: 'event', event: 'bosslog', props: [5] },
    { type: 'dialog', actorName: 'ビーテ', text: 'ちょうおんぷて、だよ…。' },
    { type: 'event', event: 'relog', props: [] },
    { type: 'dialog', actorName: 'ビーテ', text: '俺の名はビチョウオンプテ、だ…。' },
    { type: 'event', event: 'break', props: ['Bte'] },
    { type: 'dialog', actorName: 'ビーテ', text: 'バタッ。' },
    { type: 'event', event: 'log', props: ['player', 4] },
    { type: 'dialog', actorName: 'マルク', text: '『ー』って、長音符って言うんだ…。' },
    { type: 'event', event: 'relog', props: [] },
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
    { type: 'event', event: 'reset', props: ['Shiden'] },
    { type: 'event', event: 'delete', props: ['beforeBte'] },
    { type: 'event', event: 'delete', props: ['afterBte'] },
    { type: 'event', event: 'event', props: ['add2-1', 2, 1, addShiden] },
    { type: 'event', event: 'event', props: ['add2-2', 3, 1, addShiden] },
    { type: 'event', event: 'event', props: ['startB', 55, 22, oceanGotsuji, 'map0'] },
    { type: 'event', event: 'event', props: ['startB', 55, 23, oceanGotsuji, 'map0'] },
    {
      type: 'event',
      event: 'kill',
      props: [
        [7, 24],
        [6, 25],
        [8, 25],
        [7, 26],
      ],
    },
    { type: 'endTimeline' },
  ],
};
