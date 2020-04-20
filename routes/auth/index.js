const router = require('express').Router()

// @route GET /auth/register                register.ejs
router.route('/register').get(require('./register.route').render)

// @route POST /auth/register               handle subscribing
router
	.route('/register')
	.post(
		require('../middleware/validator').subscribeRules(),
        require('../middleware/validator').subscribeValidator,
		require('./register.route').subscribe
	)

// @route GET /auth/login                login.ejs
router.route('/login').get(require('./login.route').render)

// @route POST /auth/login               handle login
router.route('/login').post(require('./login.route').login)

module.exports = router
