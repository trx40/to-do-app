let gulp = require('gulp'),
    babel = require('gulp-babel'),
    connect = require('gulp-connect');

gulp.task('default', function () {
    return gulp.src('src/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('./js'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', gulp.series('default'));
});

// Now any time you are working on your project open a new
// terminal window and run gulp watch from the project's root directory.
// This will ensure that your JavaScript gets transpiled and
// updated every time you make a change to your /src/ajax.js file
// (which is the file you will be making any future edits to).
// To transpile your JavaScript manually, simply use the command
// line to run gulp from the root directory of your project.