import { cleanInput, sum } from "./utils";

// part 1
{
  const input = cleanInput(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);
  const cubes = {r: 12, b:14, g: 13};
  let counts = new Set();
  const games = input.map(game => {
    const tot = game.split(":")[1].split(';').map(set => {
      return set.trim().split(',').map(ball => {
        const ct = ball.trim().split(' ');
        return { [ct[1][0]]: Number(ct[0]) }
      })
    })
    return tot;
  }).forEach((game, i) => {
    let valid = true;
    game.forEach((res) => {
      res.forEach(hand => {
        if (cubes[Object.entries(hand)[0][0]] < Object.entries(hand)[0][1]) {
          valid = false
        }
      })
    })
    valid ? counts.add(i+1) : console.log(JSON.stringify(game))
  })
  console.log([...counts].reduce(sum, 0))
}
// part 2
{
  const input = cleanInput(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);
  const total = input.map(game => {
    const tot = game.split(":")[1].split(';').map(set => {
      return set.trim().split(',').map(ball => {
        const ct = ball.trim().split(' ');
        return { [ct[1][0]]: Number(ct[0]) }
      })
    })
    return tot;
  }).map((game) => {
    let minCount: Record<string, number> = {};
    game.forEach((res) => {
      res.forEach(hand => {
        const [[key, val]] = Object.entries(hand)
        minCount[key] = minCount[key] && minCount[key] > val ? minCount[key] : val
      })
    })
    return Object.values(minCount).reduce((acc, value) => acc * value, 1)
  }).reduce(sum, 0)
  console.log({total})
}
