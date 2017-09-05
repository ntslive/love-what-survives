module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                plugins: ['transform-react-jsx'],
                presets: ['es2015', 'react']
            },
            jsx: {
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
            }
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
                    'public/js/react-bundle.js': [
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('production',  ['copy:fontawesome', 'sass:compile',  'babel', 'browserify']);
    grunt.registerTask('development', ['production', 'watch']);

};
