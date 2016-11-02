module.exports = function ( config ) {

  var subtle = require( 'clix-logger' )( { coloredOutput: true } ).subtle;

  var argv = process.argv;

  var isDebug = argv.indexOf( 'karma-debug' ) > -1;
  var errorsOnly = argv.indexOf( 'karma-errors-only' ) > -1;
  var testOn = argv.indexOf( 'karma-chrome' ) > -1 ? 'Chrome' : 'PhantomJS';

  isDebug && subtle( 'Running in debug mode ' );
  errorsOnly && subtle( 'Showing only errors' );

  var cfg = {
    basePath: '../',
    files: [
      // vendors files
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests-dist/includes.js',

      // test suites
      'tests-dist/all.js'
    ],
    autoWatch: true,
    frameworks: [
      'mocha'
    ],
    browsers: [
      testOn
    ],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {},
    exclude: [],
    reporters: [
      'spec',
      'coverage',
      'junit',
      'osx'
    ],
    junitReporter: {
      outputDir: 'report/junit/',
      outputFile: 'test-results.xml'
    }
  };

  if ( isDebug ) {
    cfg.reporters = cfg.reporters.filter( function ( reporter ) {
      return reporter !== 'coverage';
    } );
  } else {
    cfg.coverageReporter = {
      // TODO: Will be enable by Christine
      // check: {
      //   global: {
      //     statements: 60,
      //     branches: 60,
      //     functions: 60,
      //     lines: 60
      //   },
      //   each: {
      //     statements: 60,
      //     branches: 60,
      //     functions: 60,
      //     lines: 60
      //   }
      // },
      dir: 'report/',
      reporters: [
        {
          type: 'text-summary'
        },
        {
          type: 'json',
          subdir: 'json'
        },
        {
          type: 'html',
          subdir: function ( browser ) {
            // normalization process to keep a consistent
            // browser name accross different OS
            return browser.toLowerCase().split( /[ /-]/ )[ 0 ];
          }
        },
        {
          type: 'text',
          subdir: '.',
          file: 'coverage.txt'
        }
      ]
    };
  }

  if ( errorsOnly ) {
    cfg.specReporter = { suppressPassed: true, suppressSkipped: true };
  }

  config.set( cfg );
};
