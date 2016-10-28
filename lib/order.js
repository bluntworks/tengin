var order_tmpl = require('../lib/order-tmpl')
var uid = require('../lib/uniq-id')()

var api = module.exports = {}

api.sell = (user_id, amount, price) => order('ask', user_id, amount, price)
api.buy = (user_id, amount, price) => order('bid', user_id, amount, price)

function order(side, user_id, amount, unit_price) {
  var template = ('ask' === side)
    ? order_tmpl.usd
    : order_tmpl.btc

  var order_obj = ('number' === typeof user_id)
    ? { user_id, amount, unit_price }
    : user_id

  order_obj.side = side

  return Object.assign({}, template, order_obj, {
    order_id    : uid(),
    status      : 'open',
    created_at  : Date.now()
  })
}
