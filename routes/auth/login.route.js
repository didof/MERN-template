const passport = require('passport')

// @route /auth/register GET
const render = (req, res, next) => {
	let messages = {}
	if (typeof res.locals.messages.success != 'undefined') {
		messages = res.locals.messages.success
	}

	res.render('auth/login', {
		title: 'Login',
		messages,
	})
}

// @route /auth/register POST
const login = (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/user',
		failureRedirect: '/auth/login',
	})(req, res, next)
}

module.exports = {
	render,
	login,
}
