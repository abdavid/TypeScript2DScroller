module.exports = ->
  @loadNpmTasks "grunt-karma"

  # Unit testing is provided by Karma.  Change the two commented locations
  # below to either: mocha, jasmine, or qunit.
  @config "karma",
    options:
      basePath: process.cwd() + "/dist/"
      singleRun: true
      captureTimeout: 7000
      autoWatch: true
      logLevel: "ERROR"

      reporters: ["progress", "coverage", "junit"]
      browsers: ["PhantomJS"]

      frameworks: ['jasmine', 'requirejs']

      plugins: [
        "karma-jasmine"
        "karma-requirejs"
        "karma-qunit"
        "karma-coverage"
        "karma-junit-reporter"
        "karma-phantomjs-launcher"
        "karma-chrome-launcher"
      ]

      preprocessors:
        "app/**/*.js": "coverage"

      coverageReporter:
        dir: "../test/coverage"
        reporters: [
          {type: 'html', subdir: 'html'}
          {type: 'lcov', subdir: 'lcov'}
        ]

      junitReporter:
        outputFile: '../test/coverage/TESTS-xunit.xml'


      files: [

        {
          pattern: "**/*.*",
          included: false
        }

        {
          pattern: "../test/**/*Test.js",
          included: false
        }

        "../test/runner.js"
      ]

      exclude: [
        'app/ApplicationConfig.js'
      ]

  # This creates a server that will automatically run your tests when you
  # save a file and display results in the terminal.
    daemon:
      options:
        singleRun: false

  # This is useful for running the tests just once.
    run:
      options:
        singleRun: true
