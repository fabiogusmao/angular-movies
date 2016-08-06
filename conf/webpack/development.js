var LiveReloadPlugin = require('webpack-livereload-plugin');
module.exports = function () {

    return {
        devtool: 'source-map',
        plugins: [
            new LiveReloadPlugin({
                appendScriptTag: true
            })
        ], devServer: {
            stats: {
                colors: true,
                hash: false,
                version: false,
                timings: true,
                assets: true,
                chunks: false,
                modules: false,
                reasons: false,
                children: false,
                source: false,
                errors: true,
                errorDetails: true,
                warnings: false,
                publicPath: false
            }
        }
    };
}