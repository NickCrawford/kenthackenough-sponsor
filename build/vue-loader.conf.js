'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    image: 'xlink:href',
    // use for vector:src
    vector: 'src',
    // img:src & image:xlink:href url transform (vue default)
    // https://github.com/vuejs/vue-loader/blob/master/docs/en/options.md
    img: 'src', image: 'xlink:href'
  }
}
