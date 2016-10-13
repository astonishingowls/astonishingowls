var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');

// The paths to our app files
var paths = {
  src: {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html'],
    styles: ['client/styles/style.css']
  },
  compiled: {
    scripts: ['compiled/app/**/*.js'],
    html: ['compiled/app/**/*.html', 'compiled/index.html'],
    styles: ['compiled/styles/style.css']
  },
  server: 'server/server.js'
};


/***************************************
 *                ES5
 ***************************************/
// Start our node server using nodemon
gulp.task('serve', function () {
  nodemon({
    script: paths.server,
    ignore: 'node_modules/**/*.js'
  });
});

// Any changes made to your client side code will
// automagically refresh your page with the new changes
gulp.task('start', ['serve'], function () {
  browserSync.init({
    notify: true,
    injectChanges: true,
    files: paths.src.scripts.concat(paths.src.html, paths.src.style),
    proxy: 'localhost:8000'
  });
});


/***************************************
 *                Gulp-Sass
 ***************************************/
gulp.task('styles', function() {
    gulp.src('./client/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError)) /**if there is an error parsing your sass by default it will just kill the gulp process, but with this option it will tell us where the error is**/
        .pipe(gulp.dest('./client/css/'));
});

//Watch task, it will sit and wait for files to be saved and then run our task
gulp.task('default',function() {
    gulp.watch('.client/sass/**/*.scss',['styles']);
});



/***************************************
 *                ES6
 ***************************************/

// Remove previously transpiled code
gulp.task('clean', function() {
  return gulp.src(paths.compiled.scripts)
  .pipe(clean({read: false}));
});

// Transpile our client scripts
gulp.task('babel', ['clean'], function() {
  return gulp.src('client/**/*')
    .pipe(babel({
      presets: ['es2015'],
      only: paths.src.scripts
    }))
    .pipe(gulp.dest('compiled'));
});

// Start a babel-node server using nodemon
gulp.task('serve:es6', ['babel'], function () {
  nodemon({
    exec: 'babel-node --presets es2015',
    script: paths.server,
    ignore: 'node_modules/**/*.js'
  });
});


// Any changes made to your client side code will still
// automagically refresh your page with the new changes,
// after transpiling again with babel
gulp.task('start:es6', ['serve:es6'], function () {
  browserSync.init({
    notify: true,
    injectChanges: true,
    files: paths.compiled.scripts.concat(paths.compiled.html, paths.compiled.style),
    proxy: 'localhost:8000'
  });

  gulp.watch(paths.scripts, ['babel']);
});
