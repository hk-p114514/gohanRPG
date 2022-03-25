export const randI = (max: number, min: number = 0): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randF = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const randArr = <T>(arr: T[]): T => {
  return arr[randI(arr.length)];
};
