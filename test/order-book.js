var test = require('tape')

var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

var db = require('../lib/order-book-db-ram')()
var ob = require('../lib/order-book')(db)

test('should add order', t => {
  t.plan(1)

  var ask = sell(1, 10, 0.333)
  var bid = buy(2, 20, 0.444)

  ob.add(ask)
  ob.add(bid)

  ob.book((err, book) => {

    console.log(err, book)


  })


})
