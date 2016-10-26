var _ = require('lodash')

module.exports = function() {
  var _bids = []
  var _asks = []

  var api = {
    add,
    cancel,
    match,
    book
  }

  return api

  function add(order) {
    ('ask' === order.type)
      ? _asks.push(order)
      : _bids.push(order)
  }

  function cancel(order) {
    ('ask' === order.type)
      ? remove(_asks, order)
      : remove(_bids, order)
  }

  function match(matchFn) {
    var matched = matchFn(_asks, _bids)
    cleanup(matched)
    return matched
  }

  function book() {
    return {
      asks: _asks.slice(),
      bids: _bids.slice()
    }
  }

  function cleanup(matched) {

  }

}
