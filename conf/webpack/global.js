var path = require('path');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = function (_path) {

    return {
        context: path.join(_path, 'app'),
        entry: {
            "app": ["babel-polyfill", "./angular-movies.js"],
        }, output: {
            path: 'dist',
            filename: '[name].js',
            publicPath: '/'
        }, module: {
            loaders: [

                {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
                }, {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]"
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]"
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file?name=fonts/[name].[ext]"
                }, {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]"
                }, {
                    test: /\.html$/,
                    loaders: [
                        //'ngtemplate-loader?relativeTo=' + _path,
                        'html-loader?attrs[]=img:src&attrs[]=img:data-src'
                    ]
                },

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    
                    query: {
                        cacheDirectory: true,
                        plugins: ['transform-runtime', 'add-module-exports'],
                        presets: ['angular', 'es2017']
                    }
                }, {
                    test: require.resolve("angular"),
                    loaders: [
                        "expose?angular"
                    ]
                }, {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")

                }
            ],
        }, plugins: [
            new webpack.NoErrorsPlugin(),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.AggressiveMergingPlugin({
                moveToParents: true
            }),
            /*new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                async: true,
                children: true,
                minChunks: Infinity
            }),*/ new HtmlWebpackPlugin({
                hash: false,
                filename: 'index.html',
                template: './index-tpl.html'
            }), new ExtractTextPlugin('style-[chunkhash].css', { allChunks: true }),
        ]
    };

};