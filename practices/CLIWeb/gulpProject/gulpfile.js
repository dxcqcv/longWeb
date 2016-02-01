var gulp = require('gulp');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jade = require('gulp-jade');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
//var connect = require('gulp-connect');
var browserSync = require('browser-sync');

gulp.task('css', function(){
  gulp.src('source/stylus/main.styl')
      .pipe(stylus({compress: false, paths: ['source/stylus']}))
      .pipe(autoprefixer())
      .pipe(minifyCSS())
      .pipe(rename('style.css'))
      .pipe(gulp.dest('build'))
      //.pipe(connect.reload())
      .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function(){
    gulp.src('source/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('build'))
        //.pipe(connect.reload())
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/modernizr/modernizr.js'
    ])
        .pipe(concat('output.min.js')) // concat pulls all our files together before minifying them
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('watch', function(){
    gulp.watch('source/stylus/*.styl', ['css']);
    gulp.watch('source/jade/*.jade', ['html']);
});

gulp.task('default', ['css', 'html', 'js']);

//gulp.task('connect', function(){
    //connect.server({
        //root: 'build',
        //livereload: true,
        //open: true
    //});
//});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        }
    });
});

//gulp.task('start', ['connect','watch']);
gulp.task('start', ['browser-sync','watch']);
