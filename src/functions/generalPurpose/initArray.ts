export const initArray = <T>(size: number, val: T): T[] => {
  return Array(size).fill(val);
};
