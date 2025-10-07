const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
    ]
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true
  },
  infrastructureLogging: { level: 'error' },

  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    historyApiFallback: true,
    port: 8080,
    open: true,

    // ⬇️ recarga ON
    hot: true,
    liveReload: true,

    // ⬇️ sin spam en navegador
    client: {
      logging: 'none',
      overlay: false,
      progress: false
    },

    // ⬇️ vigila archivos que tocas (src, html y assets)
    watchFiles: {
      paths: ['src/**/*', 'index.html', 'assets/**/*'],
      options: { usePolling: false }
    },

    // Si trabajas en WSL/Docker o red y no refresca, activa polling:
    // devMiddleware: { writeToDisk: false },
    // watchFiles: { paths: ['src/**/*', 'index.html', 'assets/**/*'], options: { poll: 1000 } },

    devMiddleware: { stats: 'errors-only' },

    // stub DevTools
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get(
        '/.well-known/appspecific/com.chrome.devtools.json',
        (_req, res) => res.status(204).end()
      );
      return middlewares;
    }
  },

  plugins: [
    new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
    new CopyWebpackPlugin({ patterns: [{ from: 'assets', to: 'assets' }] })
  ]
};
