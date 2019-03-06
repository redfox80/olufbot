const gulp = require("gulp");
const babel = require("gulp-babel");
const spawn = require('child_process').spawn;
let node;

gulp.task('watch', function() {

    //Start server
    server();

    //Compile js and restart server if file change occurs
    gulp.watch('./src', gulp.series(['babel', 'server']));

});

//Make server task?
gulp.task('server', () => {
    server();
});

//Start or restart the server
function server() {
    
    if(node) node.kill();



    node = spawn('node', ['./app/main.js'], {stdio: 'inherit'});

    node.on('close', (code) => {
        if(code === 8) {
            gulp.log('Error detected, waiting for changes');
        }
    });

}

//Compile js
gulp.task("babel", function () {

    return gulp.src("./src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("./app"));
});