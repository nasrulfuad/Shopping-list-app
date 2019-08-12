const mongoose = require('mongoose')

/*
	Create UserSchema
*/
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	registerDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = User = mongoose.model('User', UserSchema)
