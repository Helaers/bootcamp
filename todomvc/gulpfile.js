var gulp = require('gulp');

//dev
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//build
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var gulpif = require('gulp-if');

//build
gulp.task('build', ['sass', 'html']);


gulp.task('default', ['sass', 'browser-sync', 'watch']);

//auto insert bower components in html
gulp.task('bower', function () {
   gulp.src('./index.html')
     .pipe(wiredep())
     .pipe(gulp.dest('.'));
});

//sass
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
                .pipe(sass())
                .pipe(gulp.dest('./styles'))
                .pipe(browserSync.stream())
});

//browsersync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        ui: {
            port: 8080
        }
    });
});

//watch changes
gulp.task('watch', function() {
    gulp.watch("./sass/*.scss", ['sass']);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch("**/*.html").on('change', browserSync.reload);
});


//build
gulp.task('html', function () {
    var assets = useref.assets();
    return gulp.src('./*.html')
            .pipe(assets)
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', minify()))
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('./dist'));
});

