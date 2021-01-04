const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const path = require('path');
const deps = require('./package.json').dependencies;

const prePath = '/module_federation';

module.exports = (_, { mode }) => {
  const isEnvProduction = mode === 'production';
  const publicPath = isEnvProduction ? prePath + '/app1/' : 'auto';
  const app2Remote = isEnvProduction ?
                     'app2@' + prePath + '/app2/remoteEntry.js' :
                     'app2@http://localhost:3002/remoteEntry.js';
  return {
    entry: './src/index',
    mode,
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 3001,
    },
    output: {
      path: isEnvProduction ? path.resolve(process.cwd(), 'dist/app1') : undefined,
      publicPath: publicPath,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'app1',
        filename: 'remoteEntry.js',
        remotes: {
          app2: app2Remote,
        },
        exposes: {
          './Navigation': './src/Navigation',
          './routes': './src/routes',
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            eager: true,
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
  };
}

