export type ObjectPoint = {
  id: number;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  point: boolean;
  rotation: number;
  type: string;
  visible: boolean;
};

export const gameObjectsToObjectPoints = (gameObjects: unknown[]): ObjectPoint[] => {
  return gameObjects.map((obj) => obj as ObjectPoint);
};
