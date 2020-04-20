const express = require('express')
const app = express()

// Helpers
require('morgan')('tiny')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

// DB
const mongoose = require('mongoose')

// App configuration
const passport = require('passport')
const session = require('express-session')
app.use(session(require('./config/session')))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(require('cookie-parser')())
app.use(require('connect-flash')())

// View
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname + '/views'))
app.set('layout', 'layout/baseof')

// Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Database connection
mongoose.set('useCreateIndex', true)
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('[Database] connected successfully'))
	.catch(console.log())

// Routes
app.use('/', require('./routes/'))

// Listen
const port = process.env.PORT || 5000
app.listen(port, () => console.log('[Server] listening on port ' + port))
