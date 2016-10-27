var order_tmpl = require('../lib/order-tmpl')
var uid = require('../lib/uniq-id')()

var api = module.exports = {}

api.sell = (user_id, amount, price) => order('ask', user_id, amount, price)
api.buy = (user_id, amount, price) => order('bid', user_id, amount, price)

function order(side, user_id, amount, price) {
  var template = ('ask' === side)
    ? order_tmpl.pluton
    : order_tmpl.btc

  return Object.assign({}, template, {
    side,
    user_id,
    amount,

    order_id    : uid(),
    unit_price  : price,
    status      : 'open',
    created_at  : Date.now()
  })
}
