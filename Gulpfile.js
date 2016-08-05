var path = require('path');
var gulp = require('gulp');
var watch = require('gulp-watch');
var runSSequence = require('run-sequence');
var connect = require('gulp-connect');
var less = require('gulp-less');
var bower = require('gulp-bower');
var wiredep = require('wiredep').stream;
var webpack = require('webpack-stream');

var webPackCfg = require('./webpack.config.js');

gulp.task('bower', () => {
  return bower();
});

gulp.task('wiredep', () => {
  return gulp.src('index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('.'));
});

gulp.task('less', () => {
  return gulp.src('less/**/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'node_modules')]
    }))
    .pipe(gulp.dest('css'));
});
gulp.task('fonts', () => {
  return gulp.src(['node_modules/bootstrap/fonts/**/*.*',
    'node_modules/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('fonts'));
});

gulp.task('webpack', () => {
  return gulp.src('modules/app.js')
    .pipe(webpack(webPackCfg))
    .pipe(gulp.dest('bundles/'));
});


gulp.task('build', ['wiredep', 'less', 'fonts', 'webpack'], () => {

});
gulp.task('reload', () => {
  return connect.reload();
})
gulp.task('watch', () => {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch(['modules/**/*.js', 'modules/**/*.html'], ['webpack']);
  watch(['bundles/*.js', 'css/*.css']).pipe(connect.reload());
});



gulp.task('default', () => {

  return runSSequence('bower', 'build', 'watch', () => {
    return connect.server({
      port: 9001,
      root: '.',
      livereload: true
    });
  });
});