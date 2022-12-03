const input = `A Y
B X
C Z`;

type moves = 'A' | 'B' | 'C';
type results = 'X' | 'Y' | 'Z';

enum MoveTranslation {
  X = 'A', // rock
  Y = 'B', // paper
  Z = 'C'
}

enum ChoiceValues {
  A = 1, // rock
  B = 2, // paper
  C = 3  // scissors
};

enum MatchScore {
  Z = 6,
  Y = 3,
  X = 0
};

enum WinningMove {
  A = 'B',
  B = 'C',
  C = 'A'
}

const cleanInput = (input: string) => input.split('\n').map(match => match.split(' '));

const getPlayScore = (elf: moves, result: results) =>  {
  const options = Object.entries(WinningMove);
  switch (result) {
    case 'Z':
      return ChoiceValues[WinningMove[elf]];
    case 'Y':
      return ChoiceValues[elf];
    case 'X':
      return ChoiceValues[options.find(([_, winner]) => elf === winner )[0]]
  }
};

export const totalScore = cleanInput(input).map(round => {
  const matchScore = getPlayScore.apply(null, round);
  return matchScore + MatchScore[round[1]];
}).reduce((a, b) => a + b, 0);

console.log({totalScore});



