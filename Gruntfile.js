module.exports = function(grunt) {
  grunt.initConfig({
      copy: {
        main: {
          files: [
            {expand: true, src: ['../pablo/build/*'], dest: 'downloads', flatten: true},
            {expand: true, src: ['../pablo/pablo.js'], dest: 'downloads'},
            {expand: true, src: ['../pablo/tests'], dest: './'}
          ]
        }
      },
      gitcheckout: {
        ghpages: {
          options: {
            branch: 'gh-pages'
          }
        }
      },
      gitstash: {
        master: {
          options: {
            
          }
        }
      },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['gitstash', 'gitcheckout', 'copy']);
};
