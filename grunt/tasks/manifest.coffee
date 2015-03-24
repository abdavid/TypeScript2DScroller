module.exports = ->
  @loadNpmTasks "grunt-manifest"

  # Post code coverage results to Coveralls for tracking.
  @config "manifest",
    generate:
      options:
#        basePath: "../dist"
        network: ["*"]
        master: ['index.html']
#        cache: ['app/**/*.js'],
#        fallback: ["/"]
        preferOnline: true
        timestamp: true
        hash: true
        verbose: true
        process: (path) ->
          distLength = 'dist/'.length;
          return if path.indexOf('dist/') == 0 then path.substring(distLength) else path;
      src: [

        # application
        "dist/app/**/*.js"
        "dist/app/**/*.dust"

        # static assets
        "dist/resources/css/**/*.*"
        "dist/resources/fonts/vres.eot?-wcj66z"
        "dist/resources/fonts/vres.eot?#iefix-wcj66z"
        "dist/resources/fonts/vres.woff?-wcj66z"
        "dist/resources/fonts/vres.ttf?-wcj66z"
        "dist/resources/fonts/vres.svg?-wcj66z#vres"
        "dist/resources/img/**/*.*"

        #translations
        "dist/messages/*.json"

        # vendor libs
        "dist/vendor/requirejs/require.js"
        "dist/vendor/jquery/dist/jquery.js"
        "dist/vendor/backbone/backbone.js"
        "dist/vendor/lodash/dist/lodash.underscore.js"
        "dist/vendor/velocity/velocity.min.js"
        "dist/vendor/hammerjs/hammer.min.js"
        "dist/vendor/d3/d3.min.js"
        "dist/vendor/velocity/velocity.ui.min.js"
        "dist/vendor/requirejs-dust/requirejs-dust.js"
        "dist/vendor/dustjs-linkedin/dist/dust-full.js"
        "dist/vendor/dustjs-helpers/dist/dust-helpers.min.js"
        "dist/vendor/dustjs-helpers-extra/lib/dust-helpers.js"
        "dist/vendor/i18next/i18next.amd.js"
        "dist/vendor/require-i18next/require-i18next/i18next.js"
      ]
      dest: "dist/manifest.appcache"
        
