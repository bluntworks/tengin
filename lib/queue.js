module.exports = function() {
  var _queue = []

  var api = {
    push,
    pop
  }

  return api

  function push(action) {
    _queue.push(action)
  }

  function pop() {
    return _queue.pop()
  }

}
