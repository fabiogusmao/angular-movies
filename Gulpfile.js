var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('default', function(){
   return connect.server({
     port: 9001,
     root: 'site',
     livereload: true
   });
});