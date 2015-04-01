var gulp = require('gulp');
var karma = require('gulp-karma');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');

var sources = [
  'source/**/*.ts'
];
var testFiles = []; // Declared in the karma.conf.js
var distDirectory = 'dist';

/**
 * Main task: cleans, builds, run tests, and bundles up for distribution.
 */
gulp.task('all', function(callback) {
  runSequence(
    'clean',
    'build',
    'test',
    callback);
});

gulp.task('build', function(callback) {
  runSequence(
    'compile',
    'uglify',
    'umdify',
    //'map',
    callback);
});

gulp.task('compile', function() {
  return buildHelper(sources, distDirectory , 'forms-js-angular-1x.js');
});

gulp.task('clean', function() {
  var clean = require('gulp-clean');

  return gulp.src(distDirectory ).pipe(clean());
});

gulp.task('map', function() {
  var shell = require('gulp-shell');

  console.log('CWD: ' + process.cwd() + '/dist');

  return shell.task(
    'uglifyjs --compress --mangle --source-map forms-js-angular-1x.min.js.map --source-map-root . -o forms-js-angular-1x.min.js -- forms-js-angular-1x.js',
    {cwd: process.cwd() + '/dist'}
  )();
});


gulp.task('test', function(callback) {
  runSequence(
    ['test:integration', 'test:unit'],
    callback);
});
gulp.task('test:integration', function() {
  var angularProtractor = require('gulp-angular-protractor');

  gulp.src(testFiles)
    .pipe(angularProtractor({
      configFile: 'protractor.conf.js',
      args: [
        '--baseUrl', 'http://127.0.0.1:8000/examples/'
      ],
      autoStartStopServer: true,
      //debug: true
    }))
    .on('error', function(e) { throw e })
});
gulp.task('test:unit', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(error) {
      // Make sure failed tests cause gulp to exit non-zero
      throw error;
    });
});

gulp.task('test:watch', function() {
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch'
    }));
});

gulp.task('compile:watch', function() {
  return gulp.watch(sources, ['compile']);
});


gulp.task('build:watch', function() {
  return gulp.watch(sources, ['build']);
});


gulp.task('uglify', function() {
  var fs = require('fs');
  var uglifyJs = require('uglify-js2');

  var code = fs.readFileSync('dist/forms-js-angular-1x.js', 'utf8');

  var parsed = uglifyJs.parse(code);
  parsed.figure_out_scope();

  var compressed = parsed.transform(uglifyJs.Compressor());
  compressed.figure_out_scope();
  compressed.compute_char_frequency();
  compressed.mangle_names();

  var finalCode = compressed.print_to_string();

  fs.writeFileSync('dist/forms-js-angular-1x.min.js', finalCode);
});

gulp.task('umdify', function() {
  umdHelper('dist/forms-js-angular-1x.js', 'dist');
  umdHelper('dist/forms-js-angular-1x.min.js', 'dist');
});

var buildHelper = function(sources, directory, outputFile) {
  var typeScriptCompiler = require('gulp-tsc');

  return gulp
    .src(sources)
    .pipe(typeScriptCompiler({
      module: "CommonJS",
      emitError: false,
      out: outputFile,
      target: 'ES5'
    }))
    .pipe(gulp.dest(directory));
};

var umdHelper = function(sources, directory) {
  var umd = require('gulp-umd');

  return gulp
    .src(sources)
    .pipe(umd({
      exports: function(file) {
        return 'adaptor';
      },
      namespace: function(file) {
        return 'adaptor';
      }
      //template: path.join(__dirname, 'templates/returnExports.js')
    }))
    .pipe(gulp.dest(directory));
};


gulp.task('server',['build'], function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
