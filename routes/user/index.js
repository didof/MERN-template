const router = require('express').Router()

const { checkAuth } = require('../../config/auth')

router.route('/').get(checkAuth, require('./dashboard.route'))

module.exports = router
