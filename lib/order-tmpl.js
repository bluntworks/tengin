var order_tmpl = module.exports = { }

order_tmpl.pluton = {
  order_id        : null,
  user_id         : null,
  type            : null,
  buy_currency    : 'pluton',
  sell_currency   : 'btc',
  amount          : null,
  matched_amount  : null,
  result_amount   : null,
  fee             : '0.0001',
  unit_price      : null,
  status          : 'open', //can be: open, partial, filled
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
  fee             : '0.0',
  unit_price      : null,
  status          : 'open', //can be: open, partial, filled
}
