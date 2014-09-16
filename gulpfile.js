var gulp = require('gulp');

var connect = require('gulp-connect');

gulp.task('serve', function() {
  connect.server({
    root: 'app',
    port: '9001',
    livereload: true
  });
  
  gulp.watch(['./app/*.html'], function() {
    gulp.src('./app/*.html').pipe(connect.reload());
  });
  
  gulp.watch(['./app/styles/**/*.css'], function() {
    gulp.src('./app/styles/**/*.css').pipe(connect.reload());
  });
  
  gulp.watch(['./app/scripts/**/*.js'], function() {
    gulp.src('./app/scripts/**/*.js').pipe(connect.reload());
  });
});

gulp.task('default', function() {
  console.log('Grunt vs Gulp...');
});
