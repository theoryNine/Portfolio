var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

var minify = require('gulp-minify');

gulp.task('copyPages', function() {
  gulp.src('./src/**/*.html')
  .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('watch', ['minify-css'], function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  gulp.watch('./src/css/**/*.css', ['minify-css']);
  gulp.watch('./src/**/*.html', ['copyPages']);
});

gulp.task('default', ['copyPages', 'sass', 'minify-css', 'watch']);
