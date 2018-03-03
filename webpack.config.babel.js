const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin') // extract css to own folder for prod build

// exports function, which exports webconfig object
module.exports = env => {
  const isProduction = env === 'production'
  const CSSExtract = new ExtractTextPlugin('styles.css')

  return {
    entry: './src/app.js',
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
    plugins: [CSSExtract],
    // devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 9000,
      historyApiFallback: true,
      publicPath: '/dist/'
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
