/*jshint esversion: 6 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const livereload = require('gulp-livereload');

livereload({ start: true });

/* Task to copy pages from the src folder into match dist folders */
gulp.task('copyPages', function() {
  return gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./dist'))
  .pipe(livereload());
});

/* Copy media files */
gulp.task('copyMedia', function() {
  return gulp.src('./src/media/**.*')
  .pipe(gulp.dest('./dist/media'));
});

/* Runs sass on a file and passes the resulting file into the css folder */
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

/* Minifies css, autoprefixes, and copies into the dist styles folder */
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/styles'));
});

/* Watches for changes and runs tasks accordingly */
gulp.task('watch', ['minify-css'], function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/css/**/*.css', ['minify-css']);
  gulp.watch('./src/**/*.html', ['copyPages']);
  livereload.listen();
});

/* Runs all tasks and watches for changes */
gulp.task('default', ['copyPages', 'sass', 'minify-css', 'copyMedia', 'watch']);
