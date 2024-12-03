// part 1
{
  const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5)mul(1111,333))`
  const matcher = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
  const instructinos = input.match(matcher).map(inst => inst.replace(/mul\((.+)\)/, '$1').split(',').map(Number))
  const total = instructinos.reduce((agg, curr) => {
    return agg + (curr[0] * curr[1])
  }, 0)
  console.log(total)
}

// part 2
{
  const input = `don't();,'what();how()when(586,165)'who():mul(368,791)!when()when()(};mul(80,516)who(657,999)how())@'mul/>>@++;when()what(278,714)mul(50,770)
when()@select()where() ([mul(747,2)~ do()]xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`
  const matcher = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g
  // fuckin linebreaks
  const dontMatcher = /don't\(\).+?(do\(\)|$)/gs
  const filteredDo = input.replace(dontMatcher, '')
  const instructinos = filteredDo.match(matcher).map(inst => inst.replace(/mul\((.+)\)/, '$1').split(',').map(Number))
  const total = instructinos.reduce((agg, curr) => {
    return agg + (curr[0] * curr[1])
  }, 0)
  console.log(total)
}