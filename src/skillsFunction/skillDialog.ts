import { Scene } from 'phaser';
import { sceneKeys } from 'scenes/sceneKeys';
import { Timeline } from 'classes/Timeline';
import { BattleActor } from 'classes/BattleActor';
import { system } from 'index';

// ダイアログ表示関数
//引数の書き方： (scene, [{type:'--', text:'~~'}, {}, {}])
export const skillDialog = (scene: Scene, timelineData: Timeline) => {
  scene.scene.launch(sceneKeys.timelinePlayer, {
    anotherScene: scene,
    timelineData: { start: timelineData },
  });
};

// バトル時のダイアログの視点をattacker視点に変更
export const changeToFriendsView = (attacker: BattleActor, target: BattleActor[]) => {
  if (system.getParty().includes(attacker)) {
    // 味方の技
    if (target.includes(attacker)) {
      // 味方へ（味方視点）
      return '味方';
    } else {
      // 敵へ（味方視点）
      return '敵';
    }
  } else {
    // 敵の技
    if (target.includes(attacker)) {
      // 味方へ（敵視点）
      return '敵';
    } else {
      // 敵へ（敵視点）
      return '味方';
    }
  }
};
