module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {   
            dist: {
                src: [
                    'js/lib/*.js', // All JS in the libs folder
                    'js/*.js'  // This specific file
                ],
                dest: 'js/build/production.js',
            }
        },

        uglify: {
          build: {
              src: 'js/build/production.js',
              dest: 'js/build/production.min.js'
          }
        },

        imagemin: {
          dynamic: {
              files: [{
                  expand: true,
                  cwd: 'images/',
                  src: ['**/*.{png,jpg,gif}'],
                  dest: 'images/build/'
              }]
          }
        },

        sass: {
          dist: {
              options: {
                  style: 'compressed'
              },
              files: {
                  'css/build/main.css': 'css/main.scss'
              }
          } 
        },

        watch: {
          options: {
            livereload: true
          },
          scripts: {
              files: ['js/*.js'],
              tasks: ['concat', 'uglify', 'imagemin'],
              options: {
                  spawn: false,
              },
          },
          css: {
            files: ['css/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false,
            }
          }
        }
        

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin',  'sass', 'watch']);

};