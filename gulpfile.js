var gulp = require('gulp'),
		sass = require('gulp-sass'),
		inject = require('gulp-inject'),
		wiredep = require('wiredep').stream,
		browserSync = require('browser-sync'),
		reload = browserSync.reload;

var paths = {
	scripts: ['modules/**/*.module.js', 'modules/**/*.js', '!modules/**/*.test.js', '!modules/**/*.spec.js'],
	html: ['index.html', 'modules/**/*.html'],
	sass: ['scss/**/*.scss'],
	unitTests: ['modules/**/*.test.js']
}

gulp.task('sass', function(){
	return gulp.src(paths.sass)
		.pipe(sass())
		.pipe(gulp.dest('assets/css'))
		.pipe(reload({stream:true}));
});

gulp.task('inject', function(){
	return gulp.src('./index.html')
		.pipe(inject(gulp.src(paths.scripts, {read:false})))
		.pipe(gulp.dest('./'));
});	

gulp.task('wiredep', function(){
	return gulp.src('./index.html')
		.pipe(wiredep({
			directory: './lib/',
			bowerJson: require('./bower.json')
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: './'
		}
	});
});

gulp.task('dev', ['sass', 'inject', 'wiredep', 'browser-sync'], function(){
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.html, [reload]);
	gulp.watch(paths.scripts, ['inject', reload]);
});