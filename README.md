# short-circuit-loader

Short circuit specified side-effect-only modules for webpack.

This is mainly used to disable browser-side polyfills like [`classlist-polyfill`](https://www.npmjs.com/package/classlist-polyfill) on the server side.

## Installation

```bash
npm i --save-dev short-circuit-loader
```

## Configuration

```js
{
  test: /\.js$/,
  include: [
    path.resolve(__dirname, 'node_modules', 'classlist-polyfill')
  ],
  loader: 'short-circuit-loader'
}
```

## Options

* `expr`

  A JavaScript expression that skips current module when evaluate to truthy value.

  eg. `process.env.VUE_ENV === 'server'` makes the final output like this:

  ```js
  (function () {
    if (process.env.VUE_ENV === 'server') { return }
    // original module
  }())
  ```

  Default value: `typeof window === 'undefined'`.
