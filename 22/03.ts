
const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const cleanInput = (input: string) => input.split('\n');

const findDuplicate = (full: string) => {
  return full.substring(0, full.length/2).split('').find(char => full.substring(full.length/2, full.length).includes(char))
}
const getCharValue = (char: string) => {
  return char.charCodeAt(0) > 96 ? char.charCodeAt(0) - 96 : char.charCodeAt(0) - 38
}

const findCommonItem = (acc: string[], curr: string, ind: number, list: string[]) => {
  if (ind % 3 !== 0) { return acc; }
  acc.push(curr.split('').find(char => list[ind + 1].includes(char) && list[ind + 2].includes(char)))
  return acc;
}

const totalValue = cleanInput(input).map(findDuplicate).map(getCharValue).reduce((a,b) => a+b, 0);

const totalCommonItemsValue = cleanInput(input).reduce(findCommonItem, []).map(getCharValue).reduce((a,b) => a+b, 0);

export default totalValue

console.log({totalValue, totalCommonItemsValue});