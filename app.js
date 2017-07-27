const express = require('express')
const path = require('path')

const app = express()
const env = process.env.NODE_ENV || 'development'

const envDir = path.join(__dirname + `/src/configs/env/${env}`)

require(envDir)(app)
require('./src/index')(app)

app.listen(app.get('port'), () => {
  console.log('ExpressJS On: http://127.0.0.1:7001');
})
