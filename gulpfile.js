const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const babelify = require('babelify');

// options is optional

const path = {
    js: 'js/main.js'
};

const dist = {
    js: './'
};

const watch = {
    js: ['js/*'],
};

const pathsToResolve = [
    './node_modules',
    './js'
];


gulp.task('browserify:dev', () => {
    browserify(path.js, {
        debug: true,
        extensions: ['.js'],
        paths: pathsToResolve
    })
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(dist.js));
});



gulp.task('watch', () => {
    gulp.watch(watch.js, ['browserify:dev']);
});




gulp.task('build:dev', ['browserify:dev']);
gulp.task('build', ['build:dev']);
gulp.task('default', ['build', 'watch']);
