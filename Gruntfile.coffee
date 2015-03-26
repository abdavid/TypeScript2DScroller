module.exports = ->

  # Load task configurations.
  @loadTasks "grunt/tasks"

  # When running the default Grunt command, just lint the code.
  @registerTask "default", [
    "clean"
    "copy"
    "typescript:compile"
  ]