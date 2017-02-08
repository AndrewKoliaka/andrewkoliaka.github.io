const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const del = require('del');
const concat = require('gulp-concat');
const replace = require('gulp-html-replace');

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
});

gulp.task('watch', () => {
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('js', () => {
    gulp.src(['src/js/main.js', 'src/js/grid.js', 'src/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', () => {
    gulp.src('src/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', () => {
    gulp.src('src/index.html')
        .pipe(replace({
            'css': 'dist/styles.css',
            'js': 'dist/app.js'
        }))
        .pipe(gulp.dest('./'));
});
    
gulp.task('del', () => {
    del(['dist', 'index.html']);
});

gulp.task('default', ['serve', 'watch']);
gulp.task('build', ['js', 'css', 'html']);
