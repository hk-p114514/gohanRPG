export const sceneKeys = {
  preload: 'preload',
  system: 'system',
  map1: 'map1',
  map2: 'map2',
  battle: 'battle',
  ui: 'ui',
  prologue: 'prologue', 
  title: 'title',
  gameover: 'gameover',
};

export type SceneKeys = keyof typeof sceneKeys;
