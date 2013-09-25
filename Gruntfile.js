module.exports = function(grunt) {
  grunt.initConfig({
      copy: {
        main: {
          files: [
            {expand:true, cwd:'../pablo/', src: ['pablo.js'], dest: 'downloads/'},
            {expand:true, cwd:'../pablo/build/', src: ['**'], dest: 'downloads/'},
            {expand:true, cwd:'../pablo/tests/', src: ['**', '!index.html', '!testrunner.js'], dest: 'tests/'}
          ]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);
};
