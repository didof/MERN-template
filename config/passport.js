const LocalStrategy = require('passport-local').Strategy

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/User.model')

module.exports = (passport) => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
			},
			(email, password, done) => {
				// Match user
				User.findOne({ email })
					.then((user) => {
						if (!user) {
							// No match
							return done(null, false, { message: 'That email is not registered' })
						}

                        // Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if(err) throw err
                            if(isMatch) {
								// it's OK
                                return done(null, user)
                            } else {
                                return done(null, false, { message: 'Credentials incorrect'})
                            }
                        })
					})
					.catch((err) => {
						console.error(err)
					})
			}
		)
	)

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}
