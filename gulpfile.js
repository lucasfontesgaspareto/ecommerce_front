const gulp = require('gulp')
const gutil = require('gulp-util')
const livereload = require('gulp-livereload')
const nodemon = require('gulp-nodemon')
const notify = require('gulp-notify')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const changed = require('gulp-changed')

let path = {
  htmlSrc: 'src/views/',
  scssSrc: 'public/scss/',
  jsSrc: 'public/js/',

  buildDir: 'build/'
}

let onError = (err) => {
  gutil.beep()
  gutil.log(gutil.colors.red(err))
}

let initServer = () => {
  livereload.listen()

  nodemon({
    script: 'app.js',
    ext: 'js'
  })
  .on('restart', () => {
    gulp.src('app.js')
        .pipe(livereload())
        .pipe(notify('Reloading...'))
  })
}

gulp.task('build-html', () => {
  console.log(path.htmlSrc.concat('**/*.ejs'))
  console.log(path.buildDir.concat('views/'))
  return gulp
          .src(path.htmlSrc.concat('**/*.ejs'))
          .pipe(gulp.dest(path.buildDir.concat('views/')))
          .pipe(livereload())
})

gulp.task('build-css', () => {
  return gulp
          .src(path.scssSrc.concat('**/*.scss'))
          .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: (err) => {
              console.error(err);
            }
          }))
          .pipe(plumber({
            errorHandler: onError
          }))
          .pipe(gulp.dest(path.buildDir.concat('css/')))
          .pipe(livereload())
})

gulp.task('build-js', () => {
  return gulp
          .src(path.jsSrc.concat('*.js'))
          .pipe(plumber({
            errorHandler: onError
          }))
          .pipe(changed(path.buildDir.concat('js/')))
          .pipe(gulp.dest(path.buildDir.concat('js/')))
          .pipe(livereload())
})

gulp.task('build', ['build-html', 'build-css', 'build-js'], () => {
  return initServer()
})

gulp.task('watch', () => {
  gulp.watch('src/views/**/*.ejs', ['build-html'])
  gulp.watch('public/scss/**', ['build-css'])
  gulp.watch('public/js/**/*.js', ['build-js'])
})

const env = process.env.NODE_ENV || 'development'

if ('development' === env) {
  return gulp.task('default', ['build', 'watch'])
}
