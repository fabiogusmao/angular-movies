var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    cache: true,
    entry: {
        app: "./modules/angular-movies.js",
        angular: ['angular', 'angular-resource', 'angular-route', 'angular-bootstrap']
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

            // required for bootstrap icons
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=../[hash].[ext]"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=../[hash].[ext]"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream&name=../[hash].[ext]"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file?name=../[hash].[ext]"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml&name=../[hash].[ext]"
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules|bower_components/
            }, {
                test: /\.html$/,
                loader: 'html'
            },
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            // Optionally extract less files
            // or any other compile-to-css language
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            }
            // You could also use other loaders the same way. I. e. the autoprefixer-loader
        ]
    },
    resolve: {
        modulesDirectories: ["web_modules", "node_modules", "bower_components"]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        ),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"angular", /* filename= */"angular.bundle.js"),
        //new webpack.optimize.UglifyJsPlugin()
    ]
};