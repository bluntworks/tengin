var mfsort = require('../lib/multi-field-sort')

module.exports = function() {
  var store = []

  var api = {
    put,
    get,
    del,
    find,
    reset
  }

  return api

  function put(it, done) {
    var indx = store.indexOf(it)
    if(-1 === indx) store.push(it)
    else store.splice(indx, 1, it)
    done(null)
  }

  function get(qryFn, done) {
    var res = store.slice().filter(qryFn);
    (res.length)
      ? done(null, res)
      : done(null, false)
  }

  function del(qryFn, done) {
    var found = store.filter(qryFn)
    var res = []

    found.forEach(it => {
      var indx = store.indexOf(it)
      res = res.concat(store.splice(indx, 1))
    });

    (res.length)
      ? done(null, res)
      : done({ ok: false, msg: 'nothing to delete' })
  }

  function find(getQry, fields, done) {
    get(getQry, (err, res) => {
      if(err) done(err)
      else if(res) {
        done(null, mfsort(res.slice(), fields))
      } else {
        done(null, false)
      }
    })
  }

  function reset() {
    store = []
  }

}
