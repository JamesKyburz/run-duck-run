const { test } = require('tap')
const run = require('../')

test('generator function with callbacks', t => {
  run(function * () {
    t.plan(2)
    const data = yield cb => cb(null, 'data!')
    t.equals('data!', data, 'data received by thunk')
  }, t.error)()
})

test('generator function with promises', t => {
  run(function * () {
    t.plan(2)
    const data = yield Promise.resolve('data!')
    t.equals('data!', data, 'data received by promise')
  }, t.error)()
})

test('generator function with a mix', t => {
  run(function * () {
    t.plan(3)
    const promise = yield Promise.resolve('promise data!')
    t.equals('promise data!', promise, 'data received by promise')

    const callback = yield cb => cb(null, 'callback data!')
    t.equals('callback data!', callback, 'data received by thunk')
  }, t.error)()
})

test('generator handling callback errors', t => {
  run(
    function * () {
      t.plan(1)
      yield cb => cb(new Error('fail!'))
      t.fail()
    },
    err => t.ok(err, 'yes it failed')
  )()
})

test('yield single value', t => {
  run(function * () {
    t.plan(2)
    const data = yield 'data'
    t.equals(data, 'data')
  }, t.error)()
})

test('generator handling promise rejections', t => {
  run(
    function * () {
      t.plan(1)
      yield Promise.reject(new Error('fail!'))
      t.fail()
    },
    err => t.ok(err, 'yes it failed')
  )()
})

test('generator with try catch + promise rejection', t => {
  run(
    function * () {
      t.plan(3)
      try {
        yield Promise.reject(new Error('fail!'))
        t.fail()
      } catch (err) {
        t.ok('function carried on executing')
      }
      t.ok('still executing')
    },
    err => t.error(err, 'error was handled')
  )()
})

test('generator with try catch + callback error', t => {
  run(
    function * () {
      t.plan(3)
      try {
        yield cb => cb(new Error('fail!'))
        t.fail()
      } catch (err) {
        t.ok('function carried on executing')
      }
      t.ok('still executing')
    },
    err => t.error(err, 'error was handled')
  )()
})

test('synchronous error handling', t => {
  run(function * () {
    throw new Error('error')
  }, t.end)()
})

const t = fn => t => run(fn, err => (err ? t.fail() : t.pass()))(t)

test(
  'test generator test :)',
  t(function * (t) {
    t.plan(2)
    const promise = yield Promise.resolve('promise data!')
    t.equals('promise data!', promise, 'data received by promise')
  })
)
