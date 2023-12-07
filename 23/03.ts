import { cleanInput, sum } from "./utils";

// part 1
{
const input = cleanInput(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);
  const isSpecialSign = /[^0-9.]/
  const validNumbers: number[] = [];
  
  input.forEach((line, lineIndex) => {
    let numberIndeces: number[] = [];
    let number = ''
    let isValidNumber: boolean = false;
    line.trim().split('').forEach((char, charIndex) => {
      if (!isNaN(Number(char))) {
        number = `${number}${char}`
        numberIndeces.push(charIndex)
      }

      if (!input[lineIndex][charIndex + 1] || isNaN(Number(input[lineIndex][charIndex + 1]))) {
        isValidNumber = numberIndeces.some(i => {
          console.log({number})
          console.log(input[lineIndex-1]?.[i-1])
          return (input[lineIndex-1]?.[i] && isSpecialSign.test(input[lineIndex-1]?.[i])) ||
          (input[lineIndex-1]?.[i-1] && isSpecialSign.test(input[lineIndex-1]?.[i-1])) ||
          (input[lineIndex-1]?.[i+1] && isSpecialSign.test(input[lineIndex-1]?.[i+1])) ||
          (input[lineIndex]?.[i-1] && isSpecialSign.test(input[lineIndex]?.[i-1])) ||
          (input[lineIndex]?.[i+1] && isSpecialSign.test(input[lineIndex]?.[i+1])) ||
          (input[lineIndex+1]?.[i] && isSpecialSign.test(input[lineIndex+1]?.[i])) ||
          (input[lineIndex+1]?.[i-1] && isSpecialSign.test(input[lineIndex+1]?.[i-1])) ||
          (input[lineIndex+1]?.[i+1] && isSpecialSign.test(input[lineIndex+1]?.[i+1]))
        })
        isValidNumber ? validNumbers.push(Number(number)) : undefined;
        number = ''
        numberIndeces = []
        isValidNumber = false
      }
    })
  })
  const tot = validNumbers.reduce(sum, 0);
  console.log({tot});
}

// part 2
{
const input = cleanInput(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);
  const isGearSign = /\*/
  const numberIndeces: number[][][] = [];
  const validNumbersProducts: number[] = [];

  const gearIndeces: number[][] = input.reduce((acc, line, lineInd) => {
    return [
      ...acc,
      ...line.split('').reduce((a, char, charind) => {
        return isGearSign.test(char) ? [...a, [lineInd, charind]] : a;
      }, [])
    ];
  }, []);
  // get number indeces
  input.forEach((line, lineIndex) => {
    let number = ''
    let localIndeces: number[][] = [];

    line.trim().split('').forEach((char, charIndex) => {
      if (!isNaN(Number(char))) {
        number = `${number}${char}`
        localIndeces.push([lineIndex, charIndex])
      }

      if (!input[lineIndex][charIndex + 1] || isNaN(Number(input[lineIndex][charIndex + 1]))) {
        numberIndeces.push(localIndeces)
        number = ''
        localIndeces = []
      }
    })
  })
  // calculate product of only valid gear values
  gearIndeces.forEach(gearInd => {
    const validValues = numberIndeces.filter(nInd => {
      return nInd.some(n => {
        return Math.abs(n[0] - gearInd[0]) < 2 && Math.abs(n[1] - gearInd[1]) < 2
      })
    });
    if (validValues.length === 2) {
      const product = validValues.reduce((acc, curr) => {
        const number = curr.map(digInd => input[digInd[0]][digInd[1]])
        return acc * Number(number.join(''));
      }, 1)
      validNumbersProducts.push(product);
    }
  })

  const tot = validNumbersProducts.reduce(sum, 0);
  console.log({tot});
}
