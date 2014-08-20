'use strict';

module.exports = function(grunt) {

  // 使用するプラグインを読み込み（プレビュー用）
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 使用するプラグインを読み込み（ビルド用）
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');

  // タスクのオプション設定
  grunt.initConfig({
  
    connect: {
      livereload: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              require('connect-livereload')({ port: 35729 }),
              connect.static(require('path').resolve('app'))
            ]
          }
        }
      }, // connect:server

      dist: {
        options: {
          port: 9001,
          base: 'dist',
          keepalive: true
        }
      }
    }, // connect

    watch: {
      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'app/images/**/*.{png,jpg,gif}',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/**/*.html'
        ]
      } // watch:livereload
    }, // watch

    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['dist']
        }]
      } // clean:dist
    }, // clean

    copy: {
      build: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            'images/**/*.{png,jpg,gif}',
            '**/*.html'
          ]
        }]
      } // copy:build
    }, // copy

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    }, // useminPrepare

    usemin: {
      html: [
        'dist/**/*.html'
      ], // usemin:html
      css: [
        'dist/styles/**/*.css'
      ] // usemin:css
    }, // usemin

    filerev: {
      images: {
        src: 'dist/images/**/*.{png,jpg,gif}'
      }, // filerev:images
      styles: {
        src: 'dist/styles/**/*.css'
      }, // filerev:styles
      scripts: {
        src: 'dist/scripts/**/*.js'
      } // filerev:scripts
    } // filerev

  });

  // プレビュータスク
  grunt.registerTask('serve', [
    'connect:livereload',
    'watch'
  ]);
  
  // ビルドタスク
  grunt.registerTask('build', [
    'clean:dist',
    'copy:build',
    'useminPrepare',
    'concat',
    'cssmin',
    'filerev:images',
    'usemin:css',
    'uglify',
    'filerev:styles',
    'filerev:scripts',
    'usemin:html'
  ]);

  // デフォルトのタスク
  grunt.registerTask('default', function() {
    grunt.log.write('Grunt vs Gulp...').ok();
  });

};
