var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var watchify = require("watchify");
var tsify = require("tsify");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var gutil = require("gulp-util");
var obfuscate = require("gulp-javascript-obfuscator");
var paths = {
    pages: ["src/*.html"],
    styles: ["src/*.css"],
    assets: ["src/assets/**/*"],
    other: [
        "src/*.png",
        "src/*.xml",
        "src/*.ico",
        "src/*.svg",
        "src/*.webmanifest"
    ]
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
        .pipe(uglify())
        .pipe(
            obfuscate({
                selfDefending: true
            })
        )
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

gulp.task("copy-other", () => gulp.src(paths.other).pipe(gulp.dest("dist")));

gulp.task(
    "copy-all",
    gulp.parallel("copy-html", "copy-css", "copy-assets", "copy-other")
);

gulp.task(
    "default",
    gulp.parallel("copy-all", "bundle")
);

gulp.task(
    "watch",
    gulp.parallel("copy-all", watchedBundle)
);

var watchedBrowserify = watchify(browserified());
watchedBrowserify.on("update", watchedBundle);
watchedBrowserify.on("log", gutil.log);
