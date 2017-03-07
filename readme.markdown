# 🦆 run-duck-run 🦆

A generator function runner

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# usage

```javascript
  function * foo () {
    yield (cb) => setTimeout(cb, 1000)
    console.log('done cb')
  }

  const run = require('run-duck-run')

  run(foo, (err) => { console.error(err) })()

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

  run(foo, (err) => { console.error(err) })()

  // done promise
```

`yield supports thunks and promises.`

# Why?

If you find a pattern where error handling can all be done in one place....

When writing http routes, error handling is often performed in multiple places....

Check out [server-base](https://npm.im/server-base) for an example of using this module.

# license

MIT
