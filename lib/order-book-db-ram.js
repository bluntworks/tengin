module.exports = function() {
  var store = []

  var api = {
    put,
    get,
    del
  }

  return api

  function put(it, done) {
    var indx = store.indexOf(it)
    if(-1 === indx) store.push(it)
    else store.slice(indx, 1, it)
    done(null)
  }

  function get(qryFn, done) {
    var res = store.filter(qryFn);
    (res.length)
      ? done(null, res)
      : done({ ok: false, msg: 'not found'})
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


}
