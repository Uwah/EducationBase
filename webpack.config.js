var path = require('path')
var vuxLoader = require("vux-loader");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const webpackConfig = {

  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'scss': 'vue-style-loader!css-loader!sass-loader',
              'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            }
          }
      },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
      },
      {   test: /iview.src.*?js$/, loader: 'babel' },
      {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
      },
      {
          test: /\.less$/,
          loader:'style-loader!css-loader!less-loader'
      },
      {
          test: /\.(eot|woff|woff2|ttf)$/,
          loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
              name: '[name].[ext]?[hash]'
          }
      }
    ]
  },
  resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src')
    }
  },
  externals: {
      "BMap": "BMap"
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: [
        {
            context: ['/index', '/psActivities', '/searchType','/searchJd','/topSeach','/winners' ,'/notice', '/getBaseSummary'],
            target: 'http://47.96.147.227',
            changeOrigin: true,
            secure: false
        }
    ]
  },
  performance: {
      hints: false
  },
  devtool: '#eval-source-map'
  
};

module.exports = vuxLoader.merge(webpackConfig, {plugins:['vux-ui']});

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
