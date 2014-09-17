'use strict';

var gulp = require('gulp');

// プレビュータスク用プラグイン
var connect = require('gulp-connect');

// ビルドタスク用プラグイン
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var imageop = require('gulp-image-optimization');

// プレビュータスク
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
  
  gulp.watch(['./app/images/**/*.{png,jpg,gif}'], function() {
    gulp.src('./app/images/**/*.{png,jpg,gif}').pipe(connect.reload());
  });
});

// ビルド結果のプレビュータスク
gulp.task('serve:dist', function() {
  connect.server({
    root: 'dist',
    port: '9001'
  });
});

// ビルドタスク
gulp.task('build', function() {
  gulp.src('dist/**/*', {read: false}).pipe(clean());
  
  gulp.src('./app/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat', rev()],
      html: [minifyHtml({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist'));
    
  gulp.src(['app/images/**/*.png']).pipe(imageop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('dist/images'));
});

// デフォルトタスク
gulp.task('default', ['build', 'serve:dist']);
