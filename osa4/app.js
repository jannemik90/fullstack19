const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true })
 .then(() =>  {
     console.log('MongoDB connected')
 })
 .catch((error) => {
     console.log('MongoDB connection error', error.message)
 })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app