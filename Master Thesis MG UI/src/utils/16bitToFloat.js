export default function convert16bitIntToFloat(num) {
  var SPAN = 4000;
  var NR_SIZE = 65535;

  return (num * SPAN) / NR_SIZE - SPAN / 2;
}
