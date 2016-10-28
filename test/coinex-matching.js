var test = require('tape')
var db = require('../lib/order-book-db-ram')()
var ob = require('../lib/order-book')(db)
var gen = require('../lib/order-gen')


test('mok order generator should create correct amount of orders', t => {
  t.plan(1)

  var res = gen({
    count: 3
  })

  t.equal(res.length, 6, 'res length is 6')

  t.end()
})
