var order_tmpl = module.exports = {
  order_id        : null, //generated via npm/sequential-ids
  type            : null, //market / limit
  buy_currency    : null, //plutons/btc/GBP/USD/EUR
  sell_currency   : null, //plutons/btc/GBP/USD/EUR
  amount          : null, //UNSIGNED BIGINT
  matched_amount  : null, //UNSIGNED BIGINT
  result_amount   : null, 
  fee             : null,
  unit_price      : null,
  status          : null, //open, partial-fill, filled
}


