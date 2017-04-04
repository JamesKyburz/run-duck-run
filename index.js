module.exports = runGenerator

function runGenerator (fn, error) {
  return function () {
    const it = fn(...arguments)
    next(it.next())
    function next (result) {
      if (result.done) return
      if (result.value && typeof result.value.then === 'function') {
        result.value
          .then((value) => next(it.next(value)))
          .catch(error)
        return
      }
      if (typeof result.value === 'function') {
        result.value((err, value) => {
          if (err) return error(err)
          next(it.next(value))
        })
      } else {
        next(it.next(result.value))
      }
    }
  }
}
