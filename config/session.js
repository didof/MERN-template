module.exports = {
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true,
}


// secret: session ID cookie

// resave: forces the session to be saved back to the session store

// saveUninitialized: field forces a session that is “uninitialized” to be saved to the store