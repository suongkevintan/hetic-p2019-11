var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var sync = require('browser-sync').create();
var gulp = require("gulp");
var babel = require("gulp-babel");

var processors = [
    autoprefixer
];

function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('sync', ['scss', 'es6'], function() {
    sync.init({
        server: "./"
    });
    gulp.watch('app/src/scss/**/*', ["scss"]);
    gulp.watch('app/src/scripts/**/*', ["es6"]);

});




gulp.task('default', ['sync'], function() {

});

gulp.task('scss', function() {
    gulp
        .src('app/src/scss/*')
        .pipe(sass().on('error', onError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/src/css'))
        .pipe(sync.stream());
});

gulp.task("es6", function() {

    gulp
        .src(["./app/src/scripts/*.js", "!./app/src/scripts/libs/"])
        .pipe(babel().on('error', onError))
        .pipe(gulp.dest("./dist/src/js"));
    gulp
        .src("./app/src/srcipts/libs/*.js")
        .pipe(gulp.dest("./dist/src/js"));
});
gulp.task("importModels", function() {

    return gulp
        .src("./app/src/models3D/*.obj")
        .pipe(gulp.dest("./dist/src/models3D"));

});
