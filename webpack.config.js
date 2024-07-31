import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
};
