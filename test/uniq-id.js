var test = require('tape')
var uid = require('../lib/uniq-id')()

test('should produce uniq incremental id', t => {
  var c = 1
  t.plan(10)

  while(c <= 10) {
    var id = uid()
    t.equal(id, c, 'next id created')
    c++
  }

  t.end()
})


