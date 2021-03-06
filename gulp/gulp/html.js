var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');
var useref = require('gulp-useref');


gulp.task('html', function() {
    var assets = useref.assets();

    return gulp.src('./*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('./dist'));
});
