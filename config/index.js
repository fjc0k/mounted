const cssNames = new Map()

const config = {
  projectName: 'mounted',
  date: '2019-1-28',
  designWidth: 375,
  deviceRatio: {
    375: 1 / 2,
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env',
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread',
      ],
    },
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    },
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8',
            ],
          },
        },
        pxtransform: {
          enable: true,
          config: {

          },
        },
        url: {
          enable: true,
          config: {
            limit: 10240, // 设定转换尺寸上限
          },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: function (local, path) {
              const cssNameKey = `${path}___${local}`
              const componentName = String(path).match(/src\/components\/(.+?)\//)[1]
              if (!cssNames.has(cssNameKey)) {
                cssNames.set(cssNameKey, `m-${componentName.toLowerCase() === local ? '' : (`${componentName.toLowerCase()}-`)}${local}`)
              }
              console.log(...arguments)
              return cssNames.get(cssNameKey)
            },
          },
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true,
          config: {
            browsers: [
              'last 3 versions',
              'Android >= 4.1',
              'ios >= 8',
            ],
          },
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}