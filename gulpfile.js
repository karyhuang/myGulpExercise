const gulp = require('gulp');
const imagemin = require ('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

// logs message
gulp.task('message', function(){
  return console.log('Gulp is running');
});


// copy html files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html') /* points to the files we want to use */
  /* notice there's no semicolon after the statement because the code below is continuation */
    .pipe(gulp.dest('dist'));
    /* point to output folder, name it dist or anything you want, it will be
    created automaticaly */
});


// optimize images with the imagemin plugin
gulp.task('imageMin', () =>
  gulp.src('src/images/*') 
  /* it looks into a folder called 'images', so create one */
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
    /* the output images folder will be created automatically */
);


// minify JS
gulp.task('minify', () =>
  gulp.src('src/js/*.js') 
  /* it looks into a folder called 'js', so create one */
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    /* the output js folder will be created automatically */
);


// compile Sass
gulp.task('sass', () =>
  gulp.src('src/sass/*.scss') 
  /* it looks into a folder called 'sass', so create one */
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    /* the output folder should be name 'css' because it's not sass anymore */
);


// scripts concatenation
gulp.task('scripts', () =>
  gulp.src('src/js/*.js') 
    .pipe(concat('main.js')) /* concat all js files into 1 file named main.js */
    .pipe(uglify()) /* need to minify main.js */
    .pipe(gulp.dest('dist/js'))
);


/* if we delete the entire dist folder, by running 'gulp' in the command line
will recreate that folder */

gulp.task('default', ['message', 'copyHtml', 'imageMin', 'sass', 'scripts']);
/* DO NOT include 'minify' because then it will minify the js files and send to dist/js THEN concat and minify again, we only want 1 js file in dist/js - main.js */

gulp.task('watch', function(){
  /* gulp.watch(location to watch, name of task) */
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
});