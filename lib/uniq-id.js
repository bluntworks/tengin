module.exports = function(start) {
  start = start || 1
  return () => start++
}
