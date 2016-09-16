module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                sourceMapName: 'dist/boomerang-cache.map'
            },
            my_target: {
                files: {
                    'dist/boomerang-cache.min.js': ['src/boomerang-cache.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ['uglify']);

};