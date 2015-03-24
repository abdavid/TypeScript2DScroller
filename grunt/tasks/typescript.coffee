module.exports = ->
  @loadNpmTasks "grunt-typescript"

  # Minify the distribution CSS.
  @config "typescript",
    compile:
      src: [
        "src/app/**/*.ts"
      ]
      dest: "dist/app"
      options:
        basePath: "src/app"
        target: "es5"
        module: "amd"
      
  
