const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: 'src/public',
    historyApiFallback: true,
    port: 8000,
    host: '0.0.0.0',
    hot: true,
  },
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2016'] },
        }],
      },
    ],
  },
  watchOptions: {
    poll: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/public' },
    ], '.'),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'http://192.168.99.100:9000/api'),
      },
    }),
  ],
};
