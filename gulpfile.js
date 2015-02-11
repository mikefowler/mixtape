'use strict';

// ----------------------------------------------------------------------------
// Dependencies
// ----------------------------------------------------------------------------

var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var reactify = require('reactify');
var es6ify = require('es6ify');
var livereload = require('gulp-livereload');

// ----------------------------------------------------------------------------
// Configuration
// ----------------------------------------------------------------------------

var dist = 'dist';

var lrPort = 35731;

var htmlFiles = 'app/**/*.html';
var htmlBuild = dist;

var jsBuild = dist + '/js';

var vendorFiles = [
  'node_modules/react/dist/react.js',
  'node_modules/es6ify/node_modules/traceur/bin/traceur-runtime.js'
];
var vendorBuild = jsBuild + '/vendor';

var requireFiles = './node_modules/react/dist/react.js';

// ----------------------------------------------------------------------------
// Vendor Assets
// ----------------------------------------------------------------------------

gulp.task('vendor', function() {
  return gulp
    .src(vendorFiles)
    .pipe(gulp.dest(vendorBuild))
});

// ----------------------------------------------------------------------------
// Application Assets
// ----------------------------------------------------------------------------

gulp.task('html', function() {
  return gulp
    .src(htmlFiles)
    .pipe(gulp.dest(htmlBuild));
});

function compileScripts(watch) {

  var entryFile = './app/assets/javascripts/application.jsx';
  es6ify.traceurOverrides = { experimental: true };

  var bundler = browserify(entryFile, {
    debug: true,
    extensions: ['.jsx']
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  // bundler.require(requireFiles);
  bundler.transform(reactify);
  bundler.transform(es6ify.configure(/.jsx/));

  var rebundle = function() {
    bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      // .pipe(buffer())
      // .pipe(sourcemaps.init({ loadMaps: true }))
      // .pipe(uglify())
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(jsBuild));
  }

  bundler.on('update', rebundle);
  return rebundle();
}

// ----------------------------------------------------------------------------
// Development Server
// ----------------------------------------------------------------------------

gulp.task('server', function() {
  connect.server({
    root: 'dist'
  });
});

// ----------------------------------------------------------------------------
// Tasks
// ----------------------------------------------------------------------------

gulp.task('default', ['vendor', 'server'], function() {

  livereload({
    port: lrPort,
    start: true
  });

  var reloadPage = function(evt) {
    livereload.changed(evt.path);
  }

  function initWatch(files, task) {
    if (typeof task === 'string') {
      gulp.start(task);
      gulp.watch(files, [task]);
    }
  }

  compileScripts(true);
  initWatch(htmlFiles, 'html');

  gulp.watch([dist + '/**/**'], reloadPage);

});