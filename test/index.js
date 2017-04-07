const tape = require('tape')
const run = require('../')

tape('generator function with callbacks', (t) => {
  run(function * () {
    t.plan(2)
    const data = yield (cb) => cb(null, 'data!')
    t.equals('data!', data, 'data received by thunk')
  }, t.error)()
})

tape('generator function with promises', (t) => {
  run(function * () {
    t.plan(2)
    const data = yield Promise.resolve('data!')
    t.equals('data!', data, 'data received by promise')
  }, t.error)()
})

tape('generator function with a mix', (t) => {
  run(function * () {
    t.plan(3)
    const promise = yield Promise.resolve('promise data!')
    t.equals('promise data!', promise, 'data received by promise')

    const callback = yield (cb) => cb(null, 'callback data!')
    t.equals('callback data!', callback, 'data received by thunk')
  }, t.error)()
})

tape('generator handling callback errors', (t) => {
  run(function * () {
    t.plan(1)
    yield (cb) => cb(new Error('fail!'))
    t.fail()
  }, (err) => t.ok(err, 'yes it failed'))()
})

tape('generator handling promise rejections', (t) => {
  run(function * () {
    t.plan(1)
    yield Promise.reject(new Error('fail!'))
    t.fail()
  }, (err) => t.ok(err, 'yes it failed'))()
})

const t = (fn) => (t) => run(fn, (err) => err ? t.fail() : t.pass())(t)

tape('test generator test :)', t(function * (t) {
  const promise = yield Promise.resolve('promise data!')
  t.equals('promise data!', promise, 'data received by promise')
  t.end()
}))
