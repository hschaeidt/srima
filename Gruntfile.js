module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      my_target: {
        files: {
          'dist/srima.min.js': ['src/srima.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};