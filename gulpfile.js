var gulp = require('gulp');

var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('cssnano');
var sass = require('gulp-sass');
var cssgrace = require('cssgrace');

var csso = require('gulp-csso');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var uglify = require('gulp-uglify');



gulp.task('sass', function () {
    var processors = [
        autoprefixer,
        cssnano,
		cssgrace
    ];
    return gulp.src('catalog/view/theme/dev/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('catalog/view/theme/dev/css'));
});

gulp.task('css', function () {
    return gulp.src(['catalog/view/theme/dev/css/default-style.css', 'catalog/view/theme/dev/css/style.css'])
		.pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(csso())		
        .pipe(gulp.dest('catalog/view/theme/dev/css/'));
		
	
});

gulp.task('minify', function() {
  var opts = {
    conditionals: true,
    spare:true,
	loose:true,
	empty:true,
	comments:true,
	quotes:true,
	cdata:true
  };
 
  return gulp.src('catalog/view/theme/dev/template/**/*.tpl')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('catalog/view/theme/prod/template/'));
});

gulp.task('compress', function() {
  return gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css:watch', function () {
    	gulp.watch('catalog/view/theme/dev/css/*.css',['css'])
});
 
gulp.task('watch', function () {
  gulp.watch('catalog/view/theme/dev/sass/*.scss', ['sass']);
});


gulp.task('build', function() {
	
	gulp.src('catalog/view/theme/dev/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('catalog/view/theme/dev/css'))
	
	gulp.src(['catalog/view/theme/dev/css/default-style.css', 'catalog/view/theme/dev/css/style.css'])
		.pipe(concat('all.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(csso())		
        .pipe(gulp.dest('catalog/view/theme/dev/css/'))
});