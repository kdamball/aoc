import { cleanInput } from "./utils";

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const splitPair = (inp: string) => inp.split(',').map((ass: string )=> ass.split('-').map(Number))

const isContainedPair = (pair: number[][]) => {
  const [elf1, elf2] = pair;
  return (elf2[0] >= elf1[0] && elf1[1] >= elf2[1]) || (elf1[0] >= elf2[0] && elf2[1] >= elf1[1]);
}

const isOverlappingPair = (pair: number[][]) => {
  const [elf1, elf2] = pair;
  return (elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) || (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]);
}

export const contained = cleanInput(input).map(splitPair).filter(isContainedPair)
export const overlapping = cleanInput(input).map(splitPair).filter(isOverlappingPair);


