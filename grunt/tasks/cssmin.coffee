module.exports = ->
  @loadNpmTasks "grunt-contrib-cssmin"

  # Minify the distribution CSS.
  @config "cssmin",
    release:
      files:
        "dist/resources/css/styles.min.css": [
          "src/resources/css/vendor/bootstrap.min.css", 
          "src/resources/css/styles.css"
        ]
