module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Converts our Sass files to CSS.
         */
        sass: {
            compile: {
                options: {
                    style: 'nested'
                },
                files: {
                    'style.css': 'style.scss'
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
                files: ['style.scss'],
                tasks: ['sass:compile']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('development', ['sass:compile', 'watch']);

    grunt.registerTask('production',  ['sass:compile']);

};
