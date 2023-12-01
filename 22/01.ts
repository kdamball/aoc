const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

const sum = (acc: number, curr: number) => acc + curr;

const cleanInput = (input: string) => {
  return input.split("\n\n")
      .map(elfLoad => elfLoad.split("\n").map(Number))
};

const elfLoads = cleanInput(input).map(load => load.reduce(sum, 0));
const sortedElfLoads = [...elfLoads].sort((a,b) => a < b ? 1 : (a > b ? -1 : 0));
export const richestElf = sortedElfLoads[0];
export const totalLoad3RichestElves = sortedElfLoads.slice(0,3).reduce(sum, 0);

console.log(richestElf, totalLoad3RichestElves);
