//webpack.config.js
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: "eval", //enables debugging with source-maps
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './app/app.jsx'
    ],
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: '/public/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() //allows instantaneous live refresh without losing state while editing React components
    ],
    module: {
        loaders: [{
            //tell webpack to use jsx-loader for all *.jsx files
            test: /\.jsx$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, 'app')
        }]
    }
};