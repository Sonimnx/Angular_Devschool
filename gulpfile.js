/**
 * Created by Vali on 11/12/2016.
 */
var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    gulpinject = require('gulp-inject'),
    jshint = require('gulp-jshint'),
    serverLivereload = require('gulp-server-livereload'),
    angularFilesort = require('gulp-angular-filesort');

gulp.task("analyze", function () {
    gulp.src("src/app/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task("insert", function () {
    var bootstrapThemeSrc = gulp.src("src/vendor/bootstrap-css/css/bootstrap-theme.css");
    var jscripts = gulp.src("src/app/**/*.js")
        .pipe(angularFilesort());

    return gulp.src("src/index.html")
        .pipe(wiredep({exclude: /\/bootstrap-css\/.*\.js$/}))
        .pipe(gulpinject(bootstrapThemeSrc, {relative: true}))
        .pipe(gulpinject(jscripts, {relative: true}))
        .pipe(gulp.dest("src"));
});

gulp.task("serve",["analyze","insert"], function () {
    gulp.src('src')
        .pipe(serverLivereload({
            livereload: true,
            open: true
        }));
});