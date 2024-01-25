let gulp = require("gulp"),
  browserSync = require("browser-sync").create(),
  prefixer = require("gulp-autoprefixer"),
  cssmin = require("gulp-clean-css"),
  uglify = require("gulp-uglify"),
  fileinclude = require("gulp-file-include"),
  gcmq = require("gulp-group-css-media-queries");
concat = require("gulp-concat");

gulp.task("html_build", function (done) {
  return gulp
    .src("src/*.html")
    .pipe(fileinclude())
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream());
  done();
});

gulp.task("css_build", function (done) {
  return gulp
    .src("src/css/*.css")
    .pipe(concat("style.min.css"))
    .pipe(prefixer())
    .pipe(gcmq())
    .pipe(cssmin())
    .pipe(gulp.dest("build/css/"))
    .pipe(browserSync.stream());
  done();
});

gulp.task("js_build", function (done) {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("bundle.min.js"))
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(gulp.dest("build/js/"))
    .pipe(browserSync.stream());
  done();
});

gulp.task("webServer", function (done) {
  browserSync.init({
    server: "build/",
  });
  gulp.watch("src/**/*.html", gulp.series("html_build"));
  gulp.watch("src/**/*.css", gulp.series("css_build"));
  gulp.watch("src/**/*.js", gulp.series("js_build"));
  done();
});

gulp.task(
  "default",
  gulp.series("html_build", "css_build", "js_build", "webServer")
);
