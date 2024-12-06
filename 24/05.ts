import { cleanInput } from "../utils"

// part 1 
{
  const rawPgOrder = `7|6
5|1
3|4
5|2
2|1
1|3`
  const rawUpdates = `7,3,4`
  const reducer = (agg: Record<number, number[]>, curr: number[]) => {
    agg[curr[0]] = agg[curr[0]] ? agg[curr[0]].concat([curr[1]]) : [curr[1]]
    agg[curr[1]] ??= []
    return agg
  }
  const pgOrders = cleanInput(rawPgOrder).map(pg => pg.split('|').map(Number))
  const updates = cleanInput(rawUpdates).map(update => update.split(",").map(Number))
  let sortedOrder = pgOrders.reduce(reducer, {})
  const validUpdates = updates.filter(update => {
    return update.every((pg, index) => {
      if (index === (update.length - 1)) {
        return update.slice().every(pgLink => {
          return sortedOrder[pg].indexOf(pgLink) === -1
        })
      }
      return update.slice(index+1).every(pgLink => {
        return !sortedOrder[pgLink].includes(pg)
      })
    })
  })
  const sum = validUpdates.reduce((agg, update) => {
    return agg + update[(update.length - 1) / 2]
  }, 0)
  console.log(sum)
}

// part 2
{
  const rawPgOrder = `7|6
5|1
3|4
5|2
6|5
2|1
1|3
9|1
2|9`
  const rawUpdates = `7,3,4
2,5,7
1,9,5`
  const reducer = (agg: Record<number, number[]>, curr: number[]) => {
    agg[curr[0]] = agg[curr[0]] ? agg[curr[0]].concat([curr[1]]) : [curr[1]]
    agg[curr[1]] ??= []
    return agg
  }
  const pgOrders = cleanInput(rawPgOrder).map(pg => pg.split('|').map(Number))
  const updates = cleanInput(rawUpdates).map(update => update.split(",").map(Number))
  let sortedOrder = pgOrders.reduce(reducer, {})

  const invalidUpdates = updates.filter(update => {
    return update.some((pg, index) => {
      if (index === (update.length - 1)) {
        return update.slice(0,-1).some(pgLink => {
          return sortedOrder[pg].indexOf(pgLink) > -1
        })
      }
      return update.slice(index+1).some(pgLink => {
        return sortedOrder[pgLink].includes(pg)
      })
    })
  })
  const validUpdates = invalidUpdates.map(update => {
    return update.sort((a, b) => {
      return sortedOrder[a].indexOf(b) > -1 ? -1 : (sortedOrder[b].indexOf(a) > -1 ? 1 : 0)
    })
  })

  const sum = validUpdates.reduce((agg, update) => {
    return agg + update[(update.length - 1) / 2]
  }, 0)

  console.log(sum)
}
