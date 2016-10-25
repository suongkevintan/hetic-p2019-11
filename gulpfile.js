var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sync = require('browser-sync').create();

var processors = [
    autoprefixer
];


gulp.task('sync', ['scss'], function() {
    sync.init({
        server: "./"
    });

    gulp.watch('app/src/scss/**/*', ["scss"]);
});
gulp.task('default', ['sync'], function() {

});

gulp.task('scss', function() {
    gulp
        .src('app/src/scss/*')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/src/css'))
        .pipe(sync.stream());
});
