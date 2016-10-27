// Karma configuration
// Generated on Wed Oct 26 2016 15:09:52 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
    // angular source
    'client/lib/angular/angular.js',
    'client/lib/angular-route/angular-route.js',
    'client/lib/angular-mocks/angular-mocks.js',

    // find other sources for tests
    'client/lib/chart.js/src/chart.js',

    // our app code
    'client/app/**/*.js',

    // the spec files
    'specs/client/routesTest.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    reporters: ['nyan', 'unicorn'],

    // start these browsers. PhantomJS will load up in the background
    browsers: ['PhantomJS'],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // if true, Karma exits after running the tests.
    singleRun: true
  });
};
