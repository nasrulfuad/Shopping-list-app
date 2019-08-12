const config = require('config')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
	const token = req.header('x-auth-token')

	// Check for token
	if(!token) return res.status(401).json({ msg: 'No token, authorization denied' })

	try {
		// Verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		// Add user from payload
		req.user = decoded
		next()
	}catch(err) {
		return res.status(400).json({ msg: 'Invalid token' })
	}
}

module.exports = auth
