var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: "./modules/angular-movies.js",                
    },
    output: {
        path: path.join(__dirname, "bundles"),
        publicPath: "bundles/",
        filename: "[name].js",
        chunkFilename: "[name].[hash].js"
    },
    devtool: "source-map",
    module: {
        loaders: [

            
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|bower_components/
            },{
                test: /\.js$/,
                loader: 'ng-annotate',
                exclude: /node_modules|bower_components/
            }, {
                test: /\.html$/,
                loader: 'html'
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    // resolve: {
    //     modulesDirectories: ["web_modules", "node_modules", "bower_components"]
    // },
    plugins: [
        //new webpack.NoErrorsPlugin(),
        // new webpack.ResolverPlugin(
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        // ),
        new ExtractTextPlugin("[name].css"),
        new LiveReloadPlugin({
            appendScriptTag: true
        })
        //new webpack.optimize.CommonsChunkPlugin("app", "commons.js"),
        //new webpack.optimize.UglifyJsPlugin()
    ]
};