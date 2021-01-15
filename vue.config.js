const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  devServer: {
    port: 8090,
    overlay: {
      // warnings: true,
      // errors: true
    },
    proxy: {
      '/apis': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/apis': '' }
      },
      '/estateApi': {
        target: 'http://10.1.1.57:20010',
        changeOrigin: true,
        // ws: true,//websocket支持
        pathRewrite: {
          '^/estateApi': '/'
        }
      },
      '/estateView': {
        target: 'http://10.1.1.57:8012',
        changeOrigin: true,
        // ws: true,//websocket支持
        pathRewrite: {
          '^/estateView': '/'
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
    .set('@learn',resolve('./src/pages/learn'))
    .set('@bug', resolve('src/pages/bug'))

    config.when(process.env.NODE_ENV === 'development',
      config => config.devtool('cheap-source-map')
    )
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return
    let plugins = []
    plugins.push(new PrerenderSPAPlugin({
      staticDir: resolve('dist'),
      routes: ['/', '/demo/', '/demo/2', '/03'],
      // routes: [ '/demo/'],
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      },
      renderer: new Renderer({
        // injectProperty: '__PRERENDER_INJECTED__',
        // inject: 'prerender',
        // maxConcurrentRoutes: 4,
        renderAfterTime: 10000,
        headless: true,
        renderAfterDocumentEvent: 'render-event'
      })
    }))
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
  }
}
