/**
 * Command list
 *  clean               - cleans out build
 *  clean-server        - cleans out build/server/public
 *  clean-test          - cleans out test/build
 *  set-prod            - sets a production environment
 *
 *  compile-html        - moves the html files to the server
 *  watch-html          - updates on change
 *  minify-html         - remove white spacing
 *  compile-img         - moves the images in the img directory
 *  compile-scss        - compiles scss into css
 *  watch-scss          - auto updates on changes
 *  minify-scss         - minifies the css
 *  compile-ts          - compiles typescript into javascript
 *  watch-ts            - watches for changes and auto updates
 *  minify-ts           - minify the compiled javascript
 *
 *  compile-server      - compiles the mock server
 *  move-server-static  - moves static server files
 *  nodemon             - runs an autoupdating mock server
 *  lint-ts             - typescript linter for the src directory
 *  test                - executes any tests
 *  compile-docs        - compiles documents using the comments
 *
 *  compile             - compile the html, img, scss, ts, and server
 *  watch               - watches for changes in html, scss, and ts
 *  minify              - minifies the html, scss, and ts builds
 *  default             - defaults to gulp watch
 */

// Some of these packages are commented out for lazy importing

let argv = require("yargs").argv;
// let babelify = require("babelify");
// let browserify = require("browserify");
// let buffer = require("vinyl-buffer");
// let cleanCSS = require("gulp-clean-css");
// let decache = require("decache");
// let fs = require("fs-extra");
let gulp = require("gulp");
var gutil = require("gulp-util");
// let htmlmin = require("gulp-htmlmin");
// let nodemon = require("gulp-nodemon");
// let react = require("react");
// let reactDOMServer = require("react-dom/server");
// let rimraf = require("rimraf");
// let sass = require("gulp-sass");
// let source = require("vinyl-source");
// let sourcemaps = require("gulp-sourcemaps");
// let tap = require("gulp-tap");
// let ts = require("gulp-typescript");
// let tsify = require("tsify");
// let tslint = require("gulp-tslint");
// let uglify = require("gulp-uglify");
// let watchify = require("watchify");

let config = {
  client: {
    html: {
      src: argv.htmlSrc || "./src/client/html/**/*",
      out: argv.htmlOut || "./build/server/public",
    },
    img: {
      src: argv.imgSrc || "./src/client/img/**/*",
      out: argv.imgOut || "./build/server/public/img",
    },
    scss: {
      src: argv.scssSrc || "./src/client/scss/*.scss",
      out: argv.scssOut || "./build/server/public/stylesheets",
    },
    ts: {
      src: argv.tsSrc || "./src/client/ts/*/*.tsx",
      out: argv.tsOut || "./build/server/public/javascripts",
      build: argv.tsBuild || "./build",
    },
  },
  server: {
    ts: {
      src: argv.serverSrc || "./src/server/**/*.ts",
      out: argv.serverOut || "./build/server",
    },
    static: {
      src: argv.staticSrc || "./src/server/static/**/*",
      out: argv.staticOut || "./build/server/public/",
    },
  },
  test: {
    src: argv.testSrc || "./test/src/**/*.ts",
    out: argv.testOut || "./test/build",
    startPath: argv.testMain || "./test/build/main.js",
  },
  lint: argv.lintPath || [
    "./test/src/**/*.ts",
    "./src/**/*.{ts,tsx}",
  ],
};

/**
 * Helper functions
 */
function importTypescriptLib () {
  return {
    babelify: require("babelify"),
    browserify: require("browserify"),
    buffer: require("vinyl-buffer"),
    es: require("event-stream"),
    glob: require("glob"),
    path: require("path"),
    source: require("vinyl-source-stream"),
    sourcemaps: require("gulp-sourcemaps"),
    tap: require("gulp-tap"),
    ts: require("gulp-typescript"),
    tsify: require("tsify"),
    watchify: require("watchify"),
  };
}

// Clean out the build directory and the compiled tests
gulp.task("clean", function(done) {
  let rimraf = require("rimraf");
  rimraf("./build/*", function(e) {
    if (e) {
      gutil.log(gutil.colors.red(e.toString()));
      done();
    } else {
      rimraf("./test/build/*", function(err) {
        if (err) {
          gutil.log(gutil.colors.red(e.toString()));
        }
        done();
      });
    }
  });
});

// Clean out the server's static files
gulp.task("clean-server", function(done) {
  let rimraf = require("rimraf");
  rimraf("./build/server/public/*", function(e) {
    if (e) gutil.log(gutil.colors.red(e.toString()));
    done();
  });
});

// Clean out the compiled test directory
gulp.task("clean-test", function(done) {
  let rimraf = require("rimraf");
  rimraf("./test/build/*", function(e) {
    if (e) gutil.log(gutil.colors.red(e.toString()));
    done();
  });
});

// Sets a production environment
gulp.task("set-prod", function() {
  process.env.NODE_ENV = "production";
});

// Compile the html files
gulp.task("compile-html", function(done) {
  return gulp.src(config.client.html.src)
    .pipe(gulp.dest(config.client.html.out))
});

// Watch for html changes and automatically recompile
gulp.task("watch-html", ["compile-html"], function() {
  return gulp.watch(config.client.html.src, function() {
    return gulp.start("compile-html");
  });
});

// Minify the html files
gulp.task("minify-html", function() {
  let htmlmin = require("gulp-htmlmin");
  return gulp.src(config.client.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.client.html.out))
});

// Compile/move images to the server
gulp.task("compile-img", function() {
  return gulp.src(config.client.img.src)
    .pipe(gulp.dest(config.client.img.out))
});

// Compile the scss files
gulp.task("compile-scss", function(done) {
  let sass = require("gulp-sass");
  try {
    gulp.src(config.client.scss.src)
      .pipe(sass())
      .on("error", function(e) {
        gutil.log(gutil.colors.red(e));
        this.emit("end");
      })
      .pipe(gulp.dest(config.client.scss.out))
      .on("end", function() {
        done();
      });
  } catch (e) {
    gutil.log(gutil.colors.red(e));
    done();
  }
});

// Watch for scss file changes and auto compile
gulp.task("watch-scss", ["compile-scss"], function() {
  return gulp.watch(config.client.scss.src, function() {
    return gulp.start("compile-scss");
  });
});

// Minify the scss
gulp.task("minify-scss", function() {
  let cleanCSS = require("gulp-clean-css");
  let sass = require("gulp-sass");
  return gulp.src(config.client.scss.src)
    .pipe(sass())
    .pipe(cleanCSS({compatibility: "ie8"}))
    .pipe(gulp.dest(config.client.scss.out));
});

// Compile the typescript
gulp.task("compile-ts", function(done) {
  gutil.log("Preparing to bundle...");
  let ts = importTypescriptLib();
  let task = ["compile-ts"];
  let cyan = gutil.colors.cyan;
  let magenta = gutil.colors.magenta;
  return ts.glob(config.client.ts.src, function(err, files) {
    if (err) {
      done(err);
    }
    let tasks = files.map(function(entry) {
      let relativePath = ts.path.relative(entry + "/..", entry);
      let endFile = relativePath.replace(/(.tsx$|.ts$)/, ".js");
      gutil.log(cyan(task), "Bundling", relativePath);
      let startTime = new Date().getTime();
      return ts.browserify({
        entries: [entry],
        debug: true,
        cache: {},
        packageCache: {},
      })
      .plugin(ts.tsify)
      .transform(ts.babelify.configure({
        compact: false,
        presets: ["es2015"]
      }))
      .bundle()
      .on("error", function(e) {
        gutil.log(gutil.colors.red(e));
        this.emit("end");
      })
      .pipe(ts.source(endFile))
      .pipe(ts.buffer())
      .pipe(ts.sourcemaps.init({loadMaps: true}))
      .pipe(ts.sourcemaps.write("./"))
      .pipe(gulp.dest(config.client.ts.out))
      .on("end", function() {
        let time = new Date().getTime() - startTime;
        gutil.log(cyan(task), "Finished bundling", endFile, "after", magenta(time + "ms"));
      });
    });
    ts.es.merge(tasks).on("end", done);
  });
});

// Watch for typescript changes and auto compile
gulp.task("watch-ts", function(done) {
  let ts = importTypescriptLib();
  let task = ["watch-ts"]
  let count = 0;
  let counts = [];
  let cyan = gutil.colors.cyan;
  let magenta = gutil.colors.magenta;

  return ts.glob(config.client.ts.src, function(err, files) {
    if (err) {
      done(err);
    }
    let tasks = files.map(function(entry) {
      let relativePath = ts.path.relative(entry + "/..", entry);
      let endFile = relativePath.replace(/(.tsx$|.ts$)/, ".js");
      let b = ts.browserify({
        entries: [entry],
        debug: true,
        cache: {},
        packageCache: {},
      })
        .plugin(ts.watchify)
        .plugin(ts.tsify)
        .transform(ts.babelify.configure({
          compact: false,
          presets: ["es2015"]
        }));

      let bundle = function() {
        gutil.log(cyan(task), "Starting bundling", magenta("#" + count), relativePath);
        counts.push(count++);
        let startTime = new Date().getTime();
        return b.bundle()
          .on("error", function(e) {
            gutil.log(gutil.colors.red(e));
            this.emit("end");
          })
          .pipe(ts.source(endFile))
          .pipe(ts.buffer())
          .pipe(ts.sourcemaps.init({loadMaps: true}))
          .pipe(ts.sourcemaps.write("./"))
          .pipe(gulp.dest(config.client.ts.out))
          .on("end", function() {
            let time = new Date().getTime() - startTime;
            gutil.log(cyan(task), "Finished bundling", magenta("#" + counts.shift()), "after", magenta(time + "ms"), relativePath);
          });
      };
      b.on("update", bundle);
      return bundle();
    });
    ts.es.merge(tasks).on("end", done);
  });
});

// Minify the typescript
gulp.task("minify-ts", ["set-prod"], function(done) {
  gutil.log("Preparing to bundle...");
  let ts = importTypescriptLib();
  let uglify = require("gulp-uglify");
  let task = ["minify-ts"];
  let cyan = gutil.colors.cyan;
  let magenta = gutil.colors.magenta;
  return ts.glob(config.client.ts.src, function(err, files) {
    if (err) {
      done(err);
    }
    let tasks = files.map(function(entry) {
      let relativePath = ts.path.relative(entry + "/..", entry);
      let endFile = relativePath.replace(/(.tsx$|.ts$)/, ".js");
      gutil.log(cyan(task), "Bundling", relativePath);
      let startTime = new Date().getTime();
      return ts.browserify({
        entries: [entry],
        debug: true,
        cache: {},
        packageCache: {},
      })
      .plugin(ts.tsify)
      .transform(ts.babelify.configure({
        compact: false,
        presets: ["es2015"]
      }))
      .bundle()
      .on("error", function(e) {
        gutil.log(gutil.colors.red(e));
        this.emit("end");
      })
      .pipe(ts.source(endFile))
      .pipe(ts.buffer())
      .pipe(ts.sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .pipe(ts.sourcemaps.write("./"))
      .pipe(gulp.dest(config.client.ts.out))
      .on("end", function() {
        let time = new Date().getTime() - startTime;
        gutil.log(cyan(task), "Finished bundling", endFile, "after", magenta(time + "ms"));
      });
    });
    ts.es.merge(tasks).on("end", done);
  });
});

// Compile the server code
gulp.task("compile-server", function() {
  let sourcemaps = require("gulp-sourcemaps");
  let ts = require("gulp-typescript");
  let tsProject = ts.createProject("tsconfig.json");
  return gulp.src(config.server.ts.src)
    .pipe(tsProject())
    .pipe(gulp.dest(config.server.ts.out));
});

gulp.task("move-server-static", function() {
  return gulp.src(config.server.static.src)
    .pipe(gulp.dest(config.server.static.out));
});

// Runs the built nodemon server
gulp.task("nodemon", function() {
  let nodemon = require("gulp-nodemon");
  return nodemon({
    script: "build/server/bin/www",
    tasks: [],
    ext: "html js css",
    env: { NODE_ENV: "development" },
    watch: [
      "build/server/**/*",
    ],
    ignore: [
      "build/server/public",
    ],
  });
});

// Run a typescript linter
gulp.task("lint-ts", function() {
  let tslint = require("gulp-tslint");
  return gulp.src(config.lint)
    .pipe(tslint({
      formatter: "verbose",
    }))
    .pipe(tslint.report({
      emitError: false,
      summarizeFailureOutput: true,
    }));
});

// Execute tests
gulp.task("test", function() {

});

// Compile docs
gulp.task("compile-docs", function() {
  let typedoc = require("gulp-typedoc");
  return gulp.src(config.client.ts.src)
    .pipe(typedoc({
      // TypeScript options
      module: "commonjs",
      target: "es5",
      includeDeclarations: false,

      // Output options
      out: "./docs",

      // TypeDoc options
      name: "web-client",
      ignoreCompilerErrors: false,
      version: true,
    }));
});

gulp.task("test", ["set-prod"], function() {
  return gulp.start("compile-server");
});

// Build tasks
gulp.task("compile", ["compile-server", "compile-html", "compile-img", "compile-scss", "compile-ts"]);

gulp.task("watch", ["compile-img", "watch-html", "watch-scss", "watch-ts"], function() {
  return gulp.start("nodemon");
});

gulp.task("minify", ["minify-html", "compile-img", "minify-scss", "minify-ts"]);
