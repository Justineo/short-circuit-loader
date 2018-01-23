import test from 'ava'
import webpack from 'webpack'
import path from 'path'

let guid = 0

function resolve (...args) {
  return path.resolve(__dirname, ...args)
}

function getConfig (options) {
  let id = guid++
  return {
    entry: resolve('./source.js'),
    output: {
      path: resolve('dist'),
      filename: `bundle-${id}.js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: './lib/index',
          enforce: 'pre',
          options: options || {}
        },
        {
          test: /\.js$/,
          loader: 'raw-loader'
        }
      ]
    }
  }
}

function testOptions (options, leading) {
  test.cb(t => {
    const compiler = webpack(getConfig(options))

    compiler.run((err, stats) => {
      if (err) {
        console.error(err)
        return
      }

      let src = getSource(stats)
      if (!src) {
        t.is(typeof src, 'string')
        t.end()
        return
      }
      t.true(src.indexOf(leading) === 0)
      t.end()
    })
  })
}

function getSource (stats) {
  let s = stats.toJson()
  let module = s.modules[0]
  let source = null
  if (module && module.source) {
    let json = module.source.replace('module.exports =', '')
    try {
      source = JSON.parse(json)
    } catch (e) {
      console.error(e)
    }
  }

  return source
}

;[
  [null, "if (typeof window !== 'undefined')"],
  [
    { expr: "typeof document !== 'undefined'" },
    "if (typeof document !== 'undefined')"
  ]
].forEach(args => {
  testOptions(...args)
})
