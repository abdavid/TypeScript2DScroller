module.exports = ->
  @loadNpmTasks "grunt-contrib-uglify"

  # Minify the distribution CSS.
  @config "uglify",
    release:
      files: [{
        expand: true,
        src: '**/*.js',
        dest: 'dist/app',
        cwd: 'dist/app'
      }]
