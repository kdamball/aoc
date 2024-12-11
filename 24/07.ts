import { cleanInput, sum } from "../utils";

// part 1
{
  const rawInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
29: 2 3 4 5`
  const input = cleanInput(rawInput).map(row => row.split(": "))
  const checkPermutations = (output: number, nrs: number[]) => {
    const op = {
      '0': '+',
      '1': '*'
    }
    let i = 0
    while (i < Math.pow(2, nrs.length)) {
      const permutation = i.toString(2).padStart(nrs.length - 1, '0')
      const permutationResult = permutation.split('').reduce((agg, el, ind) => {
        const rawOp = `${ind === 0 ? nrs[ind] : agg}${op[el]}${nrs[ind+1]}`
        return eval(rawOp)
      }, 0)
      if (output === permutationResult) {
        return true
      }
      i++
    }
    return false
  }
  const validInput = input.filter(([output, ops]) => {
    return checkPermutations(Number(output), ops.split(' ').map(Number))
  })
  console.log(validInput.map(([output]) => Number(output)).reduce(sum, 0))
}

// part 2
{
  const rawInput = `321: 2 3 4 5
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`
  const input = cleanInput(rawInput).map(row => row.split(": "))
  const checkPermutations = (output: number, nrs: number[]) => {
    const op = {
      '0': '+',
      '1': '*',
      '2': '||'
    }
    let i = 0
    while (i < Math.pow(3, nrs.length) && i.toString(3).padStart(nrs.length - 1, '0').length < nrs.length) {
      const permutation = i.toString(3).padStart(nrs.length - 1, '0')
      const permutationResult = permutation.split('').reduce((agg, el, ind) => {
        const rawOp = `${agg}${ op[el] !== op['2'] ? op[el] : nrs[ind+1] }${op[el] !== op['2'] ? nrs[ind+1] : ''}`
        return eval(rawOp)
      }, nrs[0])
      if (output === permutationResult) {
        return true
      }
      i++
    }
    return false
  }
  const validInput = input.filter(([output, ops]) => {
    return checkPermutations(Number(output), ops.split(' ').map(Number))
  })
  console.log(validInput.map(([output]) => Number(output)).reduce(sum, 0))
}

