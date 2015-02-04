var pkgjson = require('./package.json');

var config = {
    pkg: pkgjson,
    app: 'app',
    dist: 'dist',
    bower: 'bower_components'
};

module.exports = function(grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        config: config,
        pkg: config.pkg,
        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.dist)
                        ];
                    }
                }
            }
        },
        watch: {
            js: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['newer:jshint'],
                options: {
                    livereload: true
                }
            },
            stylesheets: {
                files: '<%= config.app %>/**/*.css',
                tasks: ['stylesheets']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.dist %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*'
                ]
            }
        },
        copy: {
            build: {
                files: [{
                    cwd: '<%= config.app %>',
                    src: ['**'],
                    dest: '<%= config.dist %>',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap/dist/js/',
                    dot: true,
                    src: 'bootstrap.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap/dist/css/',
                    dot: true,
                    src: 'bootstrap.min.css',
                    dest: '<%= config.dist %>/styles/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap-material-design/dist/css/',
                    dot: true,
                    src: 'material-wfont.min.css',
                    dest: '<%= config.dist %>/styles/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap-material-design/dist/css/',
                    dot: true,
                    src: 'ripples.min.css',
                    dest: '<%= config.dist %>/styles/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap-material-design/dist/js/',
                    dot: true,
                    src: 'ripples.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap-material-design/dist/js/',
                    dot: true,
                    src: 'ripples.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/bootstrap-material-design/dist/js/',
                    dot: true,
                    src: 'material.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/jquery/dist/',
                    dot: true,
                    src: 'jquery.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }, {
                    cwd: './bower_components/waypoints/lib/',
                    dot: true,
                    src: 'jquery.waypoints.min.js',
                    dest: '<%= config.dist %>/scripts/vendor/',
                    expand: true
                }]
            },
        },
        clean: {
            build: {
                src: ['<%= config.dist %>']
            },
            stylesheets: {
                src: ['<%= config.dist %>/styles/*.{scss,sass,css}', '!<%= config.dist %>/styles/production.min.css']
            },
            scripts: {
                src: ['<%= config.dist %>/scripts/*.js', '!<%= config.dist %>/scripts/production.min.js']
            },
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: '<%= config.dist %>',
                src: ['styles/*.css'],
                dest: '<%= config.dist %>'
            }
        },
        uglify: {
            build: {
                files: {
                    '<%= config.dist %>/scripts/production.min.js': ['<%= config.dist %>/scripts/production.js']
                }
            }
        },
        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },
        cssmin: {
            build: {
                files: {
                    '<%= config.dist %>/styles/application.min.css': ['<%= config.dist %>/styles/*.css']
                }
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'dist/*.html'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['<%= config.dist %>/scripts/*.js'],
                dest: 'dist/scripts/production.js',
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ]
        },
        sass: {
            options: {
                loadPath: 'bower_components'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '<%= config.dist %>/styles',
                    ext: '.css'
                }]
            }
        },
        //play with this later
        concurrent: {
            dist: [
                'jshint',
                'sass'
            ]
        }

    });

    // Default task(s).

    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.', ['clean:build', 'newer:copy','images',
            'stylesheets', 'scripts', 'html'
        ]
    );

    grunt.registerTask(
        'images', 
        'compress images', 'newer:imagemin', 'newer:svgmin');

    grunt.registerTask(
        'stylesheets',
        'Compiles the stylesheets.', ['newer:sass', 'newer:autoprefixer', 'newer:cssmin', 'clean:stylesheets']
    );

    grunt.registerTask(
        'html',
        'stuff with html', ['newer:htmlmin']
    );

    grunt.registerTask(
        'scripts',
        'Compiles the JavaScript files.', ['newer:jshint', 'newer:concat', 'newer:uglify', 'clean:scripts']
    );

    grunt.registerTask('default', 'start the server and preview your app', function(target) {
        grunt.task.run([
            'build',
            'connect:livereload',
            'watch'
        ]);
    });
};
