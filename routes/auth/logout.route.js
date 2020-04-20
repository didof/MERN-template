module.exports = (req, res, next) => {
	req.logout()
	req.flash('test', 'test')
	res.redirect('/auth/login')
}