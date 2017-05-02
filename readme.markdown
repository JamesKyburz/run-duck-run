# 🦆 run-duck-run 🦆

A generator function runner

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![build status](https://api.travis-ci.org/JamesKyburz/run-duck-run.svg)](https://travis-ci.org/JamesKyburz/run-duck-run)
[![npm](https://img.shields.io/npm/v/run-duck-run.svg)](https://npmjs.org/package/run-duck-run)
[![downloads](https://img.shields.io/npm/dm/run-duck-run.svg)](https://npmjs.org/package/run-duck-run)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/run-duck-run.svg)](https://greenkeeper.io/)

# usage

```javascript
  function * foo () {
    yield (cb) => setTimeout(cb, 1000)
    console.log('done cb')
  }

  const run = require('run-duck-run')

  run(foo, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log('all good')
    }
  })()

  // done cb
```

```javascript
  function * foo () {
    yield new Promise((resolve, reject) => {
      setTimeout(resolve, 1000)
    })
    console.log('done promise')
  }

  const run = require('run-duck-run')

  run(foo, (err) => { })()

  // done promise
```

`yield supports thunks and promises.`

# Why?

If you find a pattern where error handling can all be done in one place....

When writing http routes, error handling is often performed in multiple places....

Check out [server-base](https://npm.im/server-base) for an example of using this module.

# license

MIT
