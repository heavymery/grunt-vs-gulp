var gulp = require('gulp');

var connect = require('gulp-connect');

gulp.task('serve', function() {
  connect.server({
    root: 'app',
    port: '9001'
  });
});

gulp.task('default', function() {
  console.log('Grunt vs Gulp...');
});
