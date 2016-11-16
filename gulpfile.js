var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var webpack = require('webpack-stream');
var stripDebug = require('gulp-strip-debug');
var rename = require('gulp-rename');
var browserSync = require('browser-sync');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var imagemin = require('gulp-imagemin');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('app/js/*.js').pipe(jshint()).pipe(jshint.reporter('default')).on('error', function(error) {
        console.error('' + error);
    })
});
gulp.task('webpack', function() {
    return gulp.src('./app/js/main.js').pipe(webpack(require('./webpack.config.js'))).pipe(gulp.dest('app/dist/js/'));
});
// Concatenate & Minify JS
gulp.task('scripts', function() {

    return gulp.src('app/js/**/*.js').pipe(babel({
            presets: ['es2015']
        })).pipe(concat('all.js')).pipe(gulp.dest('app/dist/js')). // file for dev
    pipe(rename('all.min.js')). // rename file
    pipe(stripDebug()). // remove console.log alert etc..
    pipe(uglify()).pipe(gulp.dest('app/dist/js')). // file for prod
    pipe(browserSync.reload({
        stream: true
    }))
});

// Compile our Handlebar
gulp.task('templates', function() {
    gulp.src('app/templates/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'MyApp.templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('app/dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('vendor', function() {
    return gulp.src('app/vendor/*.js').pipe(uglify()).pipe(gulp.dest('app/dist/vendor'))
});

gulp.task('style', function() {
    return gulp.src('app/sass/*.scss'). // Gets all files ending with .scss in app/scss
    pipe(sass.sync().on('error', sass.logError)). // avoid break script if error sass
    pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    })).pipe(cssnano()).pipe(gulp.dest('app/dist/css'))
});

gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss'). // Gets all files ending with .scss in app/scss
    pipe(sass.sync().on('error', sass.logError)). // avoid break script if error sass
    pipe(autoprefixer({
        browsers: ['last 4 versions'],
        cascade: false
    })).pipe(gulp.dest('app/dist/css')).pipe(browserSync.reload({
        stream: true
    }))
});

// Launch hot relaod
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
})

// Compress imgs
gulp.task('imagemin', function() {
     gulp.src('app/images/*').pipe(imagemin({progressive: true})).pipe(gulp.dest('app/dist/images'))
     gulp.src('app/images/chap1/*').pipe(imagemin({progressive: true})).pipe(gulp.dest('app/dist/images/chap1'))
     gulp.src('app/images/chap2/*').pipe(gulp.dest('app/dist/images/chap2'))
     gulp.src('app/images/chap3/*').pipe(imagemin({progressive: true})).pipe(gulp.dest('app/dist/images/chap3'))
     gulp.src('app/images/chap4/*').pipe(imagemin({progressive: true})).pipe(gulp.dest('app/dist/images/chap4'))
})

gulp.task("importModels", function() {

    return gulp.src("./app/src/models3D/*.obj").pipe(gulp.dest("./app/dist/models3D"));

});

gulp.task('build', [
    'importModels', 'templates', 'imagemin', 'style', 'scripts', 'vendor','importFonts'
], function() {
    var path = require('path');
    var root = path.resolve(__dirname);
    return gulp.src('./app/js/main.js').pipe(webpack({

        context: __dirname,
        node: {
            __filename: true
        },
        watch: false,
        entry: {
            app: ["./app/js/main.js"]
        },
        output: {
            path: path.resolve(__dirname, "./app/dist/js"),
            filename: "bundle.js"
        },
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /(nodes_modules|bower_components)/,
                include: root,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }]

        }

    })).pipe(gulp.dest('app/dist/js/'));
});

gulp.task('dev', [
    'browserSync', 'sass', 'lint'
], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', ['scripts', 'webpack']);
    gulp.watch('app/templates/*.hbs', ['templates'])
    // Other watchers
});

gulp.task("importFonts", function() {
  return gulp
  .src("./app/fonts/*")
  .pipe(gulp.dest("./app/dist/fonts/"));
});
