var test = require('tape')
var mfsort = require('../lib/multi-field-sort')
var buy = require('../lib/order').buy
var sell = require('../lib/order').sell

var bid_data = [
  [ 4,  19, 0.91  ],
  [ 1,  10, 0.1   ],
  [ 2,  12, 0.01  ],
  [ 3,  9,  0.2   ],
  [ 4,  23, 0.91  ],
  [ 20, 8,  0.44  ],
  [ 2,  3,  0.33  ],
  [ 6,  3,  0.124 ],
  [ 4,  29, 0.91  ],
]

test('should sort on multiple fields', t => {
  var bids = bid_data.map(x => buy.apply(null, x))
  var sorted = mfsort(bids, ['unit_price', '-order_id' ])
  var exp_unit_price = [ 0.01, 0.1, 0.124,  0.2, 0.33, 0.44, 0.91,  0.91,  0.91 ]
  var exp_amount = [ 12, 10, 3, 9, 3, 8, 29, 23, 19 ]

  t.plan(18)

  sorted.forEach((it, i) => {
    t.equal(it.unit_price, exp_unit_price[i], 'unit_price matches')
    t.equal(it.amount, exp_amount[i], 'amount should match')
  })

  t.end()
})
