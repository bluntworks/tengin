var async = require('async')

module.exports = function(db, done) {

  getBids((err, bids) => {
    async.mapSeries(bids, matchBidToAsks, (err, matched) => {
      if(err) done(err)
      else done(null, res)
    })
  })

  function getBids(cb) {
    var qfn = x => x.side === 'bid' && x.status !== 'filled'
    var fields = [ '-unit_price', 'created_at' ]

    db.find(qfn, fields, (err, bids) => {
      if(err) cb(err)
      else cb(null, bids)
    })
  }

  function matchBidToAsks(bid, cb) {
    getAsks(bid, (err, asks) => {
      if(err) cb(err)
      else {
        var matched = matchOrder(bid, asks)
        cb(null, matched)
      }
    })
  }

  function getAsks(bid, cb) {
    var qfn = x =>
      x.side === 'ask' &&
      x.status !== 'filled' &&
      x.unit_price <= bid.unit_price

    var fields = [ 'unit_price', 'created_at' ]

    db.find(qfn, fields, (err, asks) => {
      if(err) cb(err)
      else cb(null, asks)
    })
  }

  function matchOrders(bid, asks) {
    var matched = []
    var len = = asks.length
    var indx = 0

    while(bid.amount > 0 && indx < len) {
      var match = matchBidAsk(bid, asks[indx])
      matched.push(match)
      indx++
    }

    return matched
  }

  function matchBidAsk(bid, ask) {
    var amount_to_match = (ask.amount > bid.amount)
      ? bid.amount : ask.amount
    var unit_price = (ask.order_id <  bid.order_id)
      ? ask.unit_price : bid.unit_price
    var active_id = (ask.order_id > bid.order_id)
      ? ask.order_id : bid.order_id

    return [
      matchAmount(bid, amount_to_match, unit_price, active_id),
      matchAmount(ask, amount_to_match, unit_price, active_id)
    ]
  }

  function matchAmount(order, amount, unit_price, active_id) {
    var res_amount = calcResultAmount(order, amount, unit_price)
    var fee = calcFee(res_amount)
    res_amount = res_amount - fee
    order.result_amount += res_amount
    order.fee += fee
  }



}
