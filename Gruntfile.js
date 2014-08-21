'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        'src/{,*/}*.js'
      ]
    },

    clean: {
      dist: {
        files: [{
          src: ['dist']
        }]
      }
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: 'angular-get-template.js',
          dest: 'dist'
        }]
      }
    },

    copy: {
      dist: {
        dest: 'dist/angular-get-template.js',
        src: 'src/angular-get-template.js'
      },
    }
  });

  grunt.registerTask('build', [
    'newer:jshint',
    'clean:dist',
    'copy:dist',
    'ngAnnotate'
  ]);

  grunt.registerTask('default', ['build']);
};
