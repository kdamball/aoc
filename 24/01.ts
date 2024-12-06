import { cleanInput, sortNumber } from "../utils";

// part 1
{
  const rawInput = `3   4
4   3
2   5
1   3
3   9
3   3`
  const {left, right} = cleanInput(rawInput).map(row => row.split(/\s+/).map(Number)).reduce((agg, curr) => {
    const [l, r] = curr
    agg.left.push(l)
    agg.right.push(r)
    return agg
  }, {left: [], right: []})
  const [sLeft, sRight] = [left.sort(sortNumber), right.sort(sortNumber)]
  const diff = sLeft.reduce((prev, curr, index) => {
    return prev + Math.abs(curr - sRight[index])
  }, 0)
  console.log(diff)
}

// part 2
{
  const rawInput = `3   4
4   3
2   5
1   3
3   9
3   3`
  const {left, right} = cleanInput(rawInput).map(row => row.split(/\s+/).map(Number)).reduce((agg, curr) => {
    const [l, r] = curr
    agg.left.push(l)
    agg.right.push(r)
    return agg
  }, {left: [], right: []})
  const [sLeft, sRight] = [left.sort(sortNumber), right.sort(sortNumber)]
  const countRight = sRight.reduce((agg, curr) => {
    agg[curr] = agg[curr] ? ++agg[curr] : 1
    return agg
  }, {})
  const countLeft = sLeft.reduce((count, curr) => {
    return count + (curr * (countRight[curr] ?? 0))
  }, 0)

  console.log(countLeft)
}