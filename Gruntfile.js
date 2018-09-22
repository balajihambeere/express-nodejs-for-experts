module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ["*.js",
                "./src/**/*.js"],
            options: {
                node: true,
                esnext: true
            }
        },

        // uglify: {
        //     options: {
        //         mangle: false
        //     },
        //     my_target: {
        //         files: {
        //             'dest/bundle.min.js': ['./src/**/*.js'],
        //             'dest/server.min.js': ['app.js'],
        //         }
        //     }
        // }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    //grunt.loadNpmTasks('grunt-contrib-uglify-es');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};