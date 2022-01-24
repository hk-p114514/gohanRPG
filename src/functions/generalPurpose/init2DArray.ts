export const init2DArray = <T>(rows: number, cols: number, val: T): T[][] => {
  return [...Array(rows)].map(() => Array(cols).fill(val));
};
