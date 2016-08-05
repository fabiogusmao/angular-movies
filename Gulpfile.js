var path = require('path');
var gulp = require('gulp');
var gutil = require("gulp-util");
var watch = require('gulp-watch');
var del = require('del');
var runSSequence = require('run-sequence');
var less = require('gulp-less');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var WebpackDevServer = require("webpack-dev-server");
var connect = require('gulp-connect');
var open = require('gulp-open');

var webPackCfg = require('./webpack.config.js');

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'node_modules')]
    }))
    .pipe(gulp.dest('bundles/css'));
});
gulp.task('fonts', () => {
  return gulp.src(['node_modules/bootstrap/fonts/**/*.*',
    'node_modules/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('bundles/fonts'));
});

gulp.task('build', ['less', 'fonts'], () => {

});


gulp.task('watch', () => {
  gulp.watch('less/**/*.less', ['less']);
  //gulp.watch(['modules/**/*.js', 'modules/**/*.html'], ['webpack']);
  //watch(['bundles/*.js', 'css/*.css']).pipe(connect.reload());
});



gulp.task("webpack-dev-server", function (callback) {
  // Start a webpack-dev-server

  var myConfig = Object.create(webPackCfg);
  myConfig.debug = true;


  var compiler = webpack(myConfig);

  var webServer = new WebpackDevServer(compiler, {
    publicPath: "/" + myConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
  }).listen(8080, "localhost", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});


gulp.task('default', () => {

  return runSSequence('build', 'watch', 'webpack-dev-server', () => {
  });
});


gulp.task('clean', function () {
  return del('bundles');
});


gulp.task('webpack', ['clean'], () => {
  var config = Object.create(webPackCfg);
  config.debug = false;
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }));
  config.plugins.push(
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin({mangle: false})

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    // new CopyWebpackPlugin([{
    //   from: __dirname + '/src/public'
    // }
  );


  return gulp.src('modules/*.js')
    .pipe(webpackStream(config))
    .pipe(gulp.dest('bundles/'));
});
gulp.task('deploy', () => {

  return runSSequence('clean', 'webpack', 'build', () => {

  });
});

gulp.task('server', ['deploy'], () => {
  return connect.server();
});