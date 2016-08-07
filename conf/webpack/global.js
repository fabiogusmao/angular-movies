var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function addVendors(rootDir, webpackConfig) {
    var packageJsonPath = path.join(rootDir, 'package.json');



    var packageJson = JSON.parse(fs.readFileSync(packageJsonPath));

    for (var depName in packageJson.dependencies) {

        webpackConfig.entry.vendors.push(depName);
        webpackConfig.module.noParse.push(new RegExp('^' + depName + '$'));

    }
}


module.exports = function (_path) {

    var config = {
        context: path.join(_path, 'app'),
        entry: {
            "app": ["./angular-movies.ts"],
            "vendors": []
        }, output: {
            path: 'dist',
            filename: '[name].js',
            publicPath: '/'
        }, resolve: {
            alias: {},
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
        }, module: {
            noParse: [],
            loaders: [
                { test: /\.ts$/, loader: 'ts-loader' },
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
            new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'), new HtmlWebpackPlugin({
                hash: false,
                filename: 'index.html',
                template: './index-tpl.html'
            }), new ExtractTextPlugin('style-[chunkhash].css', { allChunks: true }),
        ]
    };

    addVendors(_path, config);

    return config;

};