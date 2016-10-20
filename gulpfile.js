var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stripDebug = require('gulp-strip-debug');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .on('error', function(error) {
            console.error('' + error);
        })
})

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js')) // file for dev
        .pipe(rename('all.min.js')) // rename file
        .pipe(stripDebug()) // remove console.log alert etc..
        .pipe(uglify())
        .pipe(gulp.dest('dist/js')) // file for prod
})

gulp.task('style', function() {
    return gulp.src('app/sass/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass.sync().on('error', sass.logError)) // avoid break script if error sass
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss') // Gets all files ending with .scss in app/scss
        .pipe(sass.sync().on('error', sass.logError)) // avoid break script if error sass
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Launch hot relaod
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})

// Compress imgs
gulp.task('imagemin', function() {
    return gulp.src('app/src/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'))
})

gulp.task('dev', ['browserSync', 'sass', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
    // Other watchers
});

gulp.task('build', ['imagemin', 'style', 'scripts']);
