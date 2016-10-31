var test = require('tape')
var async = require('async')
var db = require('../lib/order-book-db-ram')()
var ob = require('../lib/order-book')(db)
var gen = require('../lib/order-gen')
var buy = require('../lib/order').buy
var sell = require('../lib/order').sell
var OT = require('../lib/constants').order_types
var OS = require('../lib/constants').order_status

var matcher = require('../lib/match/coinex')

test('1st bid should be matched 3 times', t => {
  var bid_data = [
    { user_id: 1, amount: 3, unit_price: 670 },
    { user_id: 2, amount: 1, unit_price: 670 },
    { user_id: 3, amount: 1, unit_price: 670 },
  ]

  var ask_data = [
    { user_id: 4, amount: 1, unit_price: 670 },
    { user_id: 5, amount: 1, unit_price: 670 },
    { user_id: 6, amount: 1, unit_price: 670 },
  ]

  var bids = bid_data.map(x => buy(x))
  var asks = ask_data.map(x => sell(x))

  t.plan(14)

  db.reset()
  addOrders([].concat(bids, asks), (err) => {
    t.notOk(err, 'err should be falsey')

    matcher(db, (err, matched) => {
      t.notOk(err, 'match err should be falsey')
      var ba0 = matched[0]
      var ba1 = matched[1]
      var ba2 = matched[2]

      t.equal(ba0[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba0[0].id, 1, 'bid id should be 1')

      t.equal(ba0[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba0[1].id, 4, 'ask id should be 1')

      t.equal(ba1[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba1[0].id, 1, 'bid id should be 1')

      t.equal(ba1[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba1[1].id, 5, 'ask id should be 5')

      t.equal(ba2[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba2[0].id, 1, 'bid id should be 1')

      t.equal(ba2[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba2[1].id, 6, 'ask id should be 5')

      t.end()
    })
  })
})

test('3 bids should be matched times', t => {
  var bid_data = [
    { user_id: 1, amount: 1, unit_price: 670 },
    { user_id: 2, amount: 1, unit_price: 670 },
    { user_id: 3, amount: 1, unit_price: 670 },
  ]

  var ask_data = [
    { user_id: 4, amount: 1, unit_price: 670 },
    { user_id: 5, amount: 1, unit_price: 670 },
    { user_id: 6, amount: 1, unit_price: 670 },
  ]

  var bids = bid_data.map(x => buy(x))
  var asks = ask_data.map(x => sell(x))

  t.plan(14)

  db.reset()
  addOrders([].concat(bids, asks), (err) => {
    t.notOk(err, 'err should be falsey')

    matcher(db, (err, matched) => {
      t.notOk(err, 'match err should be falsey')
      var ba0 = matched[0]
      var ba1 = matched[1]
      var ba2 = matched[2]

      t.equal(ba0[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba0[0].id, 7, 'bid id should be 7')

      t.equal(ba0[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba0[1].id, 10, 'ask id should be 10')

      t.equal(ba1[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba1[0].id, 8, 'bid id should be 8')

      t.equal(ba1[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba1[1].id, 11, 'ask id should be 11')

      t.equal(ba2[0].type, OT.MATCH_ORDER, 'bid order type should be match_order')
      t.equal(ba2[0].id, 9, 'bid id should be 9')

      t.equal(ba2[1].type, OT.MATCH_ORDER, 'ask order type should be match_order')
      t.equal(ba2[1].id, 12, 'ask id should be 12')

      t.end()
    })
  })
})


test('fees', t => {
  var bid_data = [
    { user_id: 1, amount: 1, unit_price: 600 },
  ]

  var ask_data = [
    { user_id: 4, amount: 1, unit_price: 600 },
  ]

  var bids = bid_data.map(x => buy(x))
  var asks = ask_data.map(x => sell(x))

  t.plan(4)

  db.reset()
  addOrders([].concat(bids, asks), (err) => {
    t.notOk(err, 'err should be falsey')

    matcher(db, (err, matched) => {
      var ba = matched[0]
      t.notOk(err, 'match err should be falsey')
      t.equal(ba[0].fee, 0.01, 'bids side fee should be 0.01')
      t.equal(ba[1].fee, 6, 'ask side fee should be 6')


      t.end()
    })
  })
})

test('result amount', t => {
  var bid_data = [
    { user_id: 1, amount: 1, unit_price: 600 },
  ]

  var ask_data = [
    { user_id: 4, amount: 1, unit_price: 600 },
  ]

  var bids = bid_data.map(x => buy(x))
  var asks = ask_data.map(x => sell(x))

  t.plan(4)

  db.reset()
  addOrders([].concat(bids, asks), (err) => {
    t.notOk(err, 'err should be falsey')

    matcher(db, (err, matched) => {
      var ba = matched[0]
      t.notOk(err, 'match err should be falsey')
      t.equal(ba[0].result_amount, 0.99, 'bid result_amount should  === 0.01')
      t.equal(ba[1].result_amount, 594, 'ask result_amount should === 594')

      t.end()
    })
  })
})

function addOrders(orders, done) {
  var dbPut = (o, cb) =>  db.put(o, cb)

  async.map(orders, dbPut, done)
}
