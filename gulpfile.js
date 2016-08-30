var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    del = require('del');

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('app/src/*.js').on('change', browserSync.reload);
});

gulp.task('build', function() {
    return gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('del', function() {
    del(['dist']);
});

gulp.task('default', ['serve', 'watch']);
