module.exports = ->
  @loadNpmTasks "assemble-less"

  # Wipe out previous builds and test reporting.
  @config "less",
    options:
      stripBanners:
        block: true
        line: true
      cleancss: true,
      compress: false,
      report: 'min',
      paths: 'src/resources'
      relativeUrls: true
    compile:
      files: [{
        src: [
          'src/resources/less/**/*.less'
        ],
        dest: 'src/resources/css/styles.css'
        ext: '.css'
      }]
        
