var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded',
        sourceComments: 'map'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'serve']);
