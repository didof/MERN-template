const app = require('express')()

app.use('/', require('./guest/'))
// @route GET /                 welcome

app.use('/user', require('./user/'))
// @route GET /user             dashboard

app.use('/auth', require('./auth/'))
// @route GET /auth/register    register
// @route GET /auth/login       login

module.exports = app