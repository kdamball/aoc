import { cleanInput } from "./utils";

// part 1
{
const input = cleanInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)
  .map(e => e.replace(/^Card\s+\d+:\s+/, ''))
  .map(e => e.split('|'));
  
  const score = input.reduce((acc, card) => {
    const winning = card[0].trim().split(/\s+/).map(el => Number(el.trim()));
    const yours = card[1].trim().split(/\s+/).map(el => Number(el.trim()));
    let cardScore = 0;
    yours.forEach(num => {
      winning.includes(num) ? (cardScore > 0 ? cardScore *= 2 : cardScore +=1) : undefined
    });
    return acc + cardScore
  }, 0);
  console.log({score})
}


// part 2
{
  const input = cleanInput(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)
    .map(e => e.replace(/^Card\s+\d+:\s+/, ''))
    .map(e => e.split('|'));

    /*
      get curr card wins
      go to original array and get # of wins from that
        - go thru each of the wins
        - go to original deck and grab # of wins
    */ 
    const cardWins = input.map((card, ind) => {
      const winning = card[0].trim().split(/\s+/).map(el => Number(el.trim()));
      const yours = card[1].trim().split(/\s+/).map(el => Number(el.trim()));
      let cardScore = 0;
      yours.forEach(num => {
        winning.includes(num) ? cardScore +=1 : undefined
      });
      return {[ind]: cardScore}
    });

    let total = 0

    // we can do some tail call caching here to optimize ;p
    const recursiveCountCards = (arr: {[x: number]: number; }[]) => {
      return arr.forEach(el => {
        const elindex = Number(Object.keys(el)[0]) + 1
        const wonCards = cardWins.slice(elindex, elindex + Object.values(el)[0])
        total += 1
        return recursiveCountCards(wonCards)
      })
    }

    recursiveCountCards(cardWins)

    console.log({total});
  }
