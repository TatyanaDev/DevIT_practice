const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const htmlreplace = require("gulp-html-replace");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const gulp = require("gulp");

gulp.task("build-html", () =>
  gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      htmlreplace({
        css: "./assets/css/style.min.css",
        js: "./assets/js/bundle.min.js",
      })
    )
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.stream())
);

gulp.task("build-css", () =>
  gulp
    .src("src/assets/css/*.css")
    .pipe(concat("style.min.css"))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest("build/assets/css/"))
    .pipe(browserSync.stream())
);

gulp.task("build-js", () =>
  gulp
    .src("src/assets/js/*.js")
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/assets/js/"))
    .pipe(browserSync.stream())
);

gulp.task("browserSync", () => {
  browserSync.init({
    server: "build/",
  });

  gulp.watch("src/*.html", gulp.series("build-html"));
  gulp.watch("src/assets/css/*.css", gulp.series("build-css"));
  gulp.watch("src/assets/js/*.js", gulp.series("build-js"));
});

gulp.task(
  "default",
  gulp.series("build-html", "build-css", "build-js", "browserSync")
);
