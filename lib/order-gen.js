var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

var randomRange = (min, max) => Math.random() * (max - min) + min

var randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

var def_opts = {
  min_spread: 0.5,
  max_spread: 2.5,
  user_count: 100,
  min_bid: 600,
  max_bid: 687,
  min_ask: 687,
  max_ask: 700,
  count: 100,
  min_amount: 0.5,
  max_amount: 50,
}

module.exports = function(opts) {
  opts = Object.assign({}, def_opts, opts || {})

  return [].concat(gen(buy), gen(sell))

  function gen(genFn) {
    var arr = []
    for(var i = 0; i < opts.count; i++) {
      arr.push(genFn(
        randomInt(0, opts.user_count),
        randomRange(opts.min_amount, opts.max_amount),
        randomRange(opts.min_bid, opts.max_ask)
      ))
    }
    return arr
  }
}
