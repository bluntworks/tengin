var OT = module.exports = {}

OT.FEE_PERCENT = 1

OT.order_status = {
  OPEN    : 'open',
  PARTIAL   : 'partial',
  COMPLETE  : 'complete'
}

OT.order_types = {
  ADD_ORDER         : 'add_order',
  ORDER_ADDED       : 'order_added',
  CANCEL_ORDER      : 'cancel_order',
  ORDER_CANCELLED   : 'order_cancelled',
  MATCH_ORDER       : 'match_order'
}
