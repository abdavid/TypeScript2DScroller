module.exports = ->
  @loadNpmTasks "grunt-bbb-server"

  @config "server",
    options:
      host: "0.0.0.0"
      port: 80

    development:
      options:
        root: "/"
        prefix: "dist"

    test:
      options:
        forever: false
        port: 8001
