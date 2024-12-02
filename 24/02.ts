import { cleanInput } from "./utils";

// part 1
{
  const rawInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
  const input = cleanInput(rawInput).map(report => report.split(/\s+/).map(Number))
  const safe = input.filter(report => {
    let dir
    const len = report.length
    return report.every((lvl, ind ) => {
      if (len - 1 === ind) {
        return true
      }
      dir = ind === 0 ? (lvl > report[1] ? 'down' : 'up') : dir;
      const currDir = lvl > report[ind+1] ? 'down' : 'up'
      return currDir === dir && Math.abs(lvl - report[ind+1]) <= 3 && Math.abs(lvl - report[ind+1]) >=1
    }) 
  })
  console.log(safe.length)
}

// part 2
{
  const rawInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
  const input = cleanInput(rawInput).map(report => report.split(/\s+/).map(Number))
  let firstBadInd: null | number
  const createCompareLvls = () => {
    let dir
    return (lvl: number, ind: number, report: number[]) => {
      if (report.length - 1 === ind) {
        firstBadInd = null
        return true
      }
      dir = dir ?? (lvl > report[1] ? 'down' : 'up');
      const currDir = lvl > report[ind+1] ? 'down' : 'up'
      const validDir = currDir === dir
      const validDiff = Math.abs(lvl - report[ind+1]) <= 3 && Math.abs(lvl - report[ind+1]) >=1
      const valid = validDir && validDiff
      firstBadInd = !valid ? ind : firstBadInd
      return valid
    }
  }
  const safe = input.filter(rprt => {
    const firstRun = rprt.every(createCompareLvls());
    if (!firstRun) {
      // yuck!
      const first = rprt.slice(0, firstBadInd-1).concat(rprt.slice(firstBadInd))
      const second = rprt.slice(0, firstBadInd).concat(rprt.slice(firstBadInd+1)) 
      const third = rprt.slice(0, firstBadInd+1).concat(rprt.slice(firstBadInd+2)) 

      return first.every(createCompareLvls()) || second.every(createCompareLvls()) || third.every(createCompareLvls())
    }

    return firstRun
  })
  console.log(safe.length)
}
