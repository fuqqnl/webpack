
var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取css到一个文件中
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//定义文件夹路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'src');
var BUILT_PATH = path.resolve(ROOT_PATH,'dist');

module.exports = {

    entry: [
        'webpack/hot/dev-server',
        path.resolve(APP_PATH,'main.js')
    ],
    output: {
        path: BUILT_PATH,
        filename: '[name].[hash:6].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {presets: ['es2015','react']}
            },
            {
                test: /\.jsx$/,
                loader: 'babel',
                query: {presets: ['es2015','react']}
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            },
            {
                test: /\.less$/,
                loader: 'style!css!less?sourceMap'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url?limit=8192'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        extensions: ['','.js','.jsx'],
        alias: {

        }
    },
    plugins: [
        new ExtractTextPlugin('style.css', {allChunks: true} ),
        new htmlWebpackPlugin({
            template: path.resolve(ROOT_PATH, 'index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8081/'})
    ]
};