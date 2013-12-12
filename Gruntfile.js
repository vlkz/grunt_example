module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine: {
          customTemplate: {
            src: 'js/build/*.js',
            options: {
              specs: 'spec/*spec.js',
              helpers: 'spec/*helper.js',
            }
          }
        },
        coffee: {
          compile: {
            files: {
              'js/compiled.js': ['js/*.coffee'] // compile and concat into single file
            }
          }
        }, 

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

        autoprefixer: {
            dist: {
                files: {
                    'css/build/main.css': 'css/build/main.css'
                }
            }
        },

        csslint: {
          strict: {
            options: {
              import: 2,
            },
            src: ['css/build/main.css']
          },
          lax: {
            options: {
              import: false
            },
            src: ['css/build/main.css']
          }
        },

        watch: {
          options: {
            livereload: true
          },
          coffee: {
            files: ['js/*.coffee'],
            tasks: ['coffee'],
            options: {
              // spawn: false,
            }
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
                // spawn: false,
            }
          },
          autoprefixer: {
            files: ['css/build/main.css'],
            tasks: ['autoprefixer'],
            options: {
              // spawn: false,
            }
          },
          lint: {
            files: ['css/build/main.css'],
            tasks: ['csslint'],
              options: {
                spawn: false,
            }
          }
        }
        

    });
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'imagemin',  'sass', 'autoprefixer', 'csslint', 'jasmine', 'watch']);

};