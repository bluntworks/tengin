var test = require('tape')
var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

test('should create a buy/bid order', t => {
  t.plan(8)

  var bid = buy(1, 10, 0.333)

  t.ok(bid, 'bid order exists')
  t.equal(bid.side, 'bid', 'order side === bid')
  t.equal(bid.user_id, 1, 'user_id === 1')
  t.equal(bid.amount, 10, 'amount === 10')
  t.equal(bid.unit_price, 0.333, 'unit_price === 0.333')
  t.equal(bid.status, 'open', 'status === open')
  t.equal(bid.sell_currency, 'pluton', 'sell currency === pluton')
  t.equal(bid.buy_currency, 'btc', 'buy currency === btc')

  t.end()
})

test('should create a sell/ask order', t => {
  t.plan(8)

  var ask = sell(2, 1, 200)

  t.ok(ask, 'bid order exists')
  t.equal(ask.side, 'ask', 'order side === ask')
  t.equal(ask.user_id, 2, 'user_id === 1')
  t.equal(ask.amount, 1, 'amount === 1')
  t.equal(ask.unit_price, 200, 'unit_price === 200')
  t.equal(ask.status, 'open', 'status === open')
  t.equal(ask.sell_currency, 'btc', 'sell currency === btc')
  t.equal(ask.buy_currency, 'pluton', 'buy currency === pluton')


  t.end()
})
