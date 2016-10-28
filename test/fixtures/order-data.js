var now = Date.now()

var buyOrders = [
  {id: 1, external_order_id: 5, type: "limit", buy_currency: 'USD', sell_currency: 'BTC', amount: 10, unit_price: 0.3, status: "open", created_at: now - 5000},
  {id: 5, external_order_id: 13, type: "limit", action: "buy", buy_currency: 'USD', sell_currency: 'BTC', amount: 5, unit_price: 0.2, status: "open", created_at: now - 1500}
]

var sellOrders = [
  {id: 2, external_order_id: 8, type: "limit", buy_currency: 'BTC', sell_currency: 'USD',  amount: 2, unit_price: 0.1, status: "open", created_at: now - 4000},
  {id: 3, external_order_id: 10, type: "limit", buy_currency: 'BTC', sell_currency: 'USD', amount: 3, unit_price: 0.1, status: "open", created_at: now - 3000},
  {id: 4, external_order_id: 12, type: "limit", buy_currency: 'BTC', sell_currency: 'USD', amount: 4, unit_price: 0.1, status: "open", created_at: now - 2000},
  {id: 6, external_order_id: 14, type: "limit", buy_currency: 'BTC', sell_currency: 'USD', amount: 5, unit_price: 0.2, status: "open", created_at: now - 1000}
]

var matchRes = [
  [
    {id: 1, order_id: 5, matched_amount: 200000000, result_amount: 200000000, fee: 0, unit_price: 0.3, status: "partiallyComplete" },
    {id: 2, order_id: 8, matched_amount: 200000000, result_amount: 60000000, fee: 0, unit_price: 0.3, status: "completed"}
  ],
  [
    {id: 1, order_id: 5, matched_amount: 300000000, result_amount: 300000000, fee: 0, unit_price: 0.3, status: "partiallyCompleted"},
    {id: 3, order_id: 10, matched_amount: 300000000, result_amount: 90000000, fee: 0, unit_price: 0.3, status: "completed"}
  ],
  [
    {id: 1, order_id: 5, matched_amount: 400000000, result_amount: 400000000, fee: 0, unit_price: 0.3, status: "partiallyCompleted"},
    {id: 4, order_id: 12, matched_amount: 400000000, result_amount: 120000000, fee: 0, unit_price: 0.3, status: "completed"}
  ],
  [
    {id: 1, order_id: 5, matched_amount: 100000000, result_amount: 100000000, fee: 0, unit_price: 0.3, status: "completed"},
    {id: 6, order_id: 14, matched_amount: 100000000, result_amount: 30000000, fee: 0, unit_price: 0.3, status: "partiallyCompleted"}
  ]
]

var matchRes2 = [
  [
    {id: 5, order_id: 13, matched_amount: 400000000, result_amount: 400000000, fee: 0, unit_price: 0.2, status: "partiallyCompleted"},
    {id: 6, order_id: 14, matched_amount: 400000000, result_amount: 80000000, fee: 0, unit_price: 0.2, status: "completed"}
  ]
]

module.exports = {
  buyOrders,
  sellOrders,
  matRes,
  matchRes2
}
