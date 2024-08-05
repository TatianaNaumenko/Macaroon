"use strict";
let gulp = require('gulp');
let less = require('gulp-less');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');



exports.goLess = function () {
	return gulp.src('src/**/style.less')
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(rename({
			 extname: ".min.css"
		}))
		.pipe(gulp.dest('dist'));
}


exports.watch = function() {
	gulp.watch('src/css/*.less', gulp.series('goLess'));
};
