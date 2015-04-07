var browserify = require('browserify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var protractor = require("gulp-protractor").protractor;
var bundler = watchify(browserify(watchify.args));

bundler.add('./index.js');

bundler.on('update', bundle);
bundler.on('log', gutil.log);

function bundle() {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Bundle Error'))
    .pipe(source('hyper-validator-float.js'))
    .pipe(gulp.dest('./dist'));
}

gulp.task('protractor-test', function() {
  gulp.src(["./spec/directives/*.js"])
    .pipe(protractor({
      configFile: "./protractor.config.js",
      args: ['--baseUrl', 'http://localhost:4000']
    })).on('error', function(e) { throw e });
});

gulp.task('build', bundle);

gulp.task('default', ['build']);
