import { Scene } from 'phaser';
import { sceneKeys } from 'scenes/sceneKeys';
import { Timeline } from 'classes/Timeline';

// ダイアログ表示関数
//引数の書き方： (scene, [{type:'--', text:'~~'}, {}, {}])
export const skillDialog = (scene: Scene, timelineData: Timeline) => {
  scene.scene.launch(sceneKeys.timelinePlayer, {
    anotherScene: scene,
    timelinedata: { start: timelineData },
  });
};
