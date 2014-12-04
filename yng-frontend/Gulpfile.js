var gulp = require('gulp');
var mocha = require('gulp-mocha');
var webpack = require('gulp-webpack');
var jshint = require('gulp-jshint');

var package = require('./package.json');


gulp.task('lint', function() {
  return gulp.src([
      'Gulpfile.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function (){
    return gulp.src('./test/*_test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

