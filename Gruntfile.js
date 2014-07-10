module.exports = function(grunt) {
  grunt.initConfig({
      copy: {
        main: {
          files: [
            {
              expand:true,
              cwd:'../pablo/',
              src: ['pablo.js'],
              dest: 'docs/files/downloads/'
            },
            {
              expand:true,
              cwd:'../pablo/build/',
              src: ['**'],
              dest: 'docs/files/downloads/'
            },
            {
              expand:true,
              cwd:'../pablo/tests/',
              src: ['**', '!index.html', '!testrunner.js'],
              dest: 'docs/files/tests/'
            },
            {
              expand:true,
              cwd:'../pablo/',
              src: ['HISTORY.md'],
              rename: function(dest, src) {
                return 'docs/misc/100. Changelog.md';
              }
            }
          ]
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);
};