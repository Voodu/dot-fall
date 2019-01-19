var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");
var paths = {
    pages: ["src/*.html"],
    styles: ["src/*.css"],
    assets: ["src/assets/**/*"]
};

browserified = () => browserify({
    basedir: ".",
    debug: true,
    entries: ["src/Game.ts"],
    cache: {},
    packageCache: {}
}).plugin(tsify);

bundled = x =>
    x
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));

watchedBundle = () => {
    bundled(watchedBrowserify);
};

gulp.task("bundle", () => bundled(browserified()));

gulp.task("copy-html", () => gulp.src(paths.pages).pipe(gulp.dest("dist")));

gulp.task("copy-css", () => gulp.src(paths.styles).pipe(gulp.dest("dist")));

gulp.task("copy-assets", () =>
    gulp.src(paths.assets).pipe(gulp.dest("dist/assets"))
);

gulp.task(
    "default",
    gulp.parallel("copy-html", "copy-css", "copy-assets", "bundle")
);

gulp.task(
    "watch",
    gulp.parallel("copy-html", "copy-css", "copy-assets", watchedBundle)
);

var watchedBrowserify = watchify(browserified());
watchedBrowserify.on("update", watchedBundle);
watchedBrowserify.on("log", gutil.log);
