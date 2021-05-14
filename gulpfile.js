// basic
const gulp = require("gulp");
const { parallel, series } = require("gulp");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync").create();
const gulpif = require("gulp-if");
const minimist = require("minimist");

// pug
const pug = require("gulp-pug");
const htmlmin = require("gulp-htmlmin");
const htmlminConfig = require("./htmlmin.config");

// stylus
const stylus = require("gulp-stylus");
const autoprefixer = require("gulp-autoprefixer");

// js
const webpak = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config");

// config
const DEST_DIR = "./dist";

// init env
const options = minimist(process.argv.slice(2), {
  string: "env",
  default: { env: process.env.NODE_ENV || "development" },
});
isProduction = options.env === "production" ? true : false;
if (isProduction) {
}

const typescriptBuild = function (cb) {
  return webpackStream(webpackConfig, webpak)
    .on("error", function (e) {
      this.emit("end");
    })
    .pipe(gulp.dest(DEST_DIR));
};
exports.typescriptBuild = typescriptBuild;

const pugBuild = (cb) => {
  gulp
    .src(["./src/pug/[!_]*.pug"])
    .pipe(
      plumber({
        errorHandler: notify.onError("<%= error.message %>"),
      })
    )
    .pipe(pug({ pretty: !isProduction }))
    .pipe(gulpif(isProduction, htmlmin(htmlminConfig)))
    .pipe(gulp.dest(DEST_DIR))
    .on("end", cb);
};
exports.pugBuild = pugBuild;

const stylusBuild = (cb) => {
  gulp
    .src("./src/stylus/**/[!_]*.styl")
    .pipe(
      plumber({
        errorHandler: notify.onError("<%= error.message %>"),
      })
    )
    .pipe(stylus())
    .pipe(
      autoprefixer({
        overrideBrowserslist: "last 2 versions",
      })
    )
    .pipe(gulp.dest(`${DEST_DIR}`));
  cb();
};
exports.stylusBuild = stylusBuild;

const assetsCopy = (cb) => {
  gulp
    .src("./src/resources/**/*")
    .pipe(gulp.dest(`${DEST_DIR}/`))
    .on("end", cb);
};
exports.assetsCopy = assetsCopy;

const createServer = (cb) => {
  browserSync.init({
    server: {
      baseDir: DEST_DIR,
    },
  });
  cb();
};

const watch = () => {
  const reload = (cb) => {
    browserSync.reload();
    cb();
  };
  gulp.watch(
    "./src/**/*.pug",
    { ignoreInitial: true },
    series(pugBuild, reload)
  );
  gulp.watch(
    "./src/**/*.styl",
    { ignoreInitial: true },
    series(stylusBuild, reload)
  );
  gulp.watch(
    "./src/**/*.js",
    { ignoreInitial: true },
    series(typescriptBuild, reload)
  );
  gulp.watch("./src/**/*", series(assetsCopy, reload));
  gulp.watch("./dist/**/index.html", reload);
};
exports.watch = watch;

gulp.task("server", createServer);

exports.default = series(
  parallel(pugBuild, stylusBuild, typescriptBuild, assetsCopy),
  parallel(createServer, watch)
);

gulp.task(
  "build",
  parallel(pugBuild, stylusBuild, typescriptBuild, assetsCopy)
);
