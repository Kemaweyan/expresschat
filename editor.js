const gulp = require("gulp");
const imageResize = require("gulp-image-resize");
const fs = require("fs");

const createAvatars = (image) => {
    return gulp.src(image)
    .pipe(imageResize({
        imageMagick : true,
        width: 100,
        height: 100,
        crop: true
    }))
    .pipe(gulp.dest("public/images/avatars/100"))
    .pipe(imageResize({
        imageMagick : true,
        width: 48,
        height: 48,
        crop: true
    }))
    .pipe(gulp.dest("public/images/avatars/48"))
    .pipe(imageResize({
        imageMagick : true,
        width: 32,
        height: 32,
        crop: true
    }))
    .pipe(gulp.dest("public/images/avatars/32"));
};

process.on('message', (image) => {
    const stream = createAvatars(image);

    stream.on('end', function () {
        fs.unlink(image);
        process.exit();
    });

    stream.on('error', function (err) {
        process.send(err);
        process.exit(1);
    });
});

module.exports = {};
