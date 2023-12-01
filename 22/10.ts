import { cleanInput } from './utils';

const input = `addx 1
noop
addx 2
addx 5
addx 2
noop
noop
noop
addx 5
noop
noop
addx 1
addx 2
addx -5
addx 12
addx 1
addx 4
addx 2
noop
addx -1
addx 4
noop
noop
addx -37
addx 21
addx -13
addx -3
noop
addx 3
addx 2
addx 5
addx -2
addx 7
addx -2
addx 2
addx 11
addx -4
addx 3
noop
addx -18
addx 7
addx 14
addx 2
addx 5
addx -39
addx 1
addx 5
noop
noop
noop
addx 1
addx 4
noop
addx 12
addx 10
addx -17
addx 5
addx -17
addx 14
addx 6
noop
addx 3
addx 7
noop
noop
addx 2
addx 3
noop
addx -40
addx 40
addx -33
addx -2
noop
addx 3
addx 2
addx 5
addx -7
addx 8
noop
addx 6
addx 8
addx -11
addx 8
noop
addx -19
addx 27
noop
addx -2
addx 4
noop
addx -10
addx -27
noop
noop
addx 7
addx 4
addx -3
addx 2
addx 5
addx 2
addx -4
addx -3
addx 10
addx 15
addx -8
addx 2
addx 3
addx -2
addx 5
addx 2
addx 2
addx -39
addx 1
addx 3
addx 3
addx 3
noop
addx 2
addx 1
addx 4
addx -1
addx 2
addx 4
addx 1
noop
noop
addx 2
addx 5
addx 3
noop
noop
addx -27
addx 29
noop
addx 3
noop
noop`;

const insts = cleanInput(input);

const CYCLE_RANGE = 40;
const CYCLE_OFFSETS = [20, 21];
const MIN_CYCLE_RANGE = 20;
let totalX = 1;
let cycleCount = 0;
let lastCycle = 0;
let PIXEL = '#';

const signalStrength = insts.reduce((acc, curr) => {
  let currInst = 0;
  if (curr.startsWith('addx')) {
    cycleCount += 2;
    currInst = Number(curr.split(' ')[1]);
    totalX += currInst;
  } else {
    ++cycleCount;
  }

  if (CYCLE_OFFSETS.includes(cycleCount % CYCLE_RANGE) && cycleCount - lastCycle >= MIN_CYCLE_RANGE) {
    const isFullCycle = cycleCount % 20 === 0;
    const currCycle = (isFullCycle? cycleCount : cycleCount - 1);
    const cycleX = curr.startsWith('noop') ? totalX : (totalX - currInst);
    const currCycleValue = currCycle * cycleX;
    acc += currCycleValue;
    lastCycle = cycleCount;
  }
  return acc;
}, 0);

const screen = insts.reduce((acc, curr) => {
  let currInst = 0;
  let isAligned = Math.abs(totalX - (cycleCount % 40)) < 2;
  acc += isAligned ? PIXEL : '.';
  ++cycleCount;
  
  if (curr.startsWith('addx')) {
    acc += Math.abs(totalX - (cycleCount % 40)) < 2 ? PIXEL : '.';
    currInst = Number(curr.split(' ')[1]);
    totalX += currInst;
    ++cycleCount;
  }
  return acc;
}, ``).split('').map((e, i) => (((i + 1) % 40 === 0) ? `${e}\n` : e)).join('');

console.log(screen)
