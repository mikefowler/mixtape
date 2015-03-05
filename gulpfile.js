'use strict';

// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

var browserify = require('browserify');
var gulp = require('gulp');
var util = require('gulp-util');
var nodemon = require('gulp-nodemon');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var babelify = require('babelify');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var path = require('path');
var notify = require('gulp-notify');

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

var dist = 'dist';

var lrPort = 35729;

var htmlFiles = './app/**/*.html';
var htmlBuild = dist;

var cssFiles = './app/assets/stylesheets/**/*.scss';
var cssBuild = dist + '/css';

var jsBuild = dist + '/js';

var vendorFiles = [
  'node_modules/react/dist/react.js',
  'node_modules/react-router/modules/index.js'
];
var vendorBuild = jsBuild + '/vendor';

var requireFiles = [
  './node_modules/react/dist/react.js',
  './node_modules/react-router/modules/index.js'
];

// ----------------------------------------------------------------------------
// Vendor Assets
// ----------------------------------------------------------------------------

gulp.task('vendor', function() {
  return gulp
    .src(vendorFiles)
    .pipe(gulp.dest(vendorBuild));
});

// ----------------------------------------------------------------------------
// Application Assets
// ----------------------------------------------------------------------------

gulp.task('html', function() {
  return gulp
    .src(htmlFiles)
    .pipe(gulp.dest(htmlBuild))
    .pipe(livereload());
});

gulp.task('css', function() {
  gulp.src(cssFiles)
      .pipe(sass({
        includePaths: [
          './node_modules/'
        ]
      }))
      .pipe(gulp.dest(cssBuild))
      .pipe(livereload());
});

function compileScripts(watch) {

  var entryFile = './app/assets/javascripts/application.jsx';

  var bundler = browserify(entryFile, {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.jsx']
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler.transform(babelify);

  function handleErrors(err) {
    console.log(err.message);
    var args = Array.prototype.slice.call(arguments);
    var fileInfo = null;

    if (err.filename) {
      fileInfo = path.relative(__dirname, err.filename) + ':' + err.lineNumber;
    }

    notify.onError({
      title: 'Compile Error',
      message: fileInfo
    }).apply(this, args);
  }

  var rebundle = function() {
    bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsBuild))
      .pipe(livereload());
  }

  bundler.on('update', rebundle);
  bundler.on('log', function(msg) {
    util.log(util.colors.yellow('[Browserify] ', msg));
  });

  return rebundle();
}

gulp.task('watch', function() {

  livereload.listen({
    port: lrPort
  });

  compileScripts(true);

  gulp.start('html');
  gulp.start('css');

  gulp.watch(htmlFiles, ['html']);
  gulp.watch(cssFiles, ['css']);

});

// ----------------------------------------------------------------------------
// Development Server
// ----------------------------------------------------------------------------

gulp.task('server', function() {

  nodemon({
    script: 'server.js',
    ext: 'js',
    ignore: ['app/', 'dist/']
  }).on('restart', function() {
    console.log('Server restarted…');
  });

});

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

gulp.task('default', ['vendor', 'server', 'watch']);