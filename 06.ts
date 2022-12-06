const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;

const findStartMarker = (inp: string) => {
  const uniqueIdentifierLength = 14;
  for (let i = uniqueIdentifierLength; i <= inp.length; i++) {

    if(new Set(inp.substring(i-uniqueIdentifierLength, i).split('')).size === uniqueIdentifierLength) {
      return i;
    }
  }
}

export const startMarker = findStartMarker(input);

console.log(startMarker)