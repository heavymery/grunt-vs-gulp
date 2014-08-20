'use strict';

module.exports = function(grunt) {

  // 使用するプラグインを読み込み
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // タスクのオプション設定
  grunt.initConfig({
  
    connect: {
      server: {
        options: {
          port: 9001,
          middleware: function(connect) {
            return [
              require('connect-livereload')({ port: 35729 }),
              connect.static(require('path').resolve('app'))
            ]
          }
        }
      } // connect:server
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
    } // watch
    
  });

  // プレビュータスク
  grunt.registerTask('serve', [
    'connect',
    'watch'
  ]);

  // デフォルトのタスク
  grunt.registerTask('default', function() {
    grunt.log.write('Grunt vs Gulp...').ok();
  });

};
