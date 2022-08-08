export function formatNumber(number, decimals) {
  var base = 10 ^ decimals;
  return Math.round((number * base) / base).toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    useGrouping: true,
  });
}
