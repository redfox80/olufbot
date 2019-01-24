const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task('watch', function() {

    gulp.watch('./src', gulp.series('babel'));

});

gulp.task("babel", function () {
  return gulp.src("./src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./app"));
});