// Karma configuration

//comment out chart.js injecion on line 5 in app.js to get tests to run

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'browserify','sinon'],

    plugins : [
      'karma-mocha',
      'karma-chai',
      'karma-browserify',
      'karma-jasmine',
      'karma-nyan-reporter',
      'karma-unicorn-reporter',
      'karma-phantomjs-launcher',
      'karma-babel-preprocessor',
      'karma-spec-reporter',
      'karma-mocha-reporter',
      'karma-sinon'
    ],

    // list of files / patterns to load in the browser
    files: [
    // angular source
    'client/lib/angular/angular.js',
    'client/lib/angular-route/angular-route.js',
    'client/lib/angular-mocks/angular-mocks.js',
    'https://code.jquery.com/jquery-2.2.1.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.bundle.js',
    'https://cdn.jsdelivr.net/angular.chartjs/latest/angular-chart.min.js',

    // find other sources for tests
    'client/lib/angular-ui-grid/ui-grid.js',

    // our app code
    'client/app/**/*.js',

    // the spec files
    'specs/client/routesTest.js',
    'specs/client/SearchFactoryTests.js',
    'specs/client/exportControllerTests.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
     'client/**/*.js': ['babel'],
     'spec/client/*.js': ['babel']
   },
   babelPreprocessor: {
     options: {
       presets: ['es2015'],
       sourceMap: 'inline'
     },
   },

    browserify: {
     debug: true
   },

  // test results reporter to use
  reporters: ['nyan', 'mocha'],

  // start these browsers. PhantomJS will load up in the background
  browsers: ['PhantomJS'],

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: false,

  // if true, Karma exits after running the tests.
  singleRun: true
  });
};
