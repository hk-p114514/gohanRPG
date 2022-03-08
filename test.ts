import { randF } from './src/functions/generalPurpose/rand';
const f = (status: number, level: number) => {
  if (status <= 1) {
    return 2;
  }
  status += Math.floor(status * randF(0.1, 0.8));
  console.log(status);
};

for (let i = 0; i < 10; i++) {
  f(1, 1);
}
