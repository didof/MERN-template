module.exports = (req, res, next) => {
	res.render('user/dashboard', { title: 'Dashboard', userName: req.user.username})
}
