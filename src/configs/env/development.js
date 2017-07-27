const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

module.exports = (app) => {
  app.set('port', 7001)
  app.set('views', path.join(__dirname, './../../../build/views'))
  app.set('view engine', 'ejs')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))
  app.use(methodOverride('_method'))
}
