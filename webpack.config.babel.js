const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // extract css to own folder for prod build

// will be 'production' on heroku, 'test' in test env, or 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

// process.env.NODE_ENV

// exports function, which exports webconfig object
module.exports = env => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin({
    filename: 'styles.css'
    // disable: !isProduction
  })

  return {
    entry: ['babel-polyfill', './src/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.jsx?$/,
          exclude: /node_modules/
        },
        {
          test: /\.s?(c|a)ss$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
          // use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      CSSExtract,
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(
          process.env.FIREBASE_API_KEY
        ),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(
          process.env.FIREBASE_AUTH_DOMAIN
        ),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(
          process.env.FIREBASE_DATABASE_URL
        ),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(
          process.env.FIREBASE_PROJECT_ID
        ),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(
          process.env.FIREBASE_STORAGE_BUCKET
        ),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(
          process.env.FIREBASE_MESSAGING_SENDER_ID
        )
      })
      // new webpack.NamedModulesPlugin(),
      // new webpack.HotModuleReplacementPlugin()
    ],
    // devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 9000,
      historyApiFallback: true,
      publicPath: '/dist/'
      // hot: true
    }
  }
}

// exports webconfig as object
// module.exports = {
//   entry: './src/app.js',
//   output: {
//     path: path.join(__dirname, 'public'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         loader: 'babel-loader',
//         test: /\.jsx?$/,
//         exclude: /node_modules/
//       },
//       {
//         test: /\.s?(c|a)ss$/,
//         use: ['style-loader', 'css-loader', 'sass-loader']
//       }
//     ]
//   },
//   devtool: 'source-map',
//   devServer: {
//     contentBase: path.join(__dirname, 'public'),
//     port: 9000,
//     historyApiFallback: true
//   }
// }
