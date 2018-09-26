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
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task(s).
    grunt.registerTask('default', ['jshint']);
};