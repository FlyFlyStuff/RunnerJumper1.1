var gulp = require('gulp');
var typescript = require('gulp-typescript');

var tsProject = typescript.createProject('scripts/src/tsconfig.json');

gulp.task('phaser', function() {
    return gulp
        .src('node_modules/phaser/build/phaser.js')
        .pipe(gulp.dest('scripts/build/'));
});

gulp.task('compile-scripts', function() {
    return gulp
        .src('scripts/src/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest('scripts/build/'));
});


gulp.task('default', ['phaser', 'compile-scripts']);