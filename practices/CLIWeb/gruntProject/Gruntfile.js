module.exports = function(grunt) {
    
    grunt.initConfig({
        watch: {
            stylus: {
                files: ['source/stylus/*.styl'],
                tasks: ['stylus','autoprefixer', 'cssmin']
            },
            jade: {
                files: ['source/jade/*.jade'],
                tasks: ['jade']
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: false,
                    paths: ['source/stylus']
                },
                files: {
                    'build/style.css': 'source/stylus/main.styl'
                }
            }
        }, 
        autoprefixer: {
            compile: {
                files: {
                    'build/style.css': 'build/style.css'
                }
            }
        },
        cssmin: {
            clean: {
                files: {
                    'build/style.css': 'build/style.css'
                }
            }
        },
        jade: {
            compile: {
                files: [{
                    expand: true,
                    cwd: "source/jade",
                    src: "*.jade",
                    dest: "build",
                    ext: ".html"
                }]
            }
        },
        uglify: {
            bower_js_files: {
                files: {
                    'build/output.min.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/modernizr/modernizr.js'
                    ]
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: ['build/*.css', 'build/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: 'build'
                }
            }
        }
        //express: {
            //all: {
                //options: {
                    //bases: 'build',
                    //livereload: true,
                    //open: 'http://localhost:3000'
                //}
            //}
        //}
    });


    // Load grunt plugins
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-browser-sync');

    // default task
    grunt.registerTask('default', ['stylus', 'autoprefixer', 'cssmin', 'jade', 'uglify']);
    //grunt.registerTask('start', ['express','watch']);
    grunt.registerTask('start', ['browserSync','watch']);
};
