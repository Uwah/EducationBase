

var path = require('path')
var vuxLoader = require("vux-loader");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const webpackConfig = {

  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'js/build.js'
  },
  module: {
    rules: [
      {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              'css': ExtractTextPlugin.extract({
                use: ['css-loader', 'autoprefixer-loader'],
                fallback: 'vue-style-loader'
              }),
              'scss': ExtractTextPlugin.extract({
                use: ['sass-loader?indentedSyntax', 'autoprefixer-loader'],
                fallback: 'vue-style-loader'
              })
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
          loader: ExtractTextPlugin.extract({
            use: ['css-loader', 'autoprefixer-loader'],
            fallback: 'style-loader'
          })
      },
      {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract({
            use: ['less-loader', 'autoprefixer-loader'],
            fallback: 'style-loader'
          })
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
            context: ['/index', '/psActivities', '/searchType','/searchJd','/topSeach', '/addLuckeyUser', '/getWechatToken',
            '/winners' ,'/notice', '/getBaseSummary', '/navigation', '/banners', '/login', '/codeMobile', '/updateUser', '/signWechatToken',
            '/knowledgeCompetition', '/getIndiProfile', '/addAnswer', '/getPsActivities', '/queryUserInfo','/listLuckeyUser'],
            target: 'https://47.96.147.227',
            changeOrigin: true,
            secure: false
        }
    ]
  },
  performance: {
      hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new CleanWebpackPlugin('/dist')
  ]
  
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
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
