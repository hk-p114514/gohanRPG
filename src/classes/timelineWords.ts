import { Timelines } from './Timelines';

export const timelineData: Timelines = {
  start: [
    // { type: 'startTimeline' },
    { type: 'dialog', text: '・・・・・・ ▼' },
    { type: 'dialog', text: 'う、うーん・・・ ▼' },
    { type: 'setBackground', x: 400, y: 300, key: 'street' },
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
    { type: 'setBackground', x: 400, y: 300, key: 'street' },
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
    { type: 'setBackground', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '事情はつかめないけどとりあえず従っておこう ▼' },
    { type: 'dialog', text: 'よろしい。ではこちらへ来てください ▼', actorName: 'ACT-42' },
    { type: 'clearForeground' },
    { type: 'dialog', text: 'こうして銀河を股にかけた物語が始まるのであった・・・ ▼' },
    // { type: 'sceneTransition', key: 'ending' },
    { type: 'endTimeline' },
  ],
  choice01_a02: [
    { type: 'setBackground', x: 400, y: 300, key: 'street' },
    { type: 'addForeground', x: 400, y: 300, key: 'robot' },
    { type: 'dialog', text: '・・・困りましたね ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: '今は事情を話している暇がないんです ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'あなたは捕まるべきではない ▼', actorName: 'ACT-42' },
    { type: 'dialog', text: 'もう一度聞きますね？ ▼', actorName: 'ACT-42' },
    { type: 'timelineTransition', timelineID: 'choice01' },
  ],
  choice01_a03: [
    { type: 'setBackground', x: 400, y: 300, key: 'street' },
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

export const prologue: Timelines = {
  start: [
    { type: 'dialog', text: 'はぁーあ、最近のヤトウは碌なのがいねぇなぁ…ん？', actorName: 'マルク' }, 
    { type: 'dialog', text: '魔王を倒せたら大盛りご飯無料？？', actorName: 'マルク' }, 
    { type: 'dialog', text: 'へぇ…腹減ってんだ、ちょうどいい', actorName: 'マルク' }, 
    { type: 'dialog', text: '魔王でもヤトウでも、俺が倒してやろうじゃねーか', actorName: 'マルク' },
    { type: 'endTimeline' },
  ]
}

export const beforeAteBattle: Timelines = {
  start: [
    { type: 'dialog', text: 'おい！食堂への鍵を寄越せ！', actorName: 'マルク' }, 
    { type: 'dialog', text: 'ふん、初対面で随分偉そうな口を聞くじゃないか…', actorName: 'エーテ' },
    { type: 'dialog', text: 'この私が、魔王直属の四天王の一人、エーテ様と知っての言葉ではあるまいな！', actorName: 'エーテ' }, 
    { type: 'dialog', text: 'うん、知らんかった', actorName: 'マルク' }, 
    { type: 'dialog', text: 'あ、そう', actorName: 'エーテ'}, 
    { type: 'dialog', text: '……', actorName: 'マルク' }, 
    { type: 'dialog', text: '……', actorName: 'エーテ' }, 
    { type: 'dialog', text: 'なんか、ごめん', actorName: 'マルク' }, 
    { type: 'dialog', text: 'いいよ、俺もちょっと調子乗ってたし' }, 
    { type: 'dialog', text: '…雰囲気戻していい？', actorName: 'エーテ' }, 
    { type: 'dialog', text: 'お願いします', actorName: 'マルク' }, 
    { type: 'dialog', text: '母なる魔王の元へ行きたくば、この私を倒していくがいい！', actorName: 'エーテ' }, 
    { type: 'dialog', text: '魔王を倒そうなどという愚かな試み、この場でへし折ってくれるわ！', actorName: 'エーテ' }, 
    { type: 'endTimeline' }, 
  ]
}