const { server, reload } = require('gulp-connect');
const del = require('del');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');

const { parallel, series, watch, src, dest } = require('gulp');

function serve() {
    return server({
        root: './',
        livereload: true,
        port: 8000
    });
}

function startWatch() {
    watch('src/**/*.ts', ts);
    watch('src/index.html', html);
    watch('src/styles.css', styles);
}

function ts() {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(dest('dist'))
        .pipe(reload());
}

function styles() {
    return src('src/styles.css')
        .pipe(dest('dist'))
        .pipe(reload());
}

function html() {
    return src('src/index.html')
        .pipe(dest('./'))
        .pipe(reload());
}

function clean() {
    return del(['dist', 'index.html']);
}

exports.ts = ts;
exports.clean = clean;
exports.serve = serve;
exports.build = series(
    clean,
    parallel(ts, styles, html)
);
exports.default = series(
    clean,
    parallel(ts, styles, html),
    parallel(serve, startWatch)
);
