module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '../<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      src: '<%= pkg.name %>.js',
      options: {
        curly: true
      },
      globals: {
        document: true,
        window: true
      }
    }
  });

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load custom project related task:
  // Moving the tests/ and distribution minified code 
  // over to the gh-pages branch and committing it 
  // there.
  require('./toGhPages.js');

  // Default tasks.
  grunt.registerTask('default', ['jshint', 'uglify', 'toGhPages']);
};