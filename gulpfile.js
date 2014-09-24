'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

// プレビュータスク用プラグイン
var connect = require('gulp-connect');

// ビルドタスク用プラグイン
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var imageop = require('gulp-image-optimization');

var revall = require('gulp-rev-all');

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
gulp.task('build', ['clean'], function(callback) {
  runSequence('usemin', 'image-optimize', 'rev-all', 'htmlmin', callback);
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('usemin', function(callback) {
  gulp.src('./app/*.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      js: [uglify()]
    }))
    .pipe(gulp.dest('dist')).on('end', callback).on('error', callback);
});

gulp.task('image-optimize', function(callback) {
  gulp.src(['app/images/**/*.png']).pipe(imageop({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true
  })).pipe(gulp.dest('dist/images')).on('end', callback).on('error', callback);
});

gulp.task('rev-all', function(callback) {
  gulp.src('dist/**')
    .pipe(revall({ ignore: [/^\/favicon.ico$/g, /^\/index.html/g] }))
    .pipe(gulp.dest('dist')).on('end', callback).on('error', callback);
});

gulp.task('htmlmin', function(callback) {
  gulp.src('dist/**/*.html')
    .pipe(minifyHtml({
      coments: true,
      spare: true
    }))
    .pipe(gulp.dest('dist')).on('end', callback).on('error', callback);
});

// デフォルトタスク
gulp.task('default', ['build', 'serve:dist']);
