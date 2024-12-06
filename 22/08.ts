import { cleanInput } from "../utils";

const input = `30373
25512
65332
33549
35390`;

const grid = cleanInput(input).map(e => e.split('').map(Number));

export let visible = 0;
let edge = 0;
let internal = 0;

// calculate visibility
grid.forEach((row, indR) => {
  row.forEach((item, indC) => {
    const isEdge = (indC % (row.length - 1) === 0) || (indR % (grid.length - 1) === 0);
    if (isEdge) {
      // console.log('isEdge', item, ++edge)
      visible++;
      return;
    }

    const tallestTrees = [
      Math.max(...row.slice(0,indC)),
      Math.max(...row.slice(indC+1)),
      Math.max(...grid.filter((_, i) => i < indR).map(r => r[indC])),
      Math.max(...grid.filter((_, i) => i > indR).map(r => r[indC]))
    ];
    const isTallest = item > Math.min(...tallestTrees);
    // console.log("internal", item, Math.min(...tallestTrees));
    if (isTallest) {
      visible++;
      return;
    }
  });
});

// scenic score
let scenicScore = 0;
grid.forEach((row, indR) => {
  row.forEach((item, indC) => {
    const isEdge = (indC % (row.length - 1) === 0) || (indR % (grid.length - 1) === 0);
    if (isEdge) {
      return;
    }

    const column = grid.map(r => r[indC]);

    const leftDistance = row.slice(0,indC).reverse().findIndex(e => e >= item) === -1 ? row.slice(0,indC).length : (row.slice(0,indC).reverse().findIndex(e => e >= item) + 1)
    const rightDistance = row.slice(indC+1).findIndex(e => e >= item) === -1 ? row.slice(indC+1).length : (row.slice(indC+1).findIndex(e => e >= item) + 1);
    const topDistance = column.slice(0,indR).reverse().findIndex(e => e >= item) === -1 ? column.slice(0,indR).slice(0,indR).length : (column.slice(0,indR).reverse().findIndex(e => e >= item) + 1)
    const downDistance = column.slice(indR + 1).findIndex(e => e >= item) === -1 ? column.slice(indR + 1).length : (column.slice(indR + 1).findIndex(e => e >= item) + 1)

    const currScore = topDistance * rightDistance * leftDistance * downDistance;
    
    scenicScore = currScore > scenicScore ? currScore : scenicScore;
  });
});

console.log(scenicScore, visible)