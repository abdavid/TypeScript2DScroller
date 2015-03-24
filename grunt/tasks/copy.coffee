module.exports = ->
  @loadNpmTasks "grunt-contrib-copy"

  # Move bower_components and app logic during a build.
  @config "copy",
    release:
      files: [
        {expand: true, cwd: "src/", src: "vendor/**", dest: "dist/"},
        {expand: true, cwd: "src/", src: "app/templates/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "resources/fonts/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "resources/img/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "messages/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "resources/css/**", dest: "dist/"}
        {expand: true, cwd: "src/", src: "fixtures/**", dest: "dist/"}
      ]
