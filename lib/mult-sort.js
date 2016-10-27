module.exports = function(arr, fields) {
  return arr.sort(fsort(filter))
}

var fsort = fields => (a, b) => fields.map(fld => {
  var dir = 1

  if(fld[0] === '-') {
    dir = -1
    fld = fld.substr(1)
  }

  if(a[fld] > b[fld]) return dir
  if(a[fld] < b[fld]) return -(dir)
  return 0

})
.reduce((a, n) => a ? a : n, 0)
