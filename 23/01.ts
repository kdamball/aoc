import { cleanInput, sum } from "../utils";

// part 1
{
  const input = cleanInput(`1abc2
  pqr3stu8vwx
  a1b2c3d4e5f
  treb7uchet`);
  
  const numbers = input.map(e => e.split('').filter(el => !isNaN(Number(el))))
  
  const ans = numbers.map(e => Number(`${e[0]}${e.at(-1)}`)).reduce(sum, 0);
  console.log({ans})
}

// part 2
{
  const input = cleanInput(`two1nine
  eightwothree
  abcone2threexyz
  xtwone3four
  4nineeightseven2
  zoneight234
  7pqrstsixteens`);
  const numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const digits = numbers.map((_, i) => (i + 1).toString());
  const digitsMap = numbers.map((e, i) => ({[e]: i+1})).reduce((acc, curr) => ({...acc, ...curr}), {})
  
  const firstLast = input.map((inp) => {
    const existing = [...digits, ...numbers].filter(n => {
      return inp.indexOf(n) > -1;
    });
    const beginning = existing
                      .sort((a, b) => inp.indexOf(a) < inp.indexOf(b) ? -1 : 1)
                      .map(e => {
                        return isNaN(Number(e)) ? digitsMap[e] : e;
                      });
    const end = existing
                  .sort((a, b) => inp.lastIndexOf(a) < inp.lastIndexOf(b) ? -1 : 1)
                  .map(e => {
                    return isNaN(Number(e)) ? digitsMap[e] : e;
                  });

    return Number(`${beginning[0]}${end.at(-1)}`)
  }) 
  
  const ans = firstLast.reduce(sum, 0);
  console.log({ans})
}
