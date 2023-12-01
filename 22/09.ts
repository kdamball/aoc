import { cleanInput } from "./utils";

const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;


const insts = cleanInput(input).map(e => e.split(' ')).map(e => ({move: e[0], dist: Number(e[1])}));

let longRope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

const tailVisits = [longRope.at(-1).join(',')];

insts.forEach(inst => {
  let head, tail;
  for (let i = 0; i<inst.dist; i++) {
    for (let ind = 0; ind < (longRope.length - 1); ind++) {
      head = longRope[ind];
      tail = longRope[ind + 1];

      switch (inst.move){
        case 'R':
          if (ind === 0){ ++head[1] };
          break;
        case 'L':
          if (ind === 0){ --head[1] };
          break;
        case 'U':
          if (ind === 0){ --head[0]; }
          break;
        case 'D':
          if (ind === 0){ ++head[0] };
          break;
      }

      if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
        if (head[0] !== tail[0]) {
          tail[0] += head[0] > tail[0] ? 1 : -1;
        }
        if (head[1] !== tail[1]) {
          tail[1] += head[1] > tail[1] ? 1 : -1;
        }
      };
    }
    if (!tailVisits.includes(longRope.at(-1).join(','))) {
      tailVisits.push(longRope.at(-1).join(','));
    }
  }
});
console.log(tailVisits.length);
