var gulp = require('gulp');
var requireDir = require('require-dir');
// var connect = require('gulp-connect');
// var runSequence = require('run-sequence');
// var wiredep = require('wiredep').stream;
// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var minify = require('gulp-minify-css');
// var gulpif = require('gulp-if');

// gulp.task('default', ['sass', 'browser-sync', 'watch']);

//for production files
// gulp.task('build', ['sass', 'html']);

// gulp.task('html', function () {
//     var assets = useref.assets();
//     return gulp.src('./*.html')
//             .pipe(assets)
//             .pipe(gulpif('*.js', uglify()))
//             .pipe(gulpif('*.css', minify()))
//             .pipe(assets.restore())
//             .pipe(useref())
//             .pipe(gulp.dest('./dist'));
// });

// gulp.task('connect', function() {
//   connect.server({
//     livereload: true
//   });
// });


// gulp.task('watch', function() {
//   gulp.watch(['**/*.html'], ['browser-sync']);

//   gulp.watch(['**/*.scss'], function(){
//     runSequence('sass', 'browser-sync')
//   });

// });

// gulp.task('reload', function() {
//     return gulp.src('.')
//             .pipe(connect.reload());
// });


//auto insert bower components in html
// gulp.task('bower', function () {
//   gulp.src('./index.html')
//     .pipe(wiredep())
//     .pipe(gulp.dest('.'));
// });


// Specify paths & globbing patterns for tasks.
// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': './*.html',
  // JS sources.
  'js': './scripts/*.js',
  // SASS sources.
  'sass': './styles/*.scss',
  // Sources folder.
  'src': './src',
  // Compiled CSS folder.
  'css': './styles',
  // Distribution folder.
  'dist': './dist'
}

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });

// Default task; start local server & watch for changes.
gulp.task('default', ['sass', 'html', 'lint', 'browser-sync']);
//for production files
//gulp.task('build', ['sass', 'html']);





