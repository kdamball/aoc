import { sortNumber } from './utils';

const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

type Monkeh = {
  items: number[];
  div: number;
  op: (int: number) => number;
  test: (int: number) => number
}

const getMonkehs = (input: string) => {
  return input.split(`\n\n`).map(inst => {
    return inst.split('\n').reduce((acc, m, i, arr) => {
      switch(i) {
        case 0:
          return acc;
        case 1:
          return {
            ...acc,
            items: m.replace('Starting items: ', '').split(', ').map(Number),
          };
        case 2:
          return {
            ...acc,
            op: (old: number): number => { return eval(m.replace('Operation: new = ', ''))}
          }
        case 3:
        case 4:
        case 5: 
          return {
            ...acc,
            div: Number(arr[3].split(' ').at(-1)),
            test: (val: number) => val % Number(arr[3].split(' ').at(-1)) === 0 ? Number(arr[4].split(' ').at(-1)) : Number(arr[5].split(' ').at(-1))
          };
      }
    }, {} as Monkeh)
  });
};

const monkehs = getMonkehs(input);

const inspections = monkehs.map(_ => 0);
const rounds = 10000;
const worryReducer = 1;

// we really only care about divisors
// find lowest common denominator of all divisors and always modulo
// on it whenever we go above it
const LCD = monkehs.reduce((acc, monkeh) => acc * monkeh.div, 1);


for (let i = 0; i < rounds; i++) {
  monkehs.forEach((monkeh, mInd) => {
    monkeh.items.forEach((item) => {
      const val = Math.floor(monkeh.op(item) / worryReducer) % LCD;
      monkehs[monkeh.test(val)].items.push(val);
      inspections[mInd]++;
    });
    monkeh.items = [];
  });
}

const sorted = [...inspections].sort(sortNumber);

console.log(inspections);
console.log(sorted.at(-2) * sorted.at(-1));

