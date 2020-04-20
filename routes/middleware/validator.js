const { check, validationResult } = require('express-validator')

//https://flaviocopes.com/express-validate-input/
const subscribeRules = () => {
	return [
		check('username')
			.not()
			.isEmpty()
			.withMessage('Must enter an username')
			.isAlphanumeric()
			.withMessage('Must be only alphanumerical chars')
			.isLength({ min: 6 })
			.withMessage('Must be at least 6 chars long')
			.isLength({ max: 20 })
			.withMessage('Must not be over 20 chars long'),
		check('email')
			.not()
			.isEmpty()
			.withMessage('Must enter an email')
			.isEmail()
			.withMessage('Must enter a valid email address'),
		check('password')
			.not()
			.isEmpty()
			.withMessage('Must enter a password')
			.isLength({ min: 8 })
			.withMessage('Must be at least 8 chars long')
			.custom((value, { req, loc, path }) => {
				if (value !== req.body.password2) {
					throw new Error("Passwords don't match")
				} else {
					return value
				}
			}),
	]
}

const subscribeValidator = (req, res, next) => {
	const errors = validationResult(req)
	if (errors.isEmpty()) {
		return next()
	}

	const { username, email } = req.body

	const extractedErrors = []
	errors.array().map((err) => {
		extractedErrors.push({ [err.param]: err.msg })
	})

	return res.render('auth/register', {
		title: 'Register',
		errors: extractedErrors,
		username, email
	})
}

module.exports = {
	subscribeRules,
	subscribeValidator,
}
