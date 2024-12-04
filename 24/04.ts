import { cleanInput } from "./utils";

// part 1
{
  const rawInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;
  const input = cleanInput(rawInput).map(e => e.split(""))
  const xmas = `XMAS`
  let count = 0;
  const dirMap = {
    n: [-1, 0],
    e: [0, 1],
    s: [1, 0],
    w: [0, -1],
    ne: [-1, 1],
    se: [1, 1],
    sw: [1, -1],
    nw: [-1, -1],
  }
  const dirs = Object.keys(dirMap)
  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[row].length; column++) {
      if (input[row][column] !== xmas[0]) {
        continue;
      }
      for(let dirInd = 0; dirInd < dirs.length; dirInd++){
        charLoop: for (let charInd = 0; charInd < xmas.length; charInd++) {
          const rowInd = dirMap[dirs[dirInd]][0];
          const columnInd = dirMap[dirs[dirInd]][1];
          const value = input?.[row + (rowInd * charInd)]?.[column + (columnInd * charInd)]
          
          if (!value || xmas[charInd] !== value) {
            break charLoop;
          }
          if (charInd === (xmas.length - 1)) {
            ++count
          }
        }
      }
    }
  }
  console.log(count)
}

// part 2
{
  const rawInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  const input = cleanInput(rawInput).map(e => e.split(""))
  const xmas = `MAS`
  let count = 0;
  const dirMap = {
    ne: [-1, 1],
    se: [1, 1],
    sw: [1, -1],
    nw: [-1, -1],
  }
  for (let row = 0; row < input.length; row++) {
    for (let column = 0; column < input[row].length; column++) {
      if (input[row][column] !== xmas[1]) {
        continue;
      }
      const expectedSortedEdges = `MSMS`
      const sortedEdges = [
        input?.[row + dirMap.ne[0]]?.[column + dirMap.ne[1]],
        input?.[row + dirMap.sw[0]]?.[column + dirMap.sw[1]],
      ].sort().concat([
        input?.[row + dirMap.nw[0]]?.[column + dirMap.nw[1]],
        input?.[row + dirMap.se[0]]?.[column + dirMap.se[1]]
      ].sort()).join('')
      if (sortedEdges === expectedSortedEdges) {
        ++count
      }
    }
  }
  console.log(count)
}