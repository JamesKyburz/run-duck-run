const tape = require('tape')
const run = require('../')

tape('generator function with callbacks', (t) => {
  run(function * () {
    const data = yield (cb) => cb(null, 'data!')
    t.equals('data!', data, 'data received by thunk')
    t.end()
  }, t.fail)()
})

tape('generator function with promises', (t) => {
  run(function * () {
    const data = yield Promise.resolve('data!')
    t.equals('data!', data, 'data received by promise')
    t.end()
  }, t.fail)()
})

tape('generator function with a mix', (t) => {
  run(function * () {
    const promise = yield Promise.resolve('promise data!')
    t.equals('promise data!', promise, 'data received by promise')

    const callback = yield (cb) => cb(null, 'callback data!')
    t.equals('callback data!', callback, 'data received by thunk')
    t.end()
  }, t.fail)()
})

tape('generator handling callback errors', (t) => {
  run(function * () {
    t.plan(1)
    yield (cb) => cb(new Error('fail!'))
    t.fail()
  }, t.pass)()
})

tape('generator handling promise rejections', (t) => {
  run(function * () {
    t.plan(1)
    yield Promise.reject(new Error('fail!'))
    t.fail()
  }, t.pass)()
})
