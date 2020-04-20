const router = require('express').Router()

router.route('/').get(require('./welcome.route'))

module.exports = router