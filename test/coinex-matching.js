var test = require('tape')
var async = require('async')
var db = require('../lib/order-book-db-ram')()
var ob = require('../lib/order-book')(db)
var gen = require('../lib/order-gen')
var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

var matcher = require('../lib/match/coinex')

var bid_data = [
  { user_id: 1, amount: 1, unit_price: 670 },
  { user_id: 2, amount: 2, unit_price: 669 },
  { user_id: 3, amount: 3, unit_price: 668 },
]

var ask_data = [
  { user_id: 4, amount: 1, unit_price: 669 },
  { user_id: 5, amount: 2, unit_price: 670 },
  { user_id: 6, amount: 3, unit_price: 671 },
]

var bids = bid_data.map(x => buy(x))
var asks = ask_data.map(x => sell(x))

test('shoudl match orders correctly', t => {
  t.plan(2)

  addOrders([].concat(bids, asks), (err) => {
    t.notOk(err, 'err should be falsey')

    matcher(db, (err, matched) => {
      t.notOk(err, 'match err should be falsey')

    })


    t.end()
  })

})


function addOrders(orders, done) {
  var dbPut = (o, cb) =>  db.put(o, cb)

  async.map(orders, dbPut, done)
}
