'use strict';

module.exports = function(grunt) {

  // 使用するプラグインを読み込み
  grunt.loadNpmTasks('grunt-contrib-connect');

  // タスクのオプション設定
  grunt.initConfig({
  
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app',
          keepalive:true
        }
      }
    } // connect
    
  });

  // プレビュータスク
  grunt.registerTask('serve', [
    'connect'
  ]);

  // デフォルトのタスク
  grunt.registerTask('default', function() {
    grunt.log.write('Grunt vs Gulp...').ok();
  });

};
