module.exports = runGenerator

function runGenerator (fn, done) {
  return function () {
    const it = fn(...arguments)
    try {
      next(it.next())
    } catch (err) {
      done(err)
    }
    function next (result) {
      if (result.done) return done(null)
      if (result.value && typeof result.value.then === 'function') {
        return result.value
          .then(value => next(it.next(value)))
          .catch(handleError)
      }
      if (typeof result.value === 'function') {
        result.value((err, value) => {
          if (err) return handleError(err)
          next(it.next(value))
        })
      } else {
        next(it.next(result.value))
      }
    }
    function handleError (err) {
      try {
        it.throw(err)
        next(it.next())
      } catch (_) {
        done(err)
      }
    }
  }
}
