/* 
In this code, the parse12BitInts function takes an array of 2-byte values and returns an array of 12-bit integers.
The intToFloat function takes a 12-bit integer and converts it to a float value (with 8 bits for the integer part and 4 bits for the fractional part).
Finally, the code parses the data, converts it to an array of floats, and outputs the result to the console.
*/

export function parse12BitInts(data, startIdx, increment) {
  var ints = [];
  for (var i = startIdx; i < data.length; i += increment) {
    var hi = data[i] << 4; // shift high byte left by 4 bits
    var lo = data[i + 1]; // use low byte as-is
    var value = hi | lo; // combine high and low bytes
    ints.push(value);
  }
  // Parse the data and convert to floats
  var floats = ints.map(intToFloat);
  return floats;
}

// Converts a 12-bit integer to a float value
function intToFloat(value) {
  var integerPart = value >> 4; // get the integer part (8 bits)
  var fractionalPart = value & 0x0f; // get the fractional part (4 bits)
  return integerPart + fractionalPart / 16; // combine integer and fractional parts
}
