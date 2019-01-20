var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var paths = {
    pages: ["src/*.html"],
    styles: ["src/*.css"],
    assets: ["src/assets/**/*"]
};

browserified = () =>
    browserify({
        basedir: ".",
        debug: true,
        entries: ["src/Game.ts"],
        cache: {},
        packageCache: {}
    }).plugin(tsify);

bundledUglified = x =>
    x
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));

quickBundled = x =>
    x
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("dist"));

watchedBundle = () => {
    quickBundled(watchedBrowserify);
};

gulp.task("bundle", () => bundledUglified(browserified()));

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
