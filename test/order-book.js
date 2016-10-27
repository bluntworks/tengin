var test = require('tape')

var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

var db = require('../lib/order-book-db-ram')()
var ob = require('../lib/order-book')(db)

test('should add order and retrieve book', t => {
  t.plan(4)

  var ask = sell(1, 10, 0.333)
  var bid = buy(2, 20, 0.444)

  ob.add(ask)
  ob.add(bid)

  ob.book((err, book) => {

    t.notOk(err, 'err should be falsey')
    t.ok(book, 'book should be truthy')
    t.equal(book.asks.length, 1, 'should be 1 ask')
    t.equal(book.bids.length, 1, 'should be 1 bid')

    t.end()
  })


})
