var order_tmpl = require('../lib/order-tmpl')
var seqids = require('sequential-ids')

var Order = function(payload) {
  if(!(this instanceof Order)) return new Order(payload)

}

module.exports = Order
