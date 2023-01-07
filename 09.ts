import { cleanInput } from "./utils";

const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;


const insts = cleanInput(input).map(e => e.split(' ')).map(e => ({move: e[0], dist: Number(e[1])}));

let tail = [0, 0];
let head = [0, 0];

const tailVisits = [tail.join(',')];

insts.forEach(inst => {
  for (let i = 0; i<inst.dist; i++) {
    switch (inst.move){
      case 'R':
        head = [head[0], ++head[1]];
        if (Math.abs(head[1] - tail[1]) > 1) {
          if (tail[1] !== head[1]) {
            tail = [head[0], tail[1]]
          }
          ++tail[1];
        }
        // console.log(inst, head, tail);
        break;
      case 'L':
        head = [head[0], --head[1]];
        if (Math.abs(head[1] - tail[1]) > 1) {
          if (tail[1] !== head[1]) {
            tail = [head[0], tail[1]]
          }
          --tail[1];
        }
        // console.log(inst, head, tail);
        break;
      case 'U':
        head = [--head[0], head[1]];
        if (Math.abs(head[0] - tail[0]) > 1) {
          if (tail[1] !== head[1]) {
            tail = [tail[0], head[1]]
          }
          --tail[0];
        }
        // console.log(inst, head, tail);
        break;
      case 'D':
        head = [++head[0], head[1]];
        if (Math.abs(head[0] - tail[0]) > 1) {
          if (tail[1] !== head[1]) {
            tail = [tail[0], head[1]]
          }
          ++tail[0];
        }
        // console.log(inst, head, tail);
        break;
    }
    if (!tailVisits.includes(tail.join(','))) {
      tailVisits.push(tail.join(','));
    }
  }
});

console.log(tailVisits.length);
