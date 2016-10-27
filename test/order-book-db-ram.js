var test = require('tape')
var db = require('../lib/order-book-db-ram')()

test('should put data', t => {
  t.plan(6)

  db.put({ a: 1, b: 2 }, (err) => {
    t.notOk(err, 'error should be falsey')

    db.get(x => x.a === 1, (err, res) => {

      t.notOk(err, 'err is falsey')
      t.ok(res, 'res is truthy')
      t.equal(res.length, 1, 'res should have a length of 1')
      t.equal(res[0].a, 1, 'res[0].a === 1')
      t.equal(res[0].b, 2, 'res[0].b === 2')

      t.end()
    })
  })

})

test('should delete data', t => {
  t.plan(5)

  db.del(x => x.a === 1, (err, res) => {
    t.notOk(err, 'err should be falsey')
    t.ok(res, 'result should be truthy')
    t.equal(res[0].a, 1, 'a === 1')
    t.equal(res[0].b, 2, 'a === 2')
    t.equal(res.length, 1, 'res.length === 1')
    t.end()
  })

})

test('db should be empty', t => {
  t.plan(2)

  db.get(x => x, (err, res) => {
    t.ok(err, 'err should be truthy')
    t.notOk(res, 'res should be falsey')
  })

  t.end()
})
