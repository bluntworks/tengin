var order_tmpl = module.exports = { }

order_tmpl.pluton = {
  order_id        : null,
  user_id         : null,
  type            : null,
  buy_currency    : 'pluton',
  sell_currency   : 'btc',
  amount          : 0,
  matched_amount  : 0,
  result_amount   : 0,
  fee             : 0.0001,
  unit_price      : null,
  status          : 'open', //can be: open, partial, filled
  created_at      : null
}

order_tmpl.btc = {
  order_id        : null,
  user_id         : null,
  type            : null,
  buy_currency    : 'btc',
  sell_currency   : 'pluton',
  amount          : null,
  matched_amount  : null,
  result_amount   : null,
  fee             : 0.0001,
  unit_price      : null,
  status          : 'open', //can be: open, partial, filled
  created_at      : null
}
