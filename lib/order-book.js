var async = require('async')
var noop = function() {}

module.exports = function(db) {

  var api = {
    add,
    cancel,
    match,
    book
  }

  return api

  function add(order, done) {
    done = done || noop
    db.put(order, done)
  }

  function cancel(order, done) {
    var byId = x => x.order_id === order.order_id
    done = done || noop
    db.del(byId, done)
  }

  function match(matchFn, done) {
    matchFn(db, (err, matched) => {
      if(err) done(err)
      else done(null, matched)
    })
  }

  function book(done) {
    var asks = cb => db.get(x => x.side === 'ask', cb)
    var bids = cb => db.get(x => x.side === 'bid', cb)
    async.parallel({ asks, bids }, done)
  }

}
