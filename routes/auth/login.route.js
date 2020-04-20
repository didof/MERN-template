const passport = require('passport')

// @route /auth/register GET
const render = (req, res, next) => {
	res.render('auth/login', { title: 'Login' })
}

// @route /auth/register POST
const login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/user',
		failureRedirect: '/auth/login'
	})(req, res, next)
}

module.exports = {
	render,
	login
}