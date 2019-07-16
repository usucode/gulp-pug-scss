const gulp = require("gulp")
const babel = require("gulp-babel")
const sass = require("gulp-sass")
const pug = require("gulp-pug")
const plumber = require("gulp-plumber") // エラー時の強制終了を防止
const notify = require("gulp-notify") // エラー発生時にデスクトップ通知する
const browserSync = require("browser-sync").create()

var paths = {
  styles: "./src/scss/**/*.scss",
  _styles: "!./src/scss/**/_*.scss",
  views: "./src/views/**/*.pug",
  _views: "!./src/views/**/_*.pug",
  js: "./src/js/**/*.js",
  asset: "./src/assets/**/*",
}

// Asset
function asset() {
  return gulp.src(paths.asset).pipe(gulp.dest("dist"))
}

// Styles
function styles() {
  return gulp
    .src([paths.styles, paths._styles])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Sass Error!", // 任意のタイトルを表示させる
          message: "<%= error.message %>", // エラー内容を表示させる
        }),
      })
    )
    .pipe(
      sass({
        outputStyle: "compressed",
        // outputStyle: 'expanded'
      })
    )
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream())
}

// Views
function views() {
  return gulp
    .src([paths.views, paths._views])
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: "Pug Error!", // 任意のタイトルを表示させる
          message: "<%= error.message %>", // エラー内容を表示させる
        }),
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("./dist/"))
    .pipe(browserSync.stream())
}

// JavaScript
function js() {
  return gulp
    .src([paths.js])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("./dist/js/"))
    .pipe(browserSync.stream())
}

// Watch
function watch() {
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  })
  gulp.watch(paths.styles, styles)
  gulp.watch(paths.views, views)
  gulp.watch(paths.js, js)
  gulp.watch(paths.asset, asset)
}

gulp.task(
  "default",
  gulp.series(gulp.parallel(styles, views, js, asset, watch))
)
gulp.task("build", gulp.series(gulp.parallel(styles, views, js, asset)))
