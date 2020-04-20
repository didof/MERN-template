module.exports = (req, res, next) => {
	res.render('guest/welcome', { title: 'Welcome' })
}
