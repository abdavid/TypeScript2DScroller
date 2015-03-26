module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move bower_components and app logic during a build.
  @config "copy",
    release:
      files: [
        {expand: true, cwd: "src/", src: "vendor/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "assets/**", dest: "dist/"}
        {expand: false, src: "src/index.html", dest: "dist/index.html"}
      ]
