const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

const db = require('./config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Database connected..')).catch(err => console.log(err))

app.use(bodyParser())

/*
	Initializeing routes
*/
app.use('/api/items', require('./routes/api/items'))

/*
	Serve static assets if in production
*/
if(process.env.NODE_ENV === 'production'){
	// Set static folder
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	} )
}

app.listen(PORT, _ => console.log(`Server running on port : ${PORT}`))
