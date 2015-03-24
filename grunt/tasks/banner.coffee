module.exports = ->
  @loadNpmTasks "grunt-banner"

  # Post code coverage results to Coveralls for tracking.
  @config "usebanner",
    typescript:
      options:
        position: "top"
        banner: '/* istanbul ignore next */'
        linebreak: true
        pattern: 'var __extends'
      files: {
        src: ['dist/app/**/*.js']
      }
