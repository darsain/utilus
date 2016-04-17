var gulp = require('gulp');

var cfg = {
	destination: 'build'
};

// task tree
gulp.task(serve);
gulp.task(watch);
gulp.task(clean);
gulp.task(test);
gulp.task('build', gulp.parallel(buildHTML, buildStyles));
gulp.task('build:html', buildHTML);
gulp.task('build:styles', buildStyles);
gulp.task('default', gulp.series('build', gulp.parallel(watch, serve)));

// exit
process.on('exit', clean);
// ctrl+c event
process.on('SIGINT', clean);
// uncaught exceptions
process.on('uncaughtException', clean);

// cleanup after itself
function clean(done) {
	var del = require('del');
	del(cfg.destination).then(function () {
		if (typeof done === 'function') done();
		else process.exit();
	});
}

// build html
function buildHTML() {
	var jade = require('gulp-jade');
	return gulp.src('./test/index.jade')
		.pipe(jade())
		.pipe(gulp.dest(cfg.destination));
}

// build styles
function buildStyles() {
	var stylus = require('gulp-stylus');
	var utilus = require('./');
	var sourcemaps = require('gulp-sourcemaps');
	return gulp.src('./test/index.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({use: utilus()}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(cfg.destination));
}

// watch for source file changes
function watch() {
	gulp.watch('./test/*.jade', buildHTML);
	gulp.watch([
		'./utilus/*',
		'./lib/*',
		'./plugin/*',
		'./test/*.styl'
	], buildStyles);
}

// watch files for changes and reload
function serve() {
	var browserSync = require('browser-sync');

	browserSync({
		server: {
			baseDir: cfg.destination
		},
		ui: false,
		online: false,
		open: false,
		minify: false
	});

	gulp.watch(['*'], {cwd: cfg.destination}).on('change', browserSync.reload);
}

// continuous compilation of a quick test file
function test() {
	var fs = require('fs');
	var stylus = require('gulp-stylus').stylus;
	var utilus = require('./');

	gulp.watch(['./test/test.styl', './utilus/*.styl'], compile);
	compile();

	function compile(done) {
		stylus(fs.readFileSync('./test/test.styl').toString())
			.render(function (err, css) {
				if (err) console.error(err.message);
				else console.log(css);
				if (done) done();
			});
	}
}