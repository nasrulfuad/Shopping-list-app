const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

const db = require('./config/keys').mongoURI
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('Database connected..')).catch(err => console.log(err))

app.use(bodyParser())

// Initializeing routes
app.use('/api/items', require('./routes/api/items'))

app.listen(PORT, _ => console.log(`Server running on port : ${PORT}`))
