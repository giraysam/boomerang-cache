module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
            'test/browserified.js': ['test/boomerang-cache_tests.js']
        },
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

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask("default", ['browserify', 'uglify']);

};