var colors = require('colors')
var async = require('async')
var OT = require('../../lib/constants').order_types
var OS = require('../../lib/constants').order_status
var FEE_PERCENT = require('../../lib/constants').FEE_PERCENT

var clone = o => Object.assign({}, o)
var unzip = a => Array.prototype.concat.apply([], a)

module.exports = function(db, done) {

  getBids((err, bids) => {
    async.mapSeries(bids, matchBidToAsks, (err, matched) => {
      if(err) done(err)
      else done(null, unzip(matched))
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
      x.status !== OS.COMPLETE &&
      x.unit_price <= bid.unit_price

    var fields = [ 'unit_price', 'created_at' ]

    db.find(qfn, fields, (err, asks) => {
      if(err) cb(err)
      else cb(null, asks)
    })
  }

  function matchOrder(bid, asks) {
    var matched = []
    var processed = []
    var len = asks.length
    var indx = 0

    while(bid.amount > 0 && indx < len) {
      var match = matchBidAsk(bid, asks[indx])
      matched.push(match)
      indx++
    }

    return  matched.filter(x => x)
  }

  function matchBidAsk(bid, ask) {
    var amount = (ask.amount > bid.amount)
      ? bid.amount : ask.amount

    var price = (ask.order_id < bid.order_id)
      ? ask.unit_price : bid.unit_price

    var active_id = (ask.order_id > bid.order_id)
      ? ask.order_id : bid.order_id

    if('complete' === bid.status || 'complete' === ask.status) {
      return false
    }

    return [
      matchAmount(bid, amount, price, active_id),
      matchAmount(ask, amount, price, active_id),
    ]
  }

  function matchAmount(order, amount, price, active_id) {
    var isActive = order.order_id === active_id
    var result_amount = calcResultAmount(order, amount, price)
    var fee = calcFee(result_amount)
    result_amount = result_amount - fee

    addMatchedAmount(order, amount)
    addResultAmount(order, result_amount)
    addFee(order, fee)
    adjustStatus(order)

    return {
      type          : OT.MATCH_ORDER,
      id            : order.order_id,
      match_amount  : amount,
      result_amount : result_amount,
      fee           : fee,
      unit_price    : price,
      status        : order.status,
      time          : Date.now(),
      active        : isActive,
      side          : order.side
    }
  }

  function calcResultAmount(order, amount, price) {
    if('bid' === order.side) return amount
    else return amount * price
  }

  function calcFee(amount) {
    return amount / 100 * FEE_PERCENT
  }

  function addMatchedAmount(order, amount) {
    order.matched_amount = order.matched_amount + amount
  }

  function addResultAmount(order, amount) {
    order.result_amount = order.result_amount + amount
  }

  function addFee(order, fee) {
    return order.fee += fee
  }

  function adjustStatus(order) {
    var left = order.amount - order.matched_amount
    if(left === 0) {
      order.status = OS.COMPLETE
    } else if(order.matched_amount > 0 && order.matched_amount < order.amount) {
      order.status = OS.PARTIAL
    } else if(order.matched_amount === 0) {
      order.status = OS.OPEN
    }
  }

}
