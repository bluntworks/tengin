var test = require('tape')
var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

test('should create a buy/bid order', t => {
  t.plan(10)

  var bid = buy(1, 10, 0.333)

  t.ok(bid, 'bid order exists')
  t.equal(bid.order_id, 1, 'order_id === 1')
  t.equal(bid.side, 'bid', 'order side === bid')
  t.equal(bid.user_id, 1, 'user_id === 1')
  t.equal(bid.amount, 10, 'amount === 10')
  t.equal(bid.unit_price, 0.333, 'unit_price === 0.333')
  t.equal(bid.status, 'open', 'status === open')
  t.equal(bid.sell_currency, 'USD', 'sell currency === USD')
  t.equal(bid.buy_currency, 'BTC', 'buy currency === BTC')
  t.ok(Number.isInteger(bid.created_at), 'create_at is an integer')

  t.end()
})

test('should create a sell/ask order', t => {
  t.plan(10)

  var ask = sell(2, 1, 200)

  t.ok(ask, 'bid order exists')
  t.equal(ask.order_id, 2, 'order_id === 2')
  t.equal(ask.side, 'ask', 'order side === ask')
  t.equal(ask.user_id, 2, 'user_id === 1')
  t.equal(ask.amount, 1, 'amount === 1')
  t.equal(ask.unit_price, 200, 'unit_price === 200')
  t.equal(ask.status, 'open', 'status === open')
  t.equal(ask.sell_currency, 'BTC', 'sell currency === BTC')
  t.equal(ask.buy_currency, 'USD', 'buy currency === USD')
  t.ok(Number.isInteger(ask.created_at), 'create_at is an integer')

  t.end()
})

test('should accept parameters as object for a bid/buy order', t => {
  t.plan(10)

  var bid = buy({
    user_id: 1,
    amount: 10,
    unit_price: 0.333
  })

  t.ok(bid, 'bid order exists')
  t.equal(bid.order_id, 3, 'order_id === 3')
  t.equal(bid.side, 'bid', 'order side === bid')
  t.equal(bid.user_id, 1, 'user_id === 1')
  t.equal(bid.amount, 10, 'amount === 10')
  t.equal(bid.unit_price, 0.333, 'unit_price === 0.333')
  t.equal(bid.status, 'open', 'status === open')
  t.equal(bid.sell_currency, 'USD', 'sell currency === USD')
  t.equal(bid.buy_currency, 'BTC', 'buy currency === BTC')
  t.ok(Number.isInteger(bid.created_at), 'create_at is an integer')

  t.end()
})

test('should accept object params for a sell/ask order', t => {
  t.plan(10)

  var ask = sell({
    user_id: 2,
    amount: 1,
    unit_price: 200
  })

  t.ok(ask, 'bid order exists')
  t.equal(ask.order_id, 4, 'order_id === 4')
  t.equal(ask.side, 'ask', 'order side === ask')
  t.equal(ask.user_id, 2, 'user_id === 1')
  t.equal(ask.amount, 1, 'amount === 1')
  t.equal(ask.unit_price, 200, 'unit_price === 200')
  t.equal(ask.status, 'open', 'status === open')
  t.equal(ask.sell_currency, 'BTC', 'sell currency === BTC')
  t.equal(ask.buy_currency, 'USD', 'buy currency === USD')
  t.ok(Number.isInteger(ask.created_at), 'create_at is an integer')

  t.end()
})
