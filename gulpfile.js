var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ["src/*.html"],
    styles: ["src/*.css"]
};

var watchedBrowserify = watchify(
    browserify({
        basedir: ".",
        debug: true,
        entries: ["src/Game.ts"],
        cache: {},
        packageCache: {}
    }).plugin(tsify)
);

gulp.task("copy-html", function() {
    return gulp.src(paths.pages).pipe(gulp.dest("dist"));
});

gulp.task("copy-css", function() {
    return gulp.src(paths.styles).pipe(gulp.dest("dist"));
});

function bundle() {
    return watchedBrowserify
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", gulp.parallel("copy-html", "copy-css", bundle));
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
