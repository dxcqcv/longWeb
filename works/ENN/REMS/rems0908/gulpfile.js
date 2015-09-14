var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', function(){
    return gulp.src(mainBowerFiles({
        paths: {
            bowerDirectory: 'c:\\Users\\Roy\\bower_components\\',
            bowerJson: 'c:\\Users\\Roy\\bower_components\\require-css\\bower.json'
        }
    }))
        .pipe(gulp.dest('c:\\Users\\Roy\\Documents\\long\\dev\\longWeb\\works\\ENN\\REMS\\rems0908\\js\\'));

});
