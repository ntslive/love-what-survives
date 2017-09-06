module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            jsx: {
                options: {
                    plugins: ['transform-react-jsx'],
                    presets: ['es2015', 'react']
                },
                files: [{
                    expand: true,
                    cwd: 'react/',
                    src: [
                        '*.jsx', '**/*.jsx',
                        '*.js', '**/*.js',
                    ],
                    dest: 'react_compiled/',
                    ext: '.js',
                }],
            },
            /**
             * Transform ES6 JS files into ES5.
             */
            es6: {
                options: {
                    sourceMap: true,
                    presets: ['es2015'],
                },
                files: {
                    "client-es2015.js": "client.js",
                },
            },
        },

        /**
         * Browserify
         *
         * Allows for modules / packages / requires in client-side Javascript,
         *  and merges all source files & their requirements into one 'bundle'.
         *
         */
        browserify: {
            options: {
                browserifyOptions: {
                    debug: true, // creates source map in file for development
                },
            },
            bundle: {
                files: {
                    'react-bundle.js': [
                        'react_compiled/**/*.js',
                    ],
                },
                options: {
                    // exclude: [
                    //     'react/compiled/react-index.js',
                    // ],
                },
            },
        },

        checkDependencies: {
            this: {},
        },

        /**
         * Converts our Sass files to CSS.
         */
        sass: {
            compile: {
                options: {
                    style: 'nested'
                },
                files: {
                    'public/css/style.css': 'style.scss'
                }
            }
        },

        /**
         * Minifies referenced files
         */
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                },
                files: {
                    'public/js/app.min.js': ['react-bundle.js', 'client-es2015.js'],
                },
            },
        },


        /**
         * Watches for changes on all JS and CSS files.
         *
         * Live reload is working (servers running on localhost 35729 and 35728).
         * You'll need a Live-reload plugin installed (https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
         *
         * Changes to grunt file will rerun the grunt script.
         */
        watch: {
            css: {
                files: ['style.scss', 'collage.scss'],
                tasks: ['sass:compile']
            },
            react: {
                files: ['react/*.jsx', 'react/**/*.jsx', 'react/**/*.js'],
                tasks: ['babel', 'browserify'],
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        },

        copy: {
            fontawesome: {
                nonull: true,
                expand: true,
                cwd: 'node_modules/font-awesome/',
                src: ['fonts/**', 'css/**'],
                dest: 'public'
            },
        },
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-check-dependencies');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('production',  ['checkDependencies', 'copy:fontawesome', 'sass:compile',  'babel', 'browserify', 'uglify']);
    grunt.registerTask('development', ['production', 'watch']);

};
