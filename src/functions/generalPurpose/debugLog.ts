const isDebug = true;

export const DEBUG = {
  log: (str: any) => {
    if (!isDebug) return;
    console.log(str);
  },
  error: (str: any) => {
    if (!isDebug) return;
    console.error(str);
  },
  table: (str: any) => {
    if (!isDebug) return;
    console.table(str);
  },
  dir: (str: any) => {
    if (!isDebug) return;
    console.dir(str);
  },
};
