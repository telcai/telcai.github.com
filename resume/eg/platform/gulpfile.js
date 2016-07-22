var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');
	stylus = require('gulp-stylus');

	gulp.task('js',function(){
	return gulp.src('js/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('default'))
			.pipe(uglify())
			.pipe(concat('app.js'))
			.pipe(gulp.dest('build'));

});