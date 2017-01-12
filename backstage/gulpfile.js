var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var isDeploy = false;

// 静态服务器
gulp.task('browser-sync', ['sass', 'scripts'], function() {
    browserSync.init({
        proxy: 'http://127.0.0.1/admin'
    });

    gulp.watch('public/**/*.scss', ['sass']);
    gulp.watch('public/**/*.js', ['scripts']);
    gulp.watch('**/*.hbs').on('change', reload)
    gulp.watch('dist/css/**/*.css').on('change', reload)
    gulp.watch('dist/js/**/*.js').on('change', reload)
});

// 样式处理
gulp.task('sass', function() {
    return gulp.src('public/css/**/*.scss')
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(autoprefixer(['>5%']))
        .pipe(csscomb())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(gulpif(!isDeploy, reload({
            stream: true
        })))
});

// Scripts任务
gulp.task('scripts', function() {
    return gulp.src('public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(gulp.dest('dist/js'))
});

// 清空dist
gulp.task('clean', function(cb) {
    gulp.src(['./dist/css', './dist/js'], {
            read: false
        })
        .pipe(clean())

    cb()
})

// 设置生产环境变量
gulp.task('isDeploy', function(cb) {
    isDeploy = true
    cb()
})

// 开发环境
gulp.task('default', ['browser-sync'])

// 生产环境
gulp.task('build', ['isDeploy', 'sass', 'scripts'])