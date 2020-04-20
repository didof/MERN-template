// @route /auth/register GET
const render = (req, res, next) => {
	res.render('auth/register', { title: 'Register' })
}

// @route /auth/register POST
const User = require('../../models/User.model')

const subscribe = (req, res, next) => {
	// @ validation previously passed successfully
	// @ password is in the model pre-save

	// fetch form data
	const { username, email, password } = req.body

	// check if email is already used
	User.findOne({ email })
		.then((user) => {
			if (user) {
				res.render('auth/register', {
					title: 'Register',
					errors: [{ email: 'Is already in use' }],
				})
			} else {
				const newUser = new User({ username, email, password })
				return newUser.save()
			}
		})
		.then((newUser) => {
			return res.render('auth/login', {
				title: 'Login',
				email: newUser.email,
			})
		})
		.catch((err) => {
			res.redirect('/')
		})
}

module.exports = {
	render,
	subscribe,
}
