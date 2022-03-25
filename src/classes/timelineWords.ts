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

export const prologue: Timelines = {
  start: [
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'はぁーあ、最近のヤトウはロクなのがいねぇなぁ…ん？',
    },
    { type: 'dialog', actorName: 'マルク', text: '魔王を倒せたら大盛りご飯無料？？' },
    { type: 'dialog', actorName: 'マルク', text: 'へぇ…腹減ってんだ、ちょうどいい' },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '魔王でもヤトウでも、俺が倒してやろうじゃねーか',
    },
    { type: 'endTimeline' },
  ],
};

export const beforeAteBattle: Timelines = {
  start: [
    { type: 'dialog', actorName: 'マルク', text: 'おい！食堂への鍵を寄越せ！' },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'ふん、初対面で随分偉そうな口を聞くじゃないか…',
    },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'この私が、魔王直属の四天王の一人、エーテ様と知っての言葉ではあるまいな！',
    },
    { type: 'dialog', actorName: 'マルク', text: 'うん、知らんかった' },
    { type: 'dialog', actorName: 'エーテ', text: 'あ、そう' },
    { type: 'dialog', actorName: 'マルク', text: '……' },
    { type: 'dialog', actorName: 'エーテ', text: '……' },
    { type: 'dialog', actorName: 'マルク', text: 'なんか、ごめん' },
    { type: 'dialog', actorName: 'エーテ', text: 'いいよ、俺もちょっと調子乗ってたし' },
    { type: 'dialog', actorName: 'エーテ', text: '…雰囲気戻していい？' },
    { type: 'dialog', actorName: 'マルク', text: 'お願いします' },
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
    { type: 'dialog', actorName: 'エーテ', text: 'ぐっ…こんな、所で…' },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: '俺は、四天王なんだ…こんな所で、倒れる訳にはいかないんだ…！',
    },
    { type: 'dialog', actorName: 'エーテ', text: '俺を生み出しし母、OBCの為に…！' },
    { type: 'dialog', actorName: 'マルク', text: 'OBC？なんだそれ？' },
    {
      type: 'dialog',
      actorName: 'エーテ',
      text: 'ふん、覚えておくといい…いずれ貴様を滅ぼす、偉大なる魔王の名だ…',
    },
    { type: 'dialog', actorName: 'エーテ', text: 'バタッ' },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…死に際に色々吐いてくれる系四天王だったな…',
    },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: 'エーテはもう倒れたか…' },
    { type: 'dialog', actorName: 'メルシン', text: 'ふん、奴は四天王の中でも最弱…' },
    { type: 'dialog', actorName: 'ビーテ', text: 'OBC、次は私に行かせてください' },
    { type: 'dialog', actorName: 'ビーテ', text: '兄の責任は私の責任でもあります' },
    { type: 'dialog', actorName: 'OBC', text: '良かろう、次は貴様に任せる' },
    { type: 'dialog', actorName: 'ビーテ', text: '必ずや、止めてみせます故…' },
    { type: 'endTimeline' },
  ],
};

export const meetShiden: Timelines = {
  start: [
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'このソースワデザートに人が来るとは珍しい…何用だ',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おう、俺はマルク\n魔王を倒すために旅してんだ',
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そのために、砂漠の四天王を倒しに来たと…',
    },
    { type: 'dialog', actorName: 'マルク', text: 'そういうことだ' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '…まさかとは思うが、魔法も使えないのに1人で行くつもりじゃないだろうな',
    },
    { type: 'dialog', actorName: 'マルク', text: 'よくそこまで分かったな' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '杖も持ってないやつに魔法なんか使えるか',
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'ここ一体の魔物は、砂塵から身を守るための硬い体を持つものが多い',
    },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '物理攻撃だけで突破するのは、正直無謀と言える',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'なるほどな…そんで、お前魔法使えんの？',
    },
    { type: 'dialog', actorName: 'シデン', text: '使えると言えば連れて行かれるのか' },
    { type: 'dialog', actorName: 'マルク', text: '連れて行くって行ったらどうする？' },
    { type: 'dialog', actorName: 'シデン', text: '断る' },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてかない' },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ魔法使える' },
    { type: 'dialog', actorName: 'マルク', text: 'じゃあ連れてく' },
    { type: 'dialog', actorName: 'シデン', text: 'じゃあ話が違う' },
    { type: 'endTimeline' },
  ],
};

export const beforeBteBattle: Timelines = {
  start: [
    { type: 'dialog', actorName: 'ビーテ', text: '…先日は兄者が世話になったようだね' },
    { type: 'dialog', actorName: 'マルク', text: '兄者って、草原にいたあいつか？' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'そうだ\nそしてこの私こそ、軟弱な兄エーテよりずっとずっと強い、\n砂漠の四天王ビーテ様だ！',
    },
    { type: 'dialog', actorName: 'マルク', text: 'わー弱そう' },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさい！' },
    { type: 'dialog', actorName: 'シデン', text: '頭も小さそうだな' },
    { type: 'dialog', actorName: 'ビーテ', text: 'うるさいうるさい！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '貴様ら、黙って聞いておればビーテ様を侮辱しおって！',
    },
    { type: 'dialog', actorName: 'シデン', text: '黙ってはなかったぞ' },
    { type: 'dialog', actorName: 'ビーテ', text: '揚げ足ばかり取るなまどろっこしい！！' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'どうやら、戦って分からせてやる必要がありそうだな…',
    },
    { type: 'dialog', actorName: 'マルク', text: 'うわー脳筋だ' },
    { type: 'dialog', actorName: 'シデン', text: '間違いないな' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'やかましい！！少しは勇者らしいセリフとか吐けんのか！！',
    },
    { type: 'dialog', actorName: 'マルク', text: 'ほら論点ずらした' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: '言っとくけど現時点でお前らの方が印象悪いからな！',
    },
    { type: 'dialog', actorName: 'シデン', text: 'くどい\n早くバトルしろ' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'お前らのせいで伸びたんだろ！！おらぁ！！',
    },
    { type: 'dialog', actorName: 'マルク', text: '結局バトル突入セリフおらぁかよ' },
    { type: 'endTimeline' },
  ],
};

export const afterBteBattle: Timelines = {
  start: [
    { type: 'dialog', actorName: 'ビーテ', text: 'ぐあぁっ、クソっ、こんな所で…' },
    { type: 'dialog', actorName: 'マルク', text: '大口叩いてた割には、って感じだったな' },
    { type: 'dialog', actorName: 'シデン', text: '同感だ' },
    {
      type: 'dialog',
      actorName: 'ビーテ',
      text: 'これじゃ、あの兄者と一緒じゃないかぁ…',
    },
    { type: 'dialog', actorName: 'ビーテ', text: 'ーテ兄弟の名に泥を塗ってしまった…' },
    { type: 'dialog', actorName: 'シデン', text: '名前の区切りビ・ーテだったんだな' },
    { type: 'dialog', actorName: 'マルク', text: '…ーテってなんて読むのこれ' },
    { type: 'dialog', actorName: 'ビーテ', text: 'ちょうおんぷて、だよ…' },
    { type: 'dialog', actorName: 'ビーテ', text: '俺の名はビチョウオンプテ、だ…' },
    { type: 'dialog', actorName: 'ビーテ', text: 'バタッ' },
    { type: 'dialog', actorName: 'マルク', text: '『ー』って、長音符って言うんだ…' },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: 'チョウオンプテ兄弟はやられたか' },
    { type: 'dialog', actorName: 'メルシン', text: '全く、情けないですねぇ…' },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: '我々四天王の名を汚してもらっては困るのですよ',
    },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: '…という訳でOBC、次はワタクシが奴らを仕留めて参りましょう',
    },
    { type: 'dialog', actorName: 'OBC', text: 'エレカ、異存はないな' },
    { type: 'dialog', actorName: 'エレカ', text: 'お母様の御心のままに' },
    { type: 'dialog', actorName: 'OBC', text: 'しくじるんじゃないよ、メルシン' },
    { type: 'dialog', actorName: 'メルシン', text: 'ワタクシに、全てお任せあれ…' },
    { type: 'endTimeline' },
  ],
};

export const addShiden: Timelines = {
  start: [
    { type: 'dialog', actorName: 'マルク', text: 'そんじゃ、俺はこれで\n世話になったな' },
    { type: 'dialog', actorName: 'シデン', text: '…なぁ、俺も連れて行ってくれないか' },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'おぉ！助かるけど、何か理由でもあるのか？',
    },
    { type: 'dialog', actorName: 'シデン', text: '魔王にまつわる黒い噂は知っているな？' },
    { type: 'dialog', actorName: 'マルク', text: '知らん' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全く、倒そうとしているんじゃないのか…',
    },
    { type: 'dialog', actorName: 'シデン', text: 'まぁいい、教えてやるから覚えておけ' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王の侵略地域、黒い霧が広まっているのは知っているな？',
    },
    { type: 'dialog', actorName: 'マルク', text: 'そうなの？' },
    { type: 'dialog', actorName: 'シデン', text: '本当に何も知らないんだな…' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '魔王に占拠された食堂の周りから、少しずつ黒い霧が広まってるんだよ',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'へぇ〜、黒い霧に包まれるとどうなるんだ？',
    },
    { type: 'dialog', actorName: 'シデン', text: 'そこが問題なんだよ！！' },
    { type: 'dialog', actorName: 'マルク', text: '急に熱くなるじゃん' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: 'そりゃ熱くもなるさ！なにせ、黒い霧に包まれた場所では…',
    },
    { type: 'dialog', actorName: 'マルク', text: 'ゴクリ…' },
    {
      type: 'dialog',
      actorName: 'シデン',
      text: '全ての料理の味付けが、超濃い目になってしまうんだよ！！！',
    },
    { type: 'dialog', actorName: 'マルク', text: '…はぁ' },
    { type: 'dialog', actorName: 'シデン', text: '俺はな、薄味が好みなんだよ！！' },
    { type: 'dialog', actorName: 'マルク', text: 'お、おぅ' },
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
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '…まぁ着いてきてくれるならなんでもいいや',
    },
    { type: 'endTimeline' },
  ],
};

export const addPouler: Timelines = {
  start: [
    { type: 'dialog', actorName: 'パウラ', text: 'あ、あの…' },
    { type: 'dialog', actorName: 'マルク', text: 'お、どうしたお嬢ちゃん' },
    { type: 'dialog', actorName: 'パウラ', text: '私も、連れて行ってもらえませんか…？' },
    { type: 'dialog', actorName: 'シデン', text: 'やめておけ、危険すぎる' },
    { type: 'dialog', actorName: 'マルク', text: '俺もシデンに賛成かな、敵も多いし' },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'でも、お父さんとお母さんを助けたいんです！',
    },
    { type: 'dialog', actorName: 'マルク', text: '…詳しく聞かせてくれ' },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '最近、このムギムギオーシャンの一帯にも黒い霧の影響が出始めてるんです',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'そのせいで水分が足りず、両親が渇きを訴えていて…',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: '水を飲めば一時的には治りますが、食事もままならなくなってしまい…',
    },
    { type: 'dialog', actorName: 'マルク', text: '…分かった、着いて来い' },
    { type: 'dialog', actorName: 'パウラ', text: '本当ですか！' },
    { type: 'dialog', actorName: 'シデン', text: 'いいのか！マルク！' },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: '食事もままならない状況じゃ、放っておいてもこの子は飢え死にするかもしれねぇだろ',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'なら、連れて行って魔王倒して、一緒に両親も救った方がいいだろ',
    },
    {
      type: 'dialog',
      actorName: 'パウラ',
      text: 'あ、ありがとうございます！\n回復魔法が使えるので、一生懸命がんばります！',
    },
    { type: 'endTimeline' },
  ],
};

export const beforeMelcineBattle: Timelines = {
  start: [
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'よくぞおいでくださいました！\nこのワタクシこそが、四天王一高貴な男、メルシンなのでっすぅ！！',
    },
    { type: 'dialog', actorName: 'マルク', text: '…俺もうこいつ嫌いかもしんない' },
    { type: 'dialog', actorName: 'メルシン', text: 'おやおや、それは残念ですねぇ…' },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'この美しき海の守り手の魅力が伝わらないだなんて…オヨヨ…',
    },
    { type: 'dialog', actorName: 'パウラ', text: 'なんだか、騒がしい人ですね' },
    { type: 'dialog', actorName: 'シデン', text: 'ビーテとも大して変わらなそうだな' },
    { type: 'dialog', actorName: 'メルシン', text: 'おや、聞き捨てなりませんねぇ！' },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'この高貴なワタクシを、あんな力押しの兄弟と一緒にされては困るのですよ！',
    },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'やつらは四天王の面汚しに済みません…',
    },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'このワタクシが、四天王の真の恐ろしさ、思い知らせて差し上げましょう！！',
    },
    { type: 'endTimeline' },
  ],
};

export const afterMelcineBattle: Timelines = {
  start: [
    { type: 'dialog', actorName: 'メルシン', text: 'ぬぅ、このワタクシが、敗れるなど…' },
    {
      type: 'dialog',
      actorName: 'メルシン',
      text: 'こんな無様な幕引きなんて、認めません、認めませんよォォォ！！！',
    },
    {
      type: 'dialog',
      actorName: 'マルク',
      text: 'ごちゃごちゃうるせぇ野郎だな、とっとと行こうぜ',
    },
    { type: 'dialog', actorName: 'シデン', text: 'うむ、付き合うだけ時間の無駄だ' },
    { type: 'dialog', actorName: 'メルシン', text: 'えっ、ちょ' },
    { type: 'dialog', actorName: 'パウラ', text: 'えぇ…' },
    { type: 'setBackgroundColor', color: '#000' },
    { type: 'dialog', actorName: 'OBC', text: '…結局あんた以外、皆やられちまったよ' },
    { type: 'dialog', actorName: 'エレカ', text: '当然よ、男は皆軟弱者だもの' },
    {
      type: 'dialog',
      actorName: 'OBC',
      text: 'ふん、言うじゃないか…\n言わずもがな、次はお前の番さ',
    },
    {
      type: 'dialog',
      actorName: 'エレカ',
      text: '分かっているわ\nお母様の元へは、虫けら1匹通しはしない…',
    },
    { type: 'endTimeline' },
  ],
};
